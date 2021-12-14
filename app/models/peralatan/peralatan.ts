import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PeralatanKategoriModel } from "../peralatan-kategori/peralatan-kategori"

/**
 * Model description here for TypeScript hints.
 */
export const PeralatanModel = types
  .model("Peralatan")
  .props({
    id: types.maybe(types.integer),
    nama: types.maybe(types.string),
    stok: types.maybe(types.integer),
    id_kategori_peralatan: types.maybe(types.integer),
    kategori: types.optional(PeralatanKategoriModel, {}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PeralatanType = Instance<typeof PeralatanModel>
export interface Peralatan extends PeralatanType {}
type PeralatanSnapshotType = SnapshotOut<typeof PeralatanModel>
export interface PeralatanSnapshot extends PeralatanSnapshotType {}
export const createPeralatanDefaultModel = () => types.optional(PeralatanModel, {})
