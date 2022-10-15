import { MessageHandler } from '../../bus'
import type { Express } from 'express'
import * as http from 'http'
import express from 'express'
import cors from 'cors'

export class HttpServer {
  private readonly host: string
  private readonly port: number
  private readonly expressInstance: Express
  private readonly handler: MessageHandler
  private expressServer: http.Server | undefined

  constructor (host: string, port: number, handler: MessageHandler) {
    this.host = host
    this.port = port
    this.handler = handler

    this.expressInstance = express()
    this.expressInstance.use(cors())
    this.expressInstance.use(express.json())

    this.expressInstance.all('*', (req, res) => {
      this.handler.handle(req.body)
        .then(busResponses => {
          res.json(busResponses)
        })
        .catch((err) => {
          res.status(500)
          res.json(err)
        })
    })
  }

  async start (): Promise<void> {
    return await new Promise<void>((resolve) => {
      this.expressServer = this.expressInstance.listen(this.port, this.host, () => {
        console.log(`HTTP-Server Transport Middleware listening at ${this.host}:${this.port}`)
        resolve()
      })
    })
  }

  async stop (): Promise<void> {
    const expressServer = this.expressServer

    if (expressServer === undefined) {
      return await Promise.resolve()
    }

    return await new Promise(resolve => expressServer.close(() => resolve()))
  }
}
