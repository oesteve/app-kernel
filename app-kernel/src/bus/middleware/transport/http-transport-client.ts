
import axios, { AxiosInstance } from 'axios'
import { Client } from './transport-middleware'
import { Message } from '../../bus'

export class HttpClient implements Client {
  private readonly instance: AxiosInstance

  constructor (
    private readonly baseURL: string
  ) {
    this.instance = axios.create({
      baseURL,
      timeout: 2000
    })
  }

  async send (message: Message<any>): Promise<any> {
    const url = `/${message.type as string}`
    const body = JSON.stringify(message)

    return await this.instance.post(
      url,
      body,
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
      }).then((res) => {
      return res.data
    })
  }
}
