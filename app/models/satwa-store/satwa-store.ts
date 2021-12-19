import { applySnapshot, cast, Instance, SnapshotOut, types } from "mobx-state-tree"
import { SatwaUpdateModel, SatwaUpdateSnapshot } from "../satwa-update/satwa-update"
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
    satwaupdates: types.optional(types.array(SatwaUpdateModel), []),
    errmsg: types.optional(types.string, ''),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveSatwa: (satwaSnapshot: SatwaSnapshot[]) => {
      applySnapshot(self.satwa, satwaSnapshot);
      // self.satwa = cast(satwaSnapshot);
    },
    saveSatwaUpdates: (satwaUpdateSnapshot: SatwaUpdateSnapshot[]) => {
      applySnapshot(self.satwaupdates, satwaUpdateSnapshot);
    },
    setErrmsg: (err: string) => {
      self.errmsg = err
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
    getAllUpdateSatwa: async () => {
      const satwaApi = new SatwaApi(self.environment.api)
      const result = await satwaApi.getAllUpdateSatwa()

      if (result.kind === "ok") {
        self.saveSatwaUpdates(result.satwaupdate)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    createUpdateSatwa: async (collection) => {
      const satwaApi = new SatwaApi(self.environment.api)
      const result = await satwaApi.createUpdateSatwa(collection)

      if (result.kind === "ok") {
        self.setErrmsg('');
      } else {
        self.setErrmsg('Error occured!');
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type SatwaStoreType = Instance<typeof SatwaStoreModel>
export interface SatwaStore extends SatwaStoreType {}
type SatwaStoreSnapshotType = SnapshotOut<typeof SatwaStoreModel>
export interface SatwaStoreSnapshot extends SatwaStoreSnapshotType {}
export const createSatwaStoreDefaultModel = () => types.optional(SatwaStoreModel, {})
