export interface StoreState<T> {
    readonly loading: boolean;
    readonly data?: T;
    readonly error?: string;
}
