import { RequestUtil } from "@/controllers/RequestUtil";
import { ErrorHandler } from "@/util/ErrorHandler";
import { IController } from "@/controllers/IController";

export class BaseController<T> implements IController<T> {

    endpointBase: string;

    constructor(endpointBase: string) {
        this.endpointBase = endpointBase;
    }

    async getAllEntries(userAuthToken: any) {
        try {
            const requestUrl = this.endpointBase;
            return await RequestUtil.apiRequest(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
        } catch (error: any) {
            ErrorHandler.handleCustomError(error);
            throw error;
        }
    }

    async getEntryById(userAuthToken: any, entryId: string) {
        try {
            const requestUrl = this.endpointBase + `id/${entryId}`;
            return await RequestUtil.apiRequest(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
        } catch (error: any) {
            ErrorHandler.handleCustomError(error);
            throw error;
        }
    }

    async saveEntry(userAuthToken: any, entry: T) {
        try {
            const requestUrl = this.endpointBase;
            return await RequestUtil.apiRequest(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, entry));
        } catch (error: any) {
            ErrorHandler.handleCustomError(error);
            throw error;
        }
    }

    async batchAddEntries(userAuthToken: any, entries: Array<T>) {
        try {
            const requestUrl = this.endpointBase + "batch";
            return await RequestUtil.apiRequest(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, entries));
        } catch (error: any) {
            ErrorHandler.handleCustomError(error);
            throw error;
        }
    }

    async deleteEntry(userAuthToken: any, entry: T) {
        try {
            const requestUrl = this.endpointBase;
            return await RequestUtil.apiRequest(requestUrl, RequestUtil.DELETERequestParams(userAuthToken, entry));
        } catch (error: any) {
            ErrorHandler.handleCustomError(error);
            throw error;
        }
    }

    async batchDeleteEntries(userAuthToken: any, entries: Array<T>) {
        try {
            const requestUrl = this.endpointBase + "batch";
            return await RequestUtil.apiRequest(requestUrl, RequestUtil.DELETERequestParams(userAuthToken, entries));
        } catch (error: any) {
            ErrorHandler.handleCustomError(error);
            throw error;
        }
    }
}