import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { LoginResult } from "../api.types";

export class AuthenticationApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    async login(email: string, password: string): Promise<LoginResult> {
        try {
            const response: ApiResponse<any> = await this.api.apisauce.post(
                "/api/login",
                { email, password }
            );

            if (!response.ok) {
                alert(response.data?.message);

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
}