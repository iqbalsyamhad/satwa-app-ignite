import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "../authentication-store/authentication-store"
import { SatwaStoreModel } from "../satwa-store/satwa-store"
import { SatwaJenisStoreModel } from "../satwa-jenis-store/satwa-jenis-store"
import { FormActivityStoreModel } from "../form-activity-store/form-activity-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {} as any),
  satwaStore: types.optional(SatwaStoreModel, {} as any),
  satwaJenisStore: types.optional(SatwaJenisStoreModel, {} as any),
  formActivitiesStore: types.optional(FormActivityStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
