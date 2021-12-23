import { flow } from "mobx";
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationModel, AuthenticationSnapshot } from "../authentication/authentication";
import { LoginResult } from "../../services/api";
import { AuthenticationApi } from "../../services/api/authentication/authentication-api";
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
import { withStatus } from "../extensions/with-status"
import { UserApi } from "../../services/api/user/user-api";

/**
 * Model description here for TypeScript hints.
 */
export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    isAuthenticated: types.optional(types.boolean, false),
    user: types.optional(AuthenticationModel, {}),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .extend(withStatus)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setAuthenticated(value: boolean) {
      self.isAuthenticated = value;
    },
    setUser(authenticationSnapshot: AuthenticationSnapshot) {
      self.user = authenticationSnapshot;
    },
  }))
  .actions((self) => ({
    login: flow(function* (email: string, password: string) {
      self.setStatus("loading");

      const authApi = new AuthenticationApi(self.environment.api);
      const result: LoginResult = yield authApi.login(
        email,
        password
      );

      if (result.kind === "ok") {
        self.setStatus("done");
        self.environment.api.setAuthorizationHeader(result.user.token)
        self.setAuthenticated(true);
        self.setUser(result.user);
      } else {
        self.setStatus("error");
        self.setAuthenticated(false);
        __DEV__ && console.tron.log(result.kind);
      }
    }),

    logout: flow(function* () {
      self.environment.api.setAuthorizationHeader();
      self.setAuthenticated(false);
    }),

    getUser: async () => {
      const userApi = new UserApi(self.environment.api)
      const result = await userApi.getUser()

      if (result.kind === "ok") {
        return result.user;
      } else {
        __DEV__ && console.tron.log(result.kind)
        return false;
      }
    },

    updateUser: async (collection) => {
      const userApi = new UserApi(self.environment.api)
      const result = await userApi.updateUser(collection)

      if (result.kind === "ok") {
        if (result.data.message == 'success') {
          let newuserdata = JSON.parse(JSON.stringify(self.user));
          newuserdata.nama = collection.name;
          newuserdata.email = collection.email;
          self.setUser(newuserdata);
          return true;
        } else {
          alert(result.data.status);
          return false;
        }
      } else {
        __DEV__ && console.tron.log(result.kind)
        return false;
      }
    },

    changePassword: async (collection) => {
      const userApi = new UserApi(self.environment.api)
      const result = await userApi.changePassword(collection)

      if (result.kind === "ok") {
        return true;
      } else {
        __DEV__ && console.tron.log(result.kind)
        return false;
      }
    },

    forgotPassword: async (email) => {
      const authApi = new AuthenticationApi(self.environment.api)
      const result = await authApi.forgotPassword(email)

      if (result.kind === "ok") {
        return true;
      } else {
        __DEV__ && console.tron.log(result.kind)
        return false;
      }
    },

    updatePassword: async (collection) => {
      const authApi = new AuthenticationApi(self.environment.api)
      const result = await authApi.resetPassword(collection)

      if (result.kind === "ok") {
        return true;
      } else {
        __DEV__ && console.tron.log(result.kind)
        return false;
      }
    },
  }))

type AuthenticationStoreType = Instance<typeof AuthenticationStoreModel>
export interface AuthenticationStore extends AuthenticationStoreType { }
type AuthenticationStoreSnapshotType = SnapshotOut<typeof AuthenticationStoreModel>
export interface AuthenticationStoreSnapshot extends AuthenticationStoreSnapshotType { }
export const createAuthenticationStoreDefaultModel = () => types.optional(AuthenticationStoreModel, {})
