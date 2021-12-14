import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PeralatanKategoriModel = types
  .model("PeralatanKategori")
  .props({
    id: types.maybe(types.integer),
    nama: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PeralatanKategoriType = Instance<typeof PeralatanKategoriModel>
export interface PeralatanKategori extends PeralatanKategoriType {}
type PeralatanKategoriSnapshotType = SnapshotOut<typeof PeralatanKategoriModel>
export interface PeralatanKategoriSnapshot extends PeralatanKategoriSnapshotType {}
export const createPeralatanKategoriDefaultModel = () => types.optional(PeralatanKategoriModel, {})
