import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PeralatanModel } from "../peralatan/peralatan"

/**
 * Model description here for TypeScript hints.
 */
export const PeralatanPenggunaanModel = types
  .model("PeralatanPenggunaan")
  .props({
    id: types.maybe(types.integer),
    jumlah: types.maybe(types.integer),
    keterangan: types.maybe(types.string),
    id_peralatan: types.maybe(types.integer),
    peralatan: types.optional(PeralatanModel, {}),
    created_at: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PeralatanPenggunaanType = Instance<typeof PeralatanPenggunaanModel>
export interface PeralatanPenggunaan extends PeralatanPenggunaanType {}
type PeralatanPenggunaanSnapshotType = SnapshotOut<typeof PeralatanPenggunaanModel>
export interface PeralatanPenggunaanSnapshot extends PeralatanPenggunaanSnapshotType {}
export const createPeralatanPenggunaanDefaultModel = () => types.optional(PeralatanPenggunaanModel, {})
