import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ActivityOptionModel } from "../activity-option/activity-option"

/**
 * Model description here for TypeScript hints.
 */
export const ActivityModel = types
  .model("Activity")
  .props({
    id: types.maybe(types.integer),
    name: types.maybe(types.string),
    activityInput: types.maybe(types.string),
    activityType: types.maybe(types.string),
    options: types.optional(types.array(ActivityOptionModel), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type ActivityType = Instance<typeof ActivityModel>
export interface Activity extends ActivityType {}
type ActivitySnapshotType = SnapshotOut<typeof ActivityModel>
export interface ActivitySnapshot extends ActivitySnapshotType {}
export const createActivityDefaultModel = () => types.optional(ActivityModel, {})
