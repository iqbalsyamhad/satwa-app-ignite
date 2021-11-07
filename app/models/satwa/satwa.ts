import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SatwaModel = types
  .model("Satwa")
  .props({
    id: types.maybe(types.integer),
    name: types.maybe(types.string),
    // category: types.maybe(types.string),
    qty: types.maybe(types.integer),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type SatwaType = Instance<typeof SatwaModel>
export interface Satwa extends SatwaType {}
type SatwaSnapshotType = SnapshotOut<typeof SatwaModel>
export interface SatwaSnapshot extends SatwaSnapshotType {}
export const createSatwaDefaultModel = () => types.optional(SatwaModel, {})
