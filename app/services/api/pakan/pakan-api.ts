import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { GetPakanResults, GetPakanPermasalahanResults, GetStandardApiRespone } from "../api.types";

export class PakanApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    async getAllPakan(): Promise<GetPakanResults> {
        try {
            console.log("api pakan start!")
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/api/pakan",
            );

            if (!response.ok) {
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const pakan = response.data.data
            console.log("api pakan success!")

            return { kind: "ok", pakan };
        } catch (error) {
            console.log("err!"+JSON.stringify(error))
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }

    async getAllPakanPermasalahan(): Promise<GetPakanPermasalahanResults> {
        try {
            console.log("api pakan-m start!")
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/api/serah_terima_pakan",
            );

            if (!response.ok) {
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const pakan = response.data.data
            console.log("api pakan-m success!")

            return { kind: "ok", pakan };
        } catch (error) {
            console.log("err!"+JSON.stringify(error))
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }

    async createPakanPermasalahan(collection): Promise<GetStandardApiRespone> {
        try {
            let bodyFormData = new FormData();
            for (const el of Object.keys(collection)) {
                bodyFormData.append(el, collection[el]);
            }

            const response: ApiResponse<any> = await this.api.apisauce.post(
                "/api/permasalahan_pakan/store",
                bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            console.log(JSON.stringify(response))

            if (!response.ok) {
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const data = response.data

            return { kind: "ok", data };
        } catch (error) {
            console.log("err!"+JSON.stringify(error))
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }
}