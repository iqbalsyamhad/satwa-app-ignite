import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { LoginResult, GetStandardApiRespone } from "../api.types";

export class AuthenticationApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    async login(email: string, password: string): Promise<LoginResult> {
        try {
            let bodyFormData = new FormData();
            bodyFormData.append('email', email);
            bodyFormData.append('password', password);
            const response: ApiResponse<any> = await this.api.apisauce.post(
                "/api/login",
                bodyFormData
            );

            if (!response.ok) {
                alert(response.data?.status);

                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const user = response.data
            console.log("api login success!")

            return { kind: "ok", user };
        } catch (error) {
            console.log(JSON.stringify(error));
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }

    async forgotPassword(email: string): Promise<GetStandardApiRespone> {
        try {
            let bodyFormData = new FormData();
            bodyFormData.append('email', email);
            const response: ApiResponse<any> = await this.api.apisauce.post(
                "/api/password/reset",
                bodyFormData
            );

            console.log(JSON.stringify(response));

            if (!response.ok) {
                alert(response.data.status || response.data?.message || 'Unknown Error!');

                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const data = response.data
            console.log("api login success!")

            return { kind: "ok", data };
        } catch (error) {
            alert('Unknown Error!');
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }

    async resetPassword(collection): Promise<GetStandardApiRespone> {
        try {
            let bodyFormData = new FormData();
            for (const el of Object.keys(collection)) {
                bodyFormData.append(el, collection[el]);
            }

            const response: ApiResponse<any> = await this.api.apisauce.post(
                "/api/password/update",
                bodyFormData
            );

            console.log(JSON.stringify(response));

            if (!response.ok) {
                alert(response.data.status || response.data?.message || 'Unknown Error!');

                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const data = response.data
            console.log("api login success!")

            return { kind: "ok", data };
        } catch (error) {
            alert('Unknown Error!');
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }
}