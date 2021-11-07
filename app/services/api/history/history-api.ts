import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { GetHistoriesResult } from "../api.types";

export class HistoryApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    async getHistory(page): Promise<GetHistoriesResult> {
        try {
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/history.json",
                { page: page }
            );

            if (!response.ok) {
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const histories = response.data
            console.log("api history success!")

            return { kind: "ok", histories };
        } catch (error) {
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }
}