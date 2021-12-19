import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PakanPermasalahanModel } from "../pakan-permasalahan/pakan-permasalahan"

/**
 * Model description here for TypeScript hints.
 */
export const PakanPermasalahanParentModel = types
  .model("PakanPermasalahanParent")
  .props({
    current_page: types.maybe(types.integer),
    last_page: types.maybe(types.integer),
    total: types.maybe(types.integer),
    data: types.optional(types.array(PakanPermasalahanModel), [])
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PakanPermasalahanParentType = Instance<typeof PakanPermasalahanParentModel>
export interface PakanPermasalahanParent extends PakanPermasalahanParentType { }
type PakanPermasalahanParentSnapshotType = SnapshotOut<typeof PakanPermasalahanParentModel>
export interface PakanPermasalahanParentSnapshot extends PakanPermasalahanParentSnapshotType { }
export const createPakanPermasalahanParentDefaultModel = () => types.optional(PakanPermasalahanParentModel, {})
