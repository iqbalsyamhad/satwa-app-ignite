import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { FormActivityModel } from "../form-activity/form-activity"

/**
 * Model description here for TypeScript hints.
 */
export const FormActivitiesModel = types
  .model("FormActivities")
  .props({
    current_page: types.maybe(types.integer),
    last_page: types.maybe(types.integer),
    total: types.maybe(types.integer),
    data: types.optional(types.array(FormActivityModel), [])
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type FormActivitiesType = Instance<typeof FormActivitiesModel>
export interface FormActivities extends FormActivitiesType {}
type FormActivitiesSnapshotType = SnapshotOut<typeof FormActivitiesModel>
export interface FormActivitiesSnapshot extends FormActivitiesSnapshotType {}
export const createFormActivitiesDefaultModel = () => types.optional(FormActivitiesModel, {})
