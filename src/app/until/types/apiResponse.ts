// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
    code: number;
    msg: string | null;
    error: string | null;
    data: T;
}