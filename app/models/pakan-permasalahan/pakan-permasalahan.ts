import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PakanModel } from "../pakan/pakan"
import { SupplierModel } from "../supplier/supplier"

/**
 * Model description here for TypeScript hints.
 */
export const PakanPermasalahanModel = types
  .model("PakanPermasalahan")
  .props({
    id: types.maybe(types.integer),
    id_pakan: types.maybe(types.integer),
    jumlah: types.maybe(types.integer),
    id_supplier: types.maybe(types.integer),
    keterangan: types.maybe(types.string),
    alasan: types.maybe(types.string),
    bukti_foto: types.maybe(types.string),
    pakan: types.optional(PakanModel, {}),
    supplier: types.optional(SupplierModel, {}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PakanPermasalahanType = Instance<typeof PakanPermasalahanModel>
export interface PakanPermasalahan extends PakanPermasalahanType {}
type PakanPermasalahanSnapshotType = SnapshotOut<typeof PakanPermasalahanModel>
export interface PakanPermasalahanSnapshot extends PakanPermasalahanSnapshotType {}
export const createPakanPermasalahanDefaultModel = () => types.optional(PakanPermasalahanModel, {})
