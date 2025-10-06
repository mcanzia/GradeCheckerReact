
export class ErrorHandler {

    static displayGenericError() {
        console.log("Error occurred. Please try again.");
    }

    static handleCustomError(errorMessage: string) {
        console.log(errorMessage);
    }

}