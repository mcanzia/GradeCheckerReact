export interface IController<T> {
    getAllEntries(userAuthToken: any): Promise<T[]>;
    getEntryById(userAuthToken: any, entryId: string): Promise<T>;
    saveEntry(userAuthToken: any, entry: T): Promise<T>;
    batchAddEntries(userAuthToken: any, entries: T[]): Promise<T[]>;
    deleteEntry(userAuthToken: any, entry: T): Promise<void>;
    batchDeleteEntries(userAuthToken: any, entries: T[]): Promise<void>;
}
