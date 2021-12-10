import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SatwaJenisModel = types
  .model("SatwaJenis")
  .props({
    id: types.maybe(types.integer),
    nama: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type SatwaJenisType = Instance<typeof SatwaJenisModel>
export interface SatwaJenis extends SatwaJenisType {}
type SatwaJenisSnapshotType = SnapshotOut<typeof SatwaJenisModel>
export interface SatwaJenisSnapshot extends SatwaJenisSnapshotType {}
export const createSatwaJenisDefaultModel = () => types.optional(SatwaJenisModel, {})
