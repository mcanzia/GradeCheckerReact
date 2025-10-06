import { RequestUtil } from "@/controllers/RequestUtil";
import { Credentials } from "@/types/Credentials";
import { ErrorHandler } from "@/util/ErrorHandler";

const endpointBase = `${RequestUtil.getAPIUrl()}/api/auth/`;

export class AuthController {

    constructor() {
    }

    async authorize(credentials: Credentials) {
        try {
            const requestUrl = endpointBase;
            const response = await RequestUtil.apiRequest(requestUrl, RequestUtil.AuthRequestParams(credentials));
            if (!response.ok) return null;

            const { token, user } = (await response.json()) as {
                token: string;
                user: { id: string; email: string; role: string };
            };

            return { ...user, token };
        } catch (error: any) {
            ErrorHandler.handleCustomError(error);
            throw error;
        }


    }

}
