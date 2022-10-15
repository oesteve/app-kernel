import { Command, CommandDefinition } from '../bus/command/command';
interface UseCommandProps {
    loading: boolean;
    error: Error | null;
    dispatch: (command?: Command<any>) => Promise<void>;
}
export declare const useCommand: (messageDef: CommandDefinition<any>) => UseCommandProps;
export {};
//# sourceMappingURL=command.d.ts.map