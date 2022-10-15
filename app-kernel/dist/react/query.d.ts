import { QueryDefinition } from '../bus/query/query';
interface UseQueryProps<T, R> {
    data: R | undefined;
    loading: boolean;
    error: Error | null;
    query: (payload: T) => void;
}
export declare const useQuery: <T, R>(queryDefinition: QueryDefinition<T, R>) => UseQueryProps<T, R>;
export {};
//# sourceMappingURL=query.d.ts.map