import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { SupplierApi } from "../../services/api/supplier/supplier-api";
import { withEnvironment } from "../extensions/with-environment"
import { SupplierModel, SupplierSnapshot } from "../supplier/supplier"

/**
 * Model description here for TypeScript hints.
 */
export const SupplierStoreModel = types
  .model("SupplierStore")
  .props({
    suppliers: types.optional(types.array(SupplierModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveSuppliers: (supplierSnapshot: SupplierSnapshot[]) => {
      applySnapshot(self.suppliers, supplierSnapshot);
      // self.suppliers = cast(supplierSnapshot);
    },
  }))
  .actions((self) => ({
    getAllSupplier: async () => {
      const suppApi = new SupplierApi(self.environment.api)
      const result = await suppApi.getAllSupplier()

      if (result.kind === "ok") {
        self.saveSuppliers(result.supplier)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type SupplierStoreType = Instance<typeof SupplierStoreModel>
export interface SupplierStore extends SupplierStoreType {}
type SupplierStoreSnapshotType = SnapshotOut<typeof SupplierStoreModel>
export interface SupplierStoreSnapshot extends SupplierStoreSnapshotType {}
export const createSupplierStoreDefaultModel = () => types.optional(SupplierStoreModel, {})
