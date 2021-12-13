import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { PakanApi } from "../../services/api/pakan/pakan-api";
import { withEnvironment } from "../extensions/with-environment"
import { PakanModel, PakanSnapshot } from "../pakan/pakan"
import { PakanPermasalahanModel, PakanPermasalahanSnapshot } from "../pakan-permasalahan/pakan-permasalahan";

/**
 * Model description here for TypeScript hints.
 */
export const PakanStoreModel = types
  .model("PakanStore")
  .props({
    pakans: types.optional(types.array(PakanModel), []),
    pakansMasalah: types.optional(types.array(PakanPermasalahanModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    savePakans: (pakanSnapshot: PakanSnapshot[]) => {
      applySnapshot(self.pakans, pakanSnapshot);
      // self.pakans = cast(pakanSnapshot);
    },
    savePakansMasalah: (pakanMasalahSnapshot: PakanPermasalahanSnapshot[]) => {
      applySnapshot(self.pakansMasalah, pakanMasalahSnapshot);
      // self.pakans = cast(pakanSnapshot);
    },
  }))
  .actions((self) => ({
    getAllPakan: async () => {
      const pakanApi = new PakanApi(self.environment.api)
      const result = await pakanApi.getAllPakan()

      if (result.kind === "ok") {
        self.savePakans(result.pakan)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    getAllPakanPermasalahan: async () => {
      const pakanApi = new PakanApi(self.environment.api)
      const result = await pakanApi.getAllPakanPermasalahan()

      if (result.kind === "ok") {
        self.savePakansMasalah(result.pakan)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    createPakanPermasalahan: async (collection) => {
      const pakanApi = new PakanApi(self.environment.api)
      const result = await pakanApi.createPakanPermasalahan(collection)

      if (result.kind === "ok") {
        //
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type PakanStoreType = Instance<typeof PakanStoreModel>
export interface PakanStore extends PakanStoreType { }
type PakanStoreSnapshotType = SnapshotOut<typeof PakanStoreModel>
export interface PakanStoreSnapshot extends PakanStoreSnapshotType { }
export const createPakanStoreDefaultModel = () => types.optional(PakanStoreModel, {})
