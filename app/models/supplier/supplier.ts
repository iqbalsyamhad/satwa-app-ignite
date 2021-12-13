import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SupplierModel = types
  .model("Supplier")
  .props({
    id: types.maybe(types.integer),
    nama: types.maybe(types.string),
    alamat: types.maybe(types.string),
    no_hp: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type SupplierType = Instance<typeof SupplierModel>
export interface Supplier extends SupplierType {}
type SupplierSnapshotType = SnapshotOut<typeof SupplierModel>
export interface SupplierSnapshot extends SupplierSnapshotType {}
export const createSupplierDefaultModel = () => types.optional(SupplierModel, {})
