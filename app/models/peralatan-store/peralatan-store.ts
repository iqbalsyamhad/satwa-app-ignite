import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { PeralatanPenggunaanModel, PeralatanPenggunaanSnapshot } from "../peralatan-penggunaan/peralatan-penggunaan";
import { PeralatanApi } from "../../services/api/peralatan/peralatan-api";
import { withEnvironment } from "../extensions/with-environment"
import { PeralatanModel, PeralatanSnapshot } from "../peralatan/peralatan"

/**
 * Model description here for TypeScript hints.
 */
export const PeralatanStoreModel = types
  .model("PeralatanStore")
  .props({
    loading: types.optional(types.boolean, false),
    errmsg: types.optional(types.string, ''),
    peralatans: types.optional(types.array(PeralatanModel), []),
    peralatanuses: types.optional(types.array(PeralatanPenggunaanModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    savePeralatans: (peralatanSnapshot: PeralatanSnapshot[]) => {
      applySnapshot(self.peralatans, peralatanSnapshot);
      // self.peralatans = cast(peralatanSnapshot);
    },
    savePeralatanUses: (peralatanUseSnapshot: PeralatanPenggunaanSnapshot[]) => {
      applySnapshot(self.peralatanuses, peralatanUseSnapshot);
    },
    setLoading: (loading: boolean) => {
      self.loading = loading;
    },
    setErrMsg: (msg: string) => {
      self.errmsg = msg;
    },
  }))
  .actions((self) => ({
    getAllPeralatan: async () => {
      const peralatanApi = new PeralatanApi(self.environment.api)
      const result = await peralatanApi.getAllPeralatan()

      if (result.kind === "ok") {
        self.savePeralatans(result.peralatan)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    getAllPeralatanPenggunaan: async () => {
      const peralatanApi = new PeralatanApi(self.environment.api)
      const result = await peralatanApi.getAllPeralatanPenggunaan()

      if (result.kind === "ok") {
        self.savePeralatanUses(result.peralatanuses)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    createPeralatanPenggunaan: async (collection) => {
      const peralatanApi = new PeralatanApi(self.environment.api)
      const result = await peralatanApi.createPeralatanPenggunaan(collection)

      if (result.kind === "ok") {
        if (result.data.message == "success") {
          self.setErrMsg('')
        } else {
          self.setErrMsg(result.data.status)
        }
      } else {
        self.setErrMsg('Unknown Error');
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type PeralatanStoreType = Instance<typeof PeralatanStoreModel>
export interface PeralatanStore extends PeralatanStoreType { }
type PeralatanStoreSnapshotType = SnapshotOut<typeof PeralatanStoreModel>
export interface PeralatanStoreSnapshot extends PeralatanStoreSnapshotType { }
export const createPeralatanStoreDefaultModel = () => types.optional(PeralatanStoreModel, {})
