import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { GetFormActivityResults, GetFormActivityResult } from "../api.types";

export class FormActivityApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    async getAllFormActivity(page): Promise<GetFormActivityResults> {
        try {
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/form-aktivitas-all.json",
            );

            if (!response.ok) {
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const formactivities = response.data

            return { kind: "ok", formactivities };
        } catch (error) {
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }

    async getOneFormActivity(id): Promise<GetFormActivityResult> {
        try {
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/form-aktivitas-detail.json",
            );

            if (!response.ok) {
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const formactivity = response.data.data

            return { kind: "ok", formactivity };
        } catch (error) {
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }
}