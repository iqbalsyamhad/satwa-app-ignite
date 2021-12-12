import { GeneralApiProblem } from "./api-problem"
import { Authentication } from "../../models/authentication/authentication"
import { SatwaJenis } from "../../models/satwa-jenis/satwa-jenis"
import { Satwa } from "../../models/satwa/satwa"
import { FormActivities } from "../../models/form-activities/form-activities"
import { FormActivity } from "../../models/form-activity/form-activity"

export type LoginResult = { kind: "ok"; user: Authentication } | GeneralApiProblem
export type LogoutResult = { kind: "ok"; } | GeneralApiProblem

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetSatwaJenisResults = { kind: "ok"; satwa_jenis: SatwaJenis[] } | GeneralApiProblem

export type GetSatwaResults = { kind: "ok"; satwa: Satwa[] } | GeneralApiProblem
export type GetSatwaResult = { kind: "ok"; satwa: Satwa } | GeneralApiProblem

export type GetFormActivityResults = { kind: "ok"; formactivities: FormActivities } | GeneralApiProblem
export type GetFormActivityResult = { kind: "ok"; formactivity: FormActivity } | GeneralApiProblem

export interface StandardApiRespone {
  status: string
  message: string
}

export type GetStandardApiRespone = { kind: "ok"; data: StandardApiRespone } | GeneralApiProblem