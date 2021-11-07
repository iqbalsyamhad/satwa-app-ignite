import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { GetSatwaResults } from "../api.types";

export class SatwaApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    async getAllSatwa(): Promise<GetSatwaResults> {
        try {
            console.log("api satwa start!")
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/satwa.json",
            );

            if (!response.ok) {
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const satwa = response.data.data
            console.log("api satwa success!")

            return { kind: "ok", satwa };
        } catch (error) {
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }
}