import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { FormActivityItemModel } from "../form-activity-item/form-activity-item"

/**
 * Model description here for TypeScript hints.
 */
export const FormActivityModel = types
  .model("FormActivity")
  .props({
    id: types.maybe(types.integer),
    tanggal: types.maybe(types.string),
    satwaId: types.maybe(types.integer),
    userId: types.maybe(types.integer),
    activities: types.optional(types.array(FormActivityItemModel), []),
    status: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type FormActivityType = Instance<typeof FormActivityModel>
export interface FormActivity extends FormActivityType {}
type FormActivitySnapshotType = SnapshotOut<typeof FormActivityModel>
export interface FormActivitySnapshot extends FormActivitySnapshotType {}
export const createFormActivityDefaultModel = () => types.optional(FormActivityModel, {})
