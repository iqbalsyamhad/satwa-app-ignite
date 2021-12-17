import { cast, Instance, SnapshotOut, types } from "mobx-state-tree"
import { FormActivitiesModel, FormActivitiesSnapshot } from "../form-activities/form-activities"
import { FormActivityModel, FormActivitySnapshot } from "../form-activity/form-activity"
import { FormActivityApi } from "../../services/api/form-activity/form-activity-api"
import { withEnvironment } from "../extensions/with-environment"
import { SatwaModel, SatwaSnapshot } from "../satwa/satwa"

/**
 * Model description here for TypeScript hints.
 */
export const FormActivityStoreModel = types
  .model("FormActivityStore")
  .props({
    formactivities: types.optional(FormActivitiesModel, {}),
    formactivity: types.optional(FormActivityModel, {}),
    filterDate: types.optional(types.string, ''),
    filterSatwa: types.optional(SatwaModel, {}),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveFormActivities: (formActivitiesSnapshot: FormActivitiesSnapshot) => {
      self.formactivities = cast(formActivitiesSnapshot)
    },
    saveFormActivity: (formActivitySnapshot: FormActivitySnapshot) => {
      self.formactivity = cast(formActivitySnapshot)
    },
    resetFormActivities: () => {
      self.formactivities = cast({})
    },
    resetFormActivity: () => {
      self.formactivity = cast({})
    },
    setFilterDate: (date) => {
      self.filterDate = date
    },
    setFilterSatwa: (satwa: SatwaSnapshot) => {
      self.filterSatwa = cast(satwa)
    },
  }))
  .actions((self) => ({
    setCurrentPage: async (page) => {
      let newdata = JSON.parse(JSON.stringify(self.formactivities))
      newdata.current_page = page
      newdata.data = []

      self.saveFormActivities(newdata)
    },
    getAllFormActivities: async () => {
      const formActivityApi = new FormActivityApi(self.environment.api)
      const result = await formActivityApi.getAllFormActivity(
        self.formactivities.current_page,
        self.filterDate,
        self.filterSatwa
      )

      if (result.kind === "ok") {
        self.saveFormActivities(result.formactivities)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    getFormActivity: async (id = null, date = null, satwaId = null) => {
      const formActivityApi = new FormActivityApi(self.environment.api)
      const result = await formActivityApi.getOneFormActivity(id, date, satwaId)

      if (result.kind === "ok") {
        self.saveFormActivity(result.formactivity)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    createFormActivity: async (date, satwaId) => {
      const formActivityApi = new FormActivityApi(self.environment.api)
      const result = await formActivityApi.createFormActivity(date, satwaId)

      if (result.kind === "ok") {
        //
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    updateActivityItem: async (collection) => {
      const formActivityApi = new FormActivityApi(self.environment.api)
      const result = await formActivityApi.updateActivityItem(collection)

      if (result.kind === "ok") {
        if (result.data.message == "success") {
          let activity = JSON.parse(JSON.stringify(self.formactivity));
          let index = activity.list_aktivitas.findIndex(i => i.id_jenis_aktivitas == collection.id_jenis_aktivitas);
          if (index >= 0) {
            activity.list_aktivitas[index] = collection;
            self.saveFormActivity(activity);
          } else {
            alert('Unknown error. Please reload!');
          }
        } else {
          alert(result.data.status);
        }
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type FormActivityStoreType = Instance<typeof FormActivityStoreModel>
export interface FormActivityStore extends FormActivityStoreType { }
type FormActivityStoreSnapshotType = SnapshotOut<typeof FormActivityStoreModel>
export interface FormActivityStoreSnapshot extends FormActivityStoreSnapshotType { }
export const createFormActivityStoreDefaultModel = () => types.optional(FormActivityStoreModel, {})
