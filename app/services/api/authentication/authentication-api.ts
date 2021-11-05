import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { LoginResult, LogoutResult } from "../api.types";

export class AuthenticationApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    async login(email: string, password: string): Promise<LoginResult> {
        try {
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/login.json",
                // { email, password }
            );

            if (!response.ok) {
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const user = response.data.data

            return { kind: "ok", user };
        } catch (error) {
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }
}