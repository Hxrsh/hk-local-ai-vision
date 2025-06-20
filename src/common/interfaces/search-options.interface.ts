export interface SearchOptions<T> {
    page?: number;
    skip?: number;
    limit?: number;
    isLean?: boolean;
    populate?: any;
    sort?: any;
    hKey?: string;
    key?: string;
    ttl?: number;
}
