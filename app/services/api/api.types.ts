import { GeneralApiProblem } from "./api-problem"
import { Authentication } from "../../models/authentication/authentication"
import { SatwaJenis } from "../../models/satwa-jenis/satwa-jenis"
import { Satwa } from "../../models/satwa/satwa"
import { FormActivities } from "../../models/form-activities/form-activities"
import { FormActivity } from "../../models/form-activity/form-activity"
import { Pakan } from "../../models/pakan/pakan"
import { PakanPermasalahan } from "../../models/pakan-permasalahan/pakan-permasalahan"
import { Supplier } from "../../models/supplier/supplier"
import { SatwaUpdate } from "../../models/satwa-update/satwa-update"

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

export type GetSatwaUpdateResults = { kind: "ok"; satwaupdate: SatwaUpdate[] } | GeneralApiProblem
export type GetSatwaUpdateResult = { kind: "ok"; satwaupdate: SatwaUpdate } | GeneralApiProblem

export type GetFormActivityResults = { kind: "ok"; formactivities: FormActivities } | GeneralApiProblem
export type GetFormActivityResult = { kind: "ok"; formactivity: FormActivity } | GeneralApiProblem

export interface StandardApiRespone {
  status: string
  message: string
}

export type GetStandardApiRespone = { kind: "ok"; data: StandardApiRespone } | GeneralApiProblem

export type GetPakanResults = { kind: "ok"; pakan: Pakan[] } | GeneralApiProblem
export type GetPakanResult = { kind: "ok"; pakan: Pakan } | GeneralApiProblem

export type GetPakanPermasalahanResults = { kind: "ok"; pakan: PakanPermasalahan[] } | GeneralApiProblem
export type GetPakanPermasalahanResult = { kind: "ok"; pakan: PakanPermasalahan } | GeneralApiProblem

export type GetSupplierResults = { kind: "ok"; supplier: Supplier[] } | GeneralApiProblem
export type GetSupplierResult = { kind: "ok"; supplier: Supplier } | GeneralApiProblem