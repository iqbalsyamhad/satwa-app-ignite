import { ApiResponse } from "apisauce";
import { Api } from "../api";
import { getGeneralApiProblem } from "../api-problem";
import { GetPakanResults, GetPakanPermasalahanResult, CreatePakanPermasalahanResult } from "../api.types";

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

    async getAllPakanPermasalahan(page, date, pakan_): Promise<GetPakanPermasalahanResult> {
        try {
            console.log("api pakan-m start!")
            let qs = '';
            if (date != '') qs = qs + `&tanggal=${date}`;
            if (pakan_?.id) qs = qs + `&id_pakan=${pakan_.id}`;
            const response: ApiResponse<any> = await this.api.apisauce.get(
                `/api/serah_terima_pakan?page=${page}${qs}`,
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

    async createPakanPermasalahan(collection): Promise<CreatePakanPermasalahanResult> {
        try {
            let bodyFormData = new FormData();
            for (const el of Object.keys(collection)) {
                bodyFormData.append(el, collection[el]);
            }

            const response: ApiResponse<any> = await this.api.apisauce.post(
                "/api/serah_terima_pakan/store",
                bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            console.log(JSON.stringify(response))

            if (!response.ok) {
                alert(Object.values(response.data.status)[0]);
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