import { ApiResponse } from "apisauce";
import { FormActivityItem } from "../../../models/form-activity-item/form-activity-item";
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
                "/api/aktivitas",
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

    async getOneFormActivity(formId = null, date = null, satwaId = null): Promise<GetFormActivityResult> {
        try {
            // catch id for selected query
            if (!formId) {
                const response: ApiResponse<any> = await this.api.apisauce.get(
                    `/api/aktivitas?id_satwa=${satwaId}&tanggal=${date}`,
                );

                if (!response.ok) {
                    const problem = getGeneralApiProblem(response);
                    if (problem) return problem;
                }

                const { data } = response.data;
                if (!data.length) {
                    alert('No Data!');
                    return { kind: "bad-data" };
                }

                formId = data[0].id;
            }

            // get detail data
            const responsedetail: ApiResponse<any> = await this.api.apisauce.get(
                `/api/aktivitas/detail/${formId}`,
            );

            if (!responsedetail.ok) {
                const problem = getGeneralApiProblem(responsedetail);
                if (problem) return problem;
            }

            let formactivity = responsedetail.data.data;

            // get all activity
            const responseactivity: ApiResponse<any> = await this.api.apisauce.get(
                `/api/jenis_aktivitas`,
            );

            if (!responseactivity.ok) {
                const problem = getGeneralApiProblem(responseactivity);
                if (problem) return problem;
            }

            let activities = responseactivity.data.data;
            if (activities.length) {
                for (const activity of activities) {
                    if (formactivity.list_aktivitas.findIndex(i => i.id_jenis_aktivitas == activity.id) == -1) {
                        let currentactivity: FormActivityItem = {
                            id: 0,
                            id_jenis_aktivitas: activity.id,
                            jenis_aktivitas: activity,
                            activityResult: '',
                        };
                        formactivity.list_aktivitas.push(currentactivity);
                    }
                }
            }

            return { kind: "ok", formactivity };
        } catch (error) {
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }

    async updateActivityItem(collection): Promise<any> {
        try {
            const { id, ...other } = collection;

            let bodyFormData = new FormData();
            for (const el of Object.keys(other)) {
                bodyFormData.append(el, other[el]);
            }

            const response: ApiResponse<any> = await this.api.apisauce.post(
                "/api/aktivitas/list/store",
                bodyFormData
            );

            if (!response.ok) {
                const problem = getGeneralApiProblem(response);
                if (problem) return problem;
            }

            const result = response.data

            return { kind: "ok", result };
        } catch (error) {
            __DEV__ && console.tron.log(error.message);
            return { kind: "bad-data" };
        }
    }
}