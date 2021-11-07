import { GeneralApiProblem } from "./api-problem"
import { Authentication } from "../../models/authentication/authentication"
import { Histories } from "../../models/histories/histories"
import { Satwa } from "../../models/satwa/satwa"

export type LoginResult = { kind: "ok"; user: Authentication } | GeneralApiProblem
export type LogoutResult = { kind: "ok"; } | GeneralApiProblem

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetHistoriesResult = { kind: "ok"; histories: Histories } | GeneralApiProblem

export type GetSatwaResults = { kind: "ok"; satwa: Satwa[] } | GeneralApiProblem
export type GetSatwaResult = { kind: "ok"; satwa: Satwa } | GeneralApiProblem