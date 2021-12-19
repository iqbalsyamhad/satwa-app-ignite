import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PakanKategoriModel } from "../pakan-kategori/pakan-kategori"

/**
 * Model description here for TypeScript hints.
 */
export const PakanModel = types
  .model("Pakan")
  .props({
    id: types.maybe(types.integer),
    nama: types.maybe(types.string),
    stok_tetap: types.maybe(types.integer),
    stok_datang: types.maybe(types.integer),
    id_kategori_pakan: types.maybe(types.integer),
    kategori: types.optional(PakanKategoriModel, {}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PakanType = Instance<typeof PakanModel>
export interface Pakan extends PakanType { }
type PakanSnapshotType = SnapshotOut<typeof PakanModel>
export interface PakanSnapshot extends PakanSnapshotType { }
export const createPakanDefaultModel = () => types.optional(PakanModel, {})
