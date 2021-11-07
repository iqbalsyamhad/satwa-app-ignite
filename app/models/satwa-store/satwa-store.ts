import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SatwaApi } from "../../services/api/satwa/satwa-api"
import { withEnvironment } from "../extensions/with-environment"
import { SatwaModel, SatwaSnapshot } from "../satwa/satwa"

/**
 * Model description here for TypeScript hints.
 */
export const SatwaStoreModel = types
  .model("SatwaStore")
  .props({
    satwa: types.optional(types.array(SatwaModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveSatwa: (satwaSnapshot: SatwaSnapshot[]) => {
      self.satwa.replace(satwaSnapshot);
    },
  }))
  .actions((self) => ({
    getAllSatwa: async () => {
      const satwaApi = new SatwaApi(self.environment.api)
      const result = await satwaApi.getAllSatwa()

      if (result.kind === "ok") {
        self.saveSatwa(result.satwa)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type SatwaStoreType = Instance<typeof SatwaStoreModel>
export interface SatwaStore extends SatwaStoreType {}
type SatwaStoreSnapshotType = SnapshotOut<typeof SatwaStoreModel>
export interface SatwaStoreSnapshot extends SatwaStoreSnapshotType {}
export const createSatwaStoreDefaultModel = () => types.optional(SatwaStoreModel, {})
