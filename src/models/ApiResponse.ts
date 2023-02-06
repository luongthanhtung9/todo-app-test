import { ApiResponseNoData } from "./ApiResponseNoData";

export class ApiResponse<T> extends ApiResponseNoData {
    data?: T;
    constructor(code?: string, status?: string, message?: string, success?: boolean, data?: T) {
        super(code, status, message, success);
    }
}

