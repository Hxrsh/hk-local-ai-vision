import { FilterQuery } from 'mongoose';
import { SearchOptions } from './search-options.interface';
import { BaseDocument } from './document.interface';

/** params required to find documents */
export interface Params<T> extends SearchOptions<BaseDocument<T>> {
    searchParams: FilterQuery<BaseDocument<T>>;
}

export function instanceOfParams(object: any): object is Params<any> {
    return 'searchParams' in object;
}
