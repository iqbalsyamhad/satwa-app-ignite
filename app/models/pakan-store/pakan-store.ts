import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { PakanSnapshot } from "..";
import { PakanApi } from "../../services/api/pakan/pakan-api";
import { withEnvironment } from "../extensions/with-environment"
import { PakanModel } from "../pakan/pakan"

/**
 * Model description here for TypeScript hints.
 */
export const PakanStoreModel = types
  .model("PakanStore")
  .props({
    pakans: types.optional(types.array(PakanModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    savePakans: (pakanSnapshot: PakanSnapshot[]) => {
      applySnapshot(self.pakans, pakanSnapshot);
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
  }))

type PakanStoreType = Instance<typeof PakanStoreModel>
export interface PakanStore extends PakanStoreType { }
type PakanStoreSnapshotType = SnapshotOut<typeof PakanStoreModel>
export interface PakanStoreSnapshot extends PakanStoreSnapshotType { }
export const createPakanStoreDefaultModel = () => types.optional(PakanStoreModel, {})
