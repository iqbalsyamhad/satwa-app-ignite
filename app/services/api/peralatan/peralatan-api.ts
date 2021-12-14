import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { GetPeralatanResults, GetPeralatanPenggunaanResults, GetStandardApiRespone } from "../api.types";

export class PeralatanApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    async getAllPeralatan(): Promise<GetPeralatanResults> {
        try {
            console.log("api peralatan start!")
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/api/peralatan",
            );

            if (!response.ok) {
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const peralatan = response.data.data
            console.log("api peralatan success!")

            return { kind: "ok", peralatan };
        } catch (error) {
            console.log("err!"+JSON.stringify(error))
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }

    async getAllPeralatanPenggunaan(): Promise<GetPeralatanPenggunaanResults> {
        try {
            console.log("api peralatan-p start!")
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/api/penggunaan_peralatan",
            );

            if (!response.ok) {
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const peralatanuses = response.data.data
            console.log("api peralatan-p success!")

            return { kind: "ok", peralatanuses };
        } catch (error) {
            console.log("err!"+JSON.stringify(error))
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }

    async createPeralatanPenggunaan(collection): Promise<GetStandardApiRespone> {
        try {
            let bodyFormData = new FormData();
            for (const el of Object.keys(collection)) {
                bodyFormData.append(el, collection[el]);
            }

            const response: ApiResponse<any> = await this.api.apisauce.post(
                "/api/penggunaan_peralatan/store",
                bodyFormData
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