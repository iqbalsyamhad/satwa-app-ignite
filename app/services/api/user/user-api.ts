import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { GetStandardApiRespone, GetUserResult } from "../api.types";

export class UserApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    async getUser(): Promise<GetUserResult> {
        try {
            console.log("api user start!")

            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/api/pengguna/profil",
            );

            console.log(JSON.stringify(response))

            if (!response.ok) {
                alert(response.data.status || response.data?.message);
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const user = response.data.data
            console.log("api user success!")

            return { kind: "ok", user };
        } catch (error) {
            console.log("err!"+JSON.stringify(error))
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }

    async updateUser(collection): Promise<GetStandardApiRespone> {
        try {
            console.log("api user start!")

            let bodyFormData = new FormData();
            for (const el of Object.keys(collection)) {
                bodyFormData.append(el, collection[el]);
            }

            const response: ApiResponse<any> = await this.api.apisauce.post(
                "/api/pengguna/profil/update",
                bodyFormData
            );

            console.log(JSON.stringify(response))

            if (!response.ok) {
                alert(response.data.status || response.data?.message);
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const data = response.data
            console.log("api user success!")

            return { kind: "ok", data };
        } catch (error) {
            console.log("err!"+JSON.stringify(error))
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }

    async changePassword(collection): Promise<GetStandardApiRespone> {
        try {
            console.log("api user start!")

            let bodyFormData = new FormData();
            for (const el of Object.keys(collection)) {
                bodyFormData.append(el, collection[el]);
            }

            const response: ApiResponse<any> = await this.api.apisauce.post(
                "/api/pengguna/profil/ubah_password",
                bodyFormData
            );

            console.log(JSON.stringify(response))

            if (!response.ok) {
                alert(response.data.status || response.data?.message);
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const data = response.data
            console.log("api user success!")

            return { kind: "ok", data };
        } catch (error) {
            console.log("err!"+JSON.stringify(error))
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }
}