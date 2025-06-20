import {
    FilterQuery,
    Model,
    QueryOptions,
    Types,
    UpdateQuery,
    Document,
} from 'mongoose';
import { BaseDocument } from './document.interface';
import { Params } from './params.interface';

/** Interface for BaseRepository */
export interface BaseRepository<T> {
    model: Model<BaseDocument<T>>;

    /** returns document count for filterQuery */
    count(searchParams: FilterQuery<T>): Promise<number>;

    /** returns single document for a given query */
    fetchOne(params: Params<T>): Promise<BaseDocument<T> | null>;

    /** Only to be used while performing findOneAndUpdate, it doesn't perform project, populate, sort etc. just findOne() */
    fetchOneForSave(params: Params<T>): Promise<BaseDocument<T> | null>;

    /** Only to be used while performing find/list, it doesn't perform project, populate, sort etc. just find() */
    listForSave(params: Params<T>): Promise<Array<BaseDocument<T>>>;

    /** performs .save() operation on updated data retrieved after fetchOneForSave() */
    save(fetchedData: BaseDocument<T>, hKey?: string): Promise<BaseDocument<T>>;

    /** returns all documents for a given query */
    list(params: Params<T>): Promise<Array<BaseDocument<T>>>;

    /** creates a single document in db */
    create(data: T): Promise<BaseDocument<T>>;

    /** creates document list in db */
    createMany(dataList: T[]): Promise<BaseDocument<T>[]>;

    /** finds one and update the document */
    findOneAndUpdate(
        searchParams: FilterQuery<T>,
        data: UpdateQuery<BaseDocument<T>>,
        options?: QueryOptions<T>,
    ): Promise<BaseDocument<T> | null>;

    /** finds by ID and update the document */
    findByIdAndUpdate(
        id: Types.ObjectId,
        data: UpdateQuery<BaseDocument<T>>,
    ): Promise<BaseDocument<T> | null>;

    /** finds and update all matching document */
    updateMany(
        searchParams: FilterQuery<T>,
        data: UpdateQuery<BaseDocument<T>>,
        cachedParam?: string,
        arrayFilters?: any,
    ): Promise<any>;

    /** finds and update One matching document */
    updateOne(
        searchParams: FilterQuery<T>,
        data: UpdateQuery<BaseDocument<T>>,
        cachedParam?: string,
    ): Promise<any>;

    /** deletes one matching document */
    deleteOne(searchParams: FilterQuery<T>): Promise<any>;

    /** deletes all matching document */
    deleteMany(searchParams: FilterQuery<T>): Promise<any>;

    /** performs aggregation on collection */
    aggregate(query: any, collation?: any): Promise<any[]>;

    /** returns distinct values for a given field */
    distinct(field: keyof T, searchParams?: FilterQuery<T>): Promise<any[]>;
}
