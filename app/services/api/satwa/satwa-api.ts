import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { GetSatwaResults, GetSatwaUpdateResults, GetStandardApiRespone } from "../api.types";

export class SatwaApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    async getAllSatwa(): Promise<GetSatwaResults> {
        try {
            console.log("api satwa start!")
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/api/satwa",
            );

            if (!response.ok) {
                console.log("fail!"+JSON.stringify(response))
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const satwa = response.data.data
            console.log("api satwa success!")

            return { kind: "ok", satwa };
        } catch (error) {
            console.log("err!"+JSON.stringify(error))
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }

    async getAllUpdateSatwa(): Promise<GetSatwaUpdateResults> {
        try {
            console.log("api u-satwa start!")
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "/api/update_satwa",
            );

            if (!response.ok) {
                console.log("fail!"+JSON.stringify(response))
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const satwaupdate = response.data.data
            console.log("api u-satwa success!")

            return { kind: "ok", satwaupdate };
        } catch (error) {
            console.log("err!"+JSON.stringify(error))
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }

    async createUpdateSatwa(collection): Promise<GetStandardApiRespone> {
        try {
            console.log("api u-satwa start!")

            let bodyFormData = new FormData();
            for (const el of Object.keys(collection)) {
                bodyFormData.append(el, collection[el]);
            }

            const response: ApiResponse<any> = await this.api.apisauce.post(
                "/api/update_satwa/store",
                bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (!response.ok) {
                console.log("fail!"+JSON.stringify(response));
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const data = response.data
            console.log("api u-satwa success!")

            return { kind: "ok", data };
        } catch (error) {
            console.log("err!"+JSON.stringify(error))
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }
}