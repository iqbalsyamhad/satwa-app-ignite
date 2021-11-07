import { cast, Instance, SnapshotOut, types } from "mobx-state-tree"
import { HistoriesModel, HistoriesSnapshot } from "../histories/histories"
import { HistoryApi } from "../../services/api/history/history-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const HistoriesStoreModel = types
  .model("HistoriesStore")
  .props({
    histories: types.optional(HistoriesModel, {}),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveHistories: (historiesSnapshot: HistoriesSnapshot) => {
      self.histories = cast(historiesSnapshot)
    },
  }))
  .actions((self) => ({
    getHistories: async (page) => {
      const historiesApi = new HistoryApi(self.environment.api)
      const result = await historiesApi.getHistory(page)

      if (result.kind === "ok") {
        self.saveHistories(result.histories)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type HistoriesStoreType = Instance<typeof HistoriesStoreModel>
export interface HistoriesStore extends HistoriesStoreType { }
type HistoriesStoreSnapshotType = SnapshotOut<typeof HistoriesStoreModel>
export interface HistoriesStoreSnapshot extends HistoriesStoreSnapshotType { }
export const createHistoriesStoreDefaultModel = () => types.optional(HistoriesStoreModel, {})
