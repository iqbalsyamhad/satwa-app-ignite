import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ActivityOptionModel = types
  .model("ActivityOption")
  .props({
    name: types.maybe(types.string),
    value: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type ActivityOptionType = Instance<typeof ActivityOptionModel>
export interface ActivityOption extends ActivityOptionType {}
type ActivityOptionSnapshotType = SnapshotOut<typeof ActivityOptionModel>
export interface ActivityOptionSnapshot extends ActivityOptionSnapshotType {}
export const createActivityOptionDefaultModel = () => types.optional(ActivityOptionModel, {})
