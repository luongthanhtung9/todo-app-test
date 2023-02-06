export class ApiResponseNoData {
    error?: string;
    status?: string;
    message?: string;
    success?: boolean;
    constructor(error?: string, status?: string, message?: string, success?: boolean) {
        this.error = error;
        this.status = status;
        this.message = message;
        this.success = success;
    }
}