import { cast, Instance, SnapshotOut, types } from "mobx-state-tree"
import { FormActivitiesModel, FormActivitiesSnapshot } from "../form-activities/form-activities"
import { FormActivityApi } from "../../services/api/form-activity/form-activity-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const FormActivityStoreModel = types
  .model("FormActivityStore")
  .props({
    formactivities: types.optional(FormActivitiesModel, {}),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveFormActivities: (formActivitiesSnapshot: FormActivitiesSnapshot) => {
      self.formactivities = cast(formActivitiesSnapshot)
    },
  }))
  .actions((self) => ({
    getAllFormActivities: async (page) => {
      const formActivityApi = new FormActivityApi(self.environment.api)
      const result = await formActivityApi.getAllFormActivity(page)

      if (result.kind === "ok") {
        self.saveFormActivities(result.formactivities)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type FormActivityStoreType = Instance<typeof FormActivityStoreModel>
export interface FormActivityStore extends FormActivityStoreType {}
type FormActivityStoreSnapshotType = SnapshotOut<typeof FormActivityStoreModel>
export interface FormActivityStoreSnapshot extends FormActivityStoreSnapshotType {}
export const createFormActivityStoreDefaultModel = () => types.optional(FormActivityStoreModel, {})
