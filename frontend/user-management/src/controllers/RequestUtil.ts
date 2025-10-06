
export class RequestUtil {
    static getAPIUrl() {
        return process.env.SERVER_API_URL ? process.env.SERVER_API_URL : "http://localhost:7500";
    }

    static GETRequestParams(userAuthToken: any, role?: string) {
        const bearer: string = 'Bearer ' + userAuthToken;
        return {
            method: "GET",
            headers: {
                'Authorization': bearer,
                ...(role && { 'User-Role': role }),
            }
        }
    }

    static POSTRequestParams(userAuthToken: any, body: any, role?: string) {
        const bearer: string = 'Bearer ' + userAuthToken;
        return {
            method: "POST",
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json',
                ...(role && { 'User-Role': role }),
            },
            body: JSON.stringify(body)
        }
    }

    static AuthRequestParams(body: any) {
        return {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }

    static FileUploadRequestParams(userAuthToken: any, file: File, role?: string) {
        const bearer: string = 'Bearer ' + userAuthToken;

        const formData = new FormData();
        formData.append('file', file);

        return {
            method: "POST",
            headers: {
                'Authorization': bearer,
                ...(role && { 'User-Role': role }),
            },
            body: formData
        }
    }

    static FileDownloadRequestParams(userAuthToken: any, role?: string) {
        const bearer: string = 'Bearer ' + userAuthToken;

        return {
            method: "GET",
            headers: {
                'Authorization': bearer,
                ...(role && { 'User-Role': role }),
            }
        }
    }

    static PUTRequestParams(userAuthToken: any, body: any, role?: string) {
        const bearer: string = 'Bearer ' + userAuthToken;
        return {
            method: "PUT",
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json',
                ...(role && { 'User-Role': role }),
            },
            body: JSON.stringify(body)
        }
    }

    static DELETERequestParams(userAuthToken: any, body: any, role?: string) {
        const bearer: string = 'Bearer ' + userAuthToken;
        return {
            method: "DELETE",
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json',
                ...(role && { 'User-Role': role }),
            },
            body: JSON.stringify(body)
        }
    }

    static async apiRequest<T>(url: string, options: RequestInit) {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status === 403) {
                // ErrorHandler.handleAuthorizationError();
                return;
            } else {
                const responseJson = await response.json();
                const detail = responseJson.detail;
                throw new Error(detail);
            }
        }

        if (response.status === 204) {
            return null;
        }
        return await response.json();
    }

    static async csvRequest<T>(url: string, options: RequestInit) {
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status === 403) {
                // ErrorHandler.handleAuthorizationError();
                return;
            } else {
                throw new Error();
            }
        }

        if (response.status === 204) {
            return null;
        }
        return await response.blob();
    }

}

