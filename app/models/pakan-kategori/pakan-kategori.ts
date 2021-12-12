import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PakanKategoriModel = types
  .model("PakanKategori")
  .props({
    id: types.maybe(types.integer),
    nama: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PakanKategoriType = Instance<typeof PakanKategoriModel>
export interface PakanKategori extends PakanKategoriType { }
type PakanKategoriSnapshotType = SnapshotOut<typeof PakanKategoriModel>
export interface PakanKategoriSnapshot extends PakanKategoriSnapshotType { }
export const createPakanKategoriDefaultModel = () => types.optional(PakanKategoriModel, {})
