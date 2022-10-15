import { Component, ReactElement, Context } from 'react';
import { Container } from '../di/container';
export declare function getContext(): Context<Container>;
interface Props {
    container: Container;
    children?: React.ReactNode;
}
export declare class ContainerProvider extends Component<Props> {
    render(): ReactElement;
}
export declare const useContainer: () => Container;
export {};
//# sourceMappingURL=container.d.ts.map