import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SatwaStoreModel } from "../satwa-store/satwa-store"
import { AuthenticationStoreModel } from "../authentication-store/authentication-store"
import { HistoriesStoreModel } from "../histories-store/histories-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {} as any),
  historiesStore: types.optional(HistoriesStoreModel, {} as any),
  satwaStore: types.optional(SatwaStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
