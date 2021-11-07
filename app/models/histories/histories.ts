import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { HistoryModel } from "../history/history"

/**
 * Model description here for TypeScript hints.
 */
export const HistoriesModel = types
  .model("Histories")
  .props({
    "page": types.maybe(types.integer),
    "totalPage": types.maybe(types.integer),
    "count": types.maybe(types.integer),
    "data": types.optional(types.array(HistoryModel), [])
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type HistoriesType = Instance<typeof HistoriesModel>
export interface Histories extends HistoriesType { }
type HistoriesSnapshotType = SnapshotOut<typeof HistoriesModel>
export interface HistoriesSnapshot extends HistoriesSnapshotType { }
export const createHistoriesDefaultModel = () => types.optional(HistoriesModel, {})
