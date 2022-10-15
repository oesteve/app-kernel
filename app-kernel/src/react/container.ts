import { Component, createContext, createElement, ReactElement, useContext, Context } from 'react'
import { Container } from '../di/container'

let containerContext: Context<Container> | null = null

export function getContext (): Context<Container> {
  if (containerContext === null) {
    containerContext = createContext(new Container())
  }

  return containerContext
}

interface Props {
  container: Container
  children?: React.ReactNode
}

export class ContainerProvider extends Component<Props> {
  render (): ReactElement {
    return createElement(
      getContext().Provider,
      { value: this.props.container },
      this.props.children
    )
  }
}

// export const ContainerProvider = (props: Props) => <ContainerContext.Provider value={props.container}>
//    { props.children }
// </ContainerContext.Provider>

export const useContainer = (): Container => {
  return useContext(getContext())
}
