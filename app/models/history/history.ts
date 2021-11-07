import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const HistoryModel = types
  .model("History")
  .props({
    "id": types.maybe(types.integer),
    "tanggal": types.maybe(types.string),
    "status": types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type HistoryType = Instance<typeof HistoryModel>
export interface History extends HistoryType { }
type HistorySnapshotType = SnapshotOut<typeof HistoryModel>
export interface HistorySnapshot extends HistorySnapshotType { }
export const createHistoryDefaultModel = () => types.optional(HistoryModel, {})
