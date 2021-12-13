import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SatwaModel } from "../satwa/satwa"

/**
 * Model description here for TypeScript hints.
 */
export const SatwaUpdateModel = types
  .model("SatwaUpdate")
  .props({
    id: types.maybe(types.integer),
    id_satwa: types.maybe(types.integer),
    keterangan: types.maybe(types.string),
    jumlah: types.maybe(types.integer),
    bukti_foto: types.maybe(types.string),
    satwa: types.optional(SatwaModel, {}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type SatwaUpdateType = Instance<typeof SatwaUpdateModel>
export interface SatwaUpdate extends SatwaUpdateType {}
type SatwaUpdateSnapshotType = SnapshotOut<typeof SatwaUpdateModel>
export interface SatwaUpdateSnapshot extends SatwaUpdateSnapshotType {}
export const createSatwaUpdateDefaultModel = () => types.optional(SatwaUpdateModel, {})
