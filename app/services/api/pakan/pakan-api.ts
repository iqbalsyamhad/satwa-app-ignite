import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { GetPakanResults } from "../api.types";

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
}