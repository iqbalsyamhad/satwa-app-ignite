import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { GetSupplierResults } from "../api.types";

export class SupplierApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    async getAllSupplier(): Promise<GetSupplierResults> {
        try {
            console.log("api supp start!")
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/api/supplier",
            );

            if (!response.ok) {
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const supplier = response.data.data
            console.log("api supp success!")

            return { kind: "ok", supplier };
        } catch (error) {
            console.log("err!"+JSON.stringify(error))
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }
}