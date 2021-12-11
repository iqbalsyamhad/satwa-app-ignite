import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SatwaJenisApi } from "../../services/api/satwa-jenis/satwa-jenis-api";
import { withEnvironment } from "../extensions/with-environment"
import { SatwaJenisModel, SatwaJenisSnapshot } from "../satwa-jenis/satwa-jenis"

/**
 * Model description here for TypeScript hints.
 */
export const SatwaJenisStoreModel = types
  .model("SatwaJenisStore")
  .props({
    satwa_jenis: types.optional(types.array(SatwaJenisModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveSatwaJenis: (satwaJenisSnapshot: SatwaJenisSnapshot[]) => {
      self.satwa_jenis.replace(satwaJenisSnapshot);
    },
  }))
  .actions((self) => ({
    getAllSatwaJenis: async () => {
      const satwaJenisApi = new SatwaJenisApi(self.environment.api)
      const result = await satwaJenisApi.getAllSatwaJenis()

      if (result.kind === "ok") {
        self.saveSatwaJenis(result.satwa_jenis)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type SatwaJenisStoreType = Instance<typeof SatwaJenisStoreModel>
export interface SatwaJenisStore extends SatwaJenisStoreType {}
type SatwaJenisStoreSnapshotType = SnapshotOut<typeof SatwaJenisStoreModel>
export interface SatwaJenisStoreSnapshot extends SatwaJenisStoreSnapshotType {}
export const createSatwaJenisStoreDefaultModel = () => types.optional(SatwaJenisStoreModel, {})
