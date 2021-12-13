import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "../user/user"
import { FormActivityItemModel } from "../form-activity-item/form-activity-item"
import { SatwaModel } from "../satwa/satwa"

/**
 * Model description here for TypeScript hints.
 */
export const FormActivityModel = types
  .model("FormActivity")
  .props({
    id: types.maybe(types.integer),
    tanggal: types.maybe(types.string),
    id_satwa: types.maybe(types.integer),
    satwa: types.optional(SatwaModel, {}),
    id_pelaksana: types.maybe(types.integer),
    list_aktivitas: types.optional(types.array(FormActivityItemModel), []),
    status: types.maybe(types.string),
    pelaksana: types.optional(UserModel, {}),
    koordinator: types.optional(UserModel, {}),
    kadiv: types.optional(UserModel, {}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type FormActivityType = Instance<typeof FormActivityModel>
export interface FormActivity extends FormActivityType { }
type FormActivitySnapshotType = SnapshotOut<typeof FormActivityModel>
export interface FormActivitySnapshot extends FormActivitySnapshotType { }
export const createFormActivityDefaultModel = () => types.optional(FormActivityModel, {})
