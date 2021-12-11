import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ActivityModel } from "../activity/activity"

/**
 * Model description here for TypeScript hints.
 */
export const FormActivityItemModel = types
  .model("FormActivityItem")
  .props({
    id: types.maybe(types.integer),
    // formActivityId: types.maybe(types.integer),
    id_jenis_aktivitas: types.maybe(types.integer),
    jenis_aktivitas: types.maybe(ActivityModel),
    activityResult: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type FormActivityItemType = Instance<typeof FormActivityItemModel>
export interface FormActivityItem extends FormActivityItemType {}
type FormActivityItemSnapshotType = SnapshotOut<typeof FormActivityItemModel>
export interface FormActivityItemSnapshot extends FormActivityItemSnapshotType {}
export const createFormActivityItemDefaultModel = () => types.optional(FormActivityItemModel, {})
