import { flow } from "mobx";
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationModel, AuthenticationSnapshot } from "../authentication/authentication";
import { LoginResult } from "../../services/api";
import { AuthenticationApi } from "../../services/api/authentication/authentication-api";
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
import { withStatus } from "../extensions/with-status"

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
        self.setAuthenticated(true);
        self.setUser(result.user);
      } else {
        self.setStatus("error");
        self.setAuthenticated(false);
        __DEV__ && console.tron.log(result.kind);
      }
    }),

    logout: flow(function* () {
      self.setAuthenticated(false);
      self.environment.api.setAuthorizationHeader();
    }),
  }))

type AuthenticationStoreType = Instance<typeof AuthenticationStoreModel>
export interface AuthenticationStore extends AuthenticationStoreType { }
type AuthenticationStoreSnapshotType = SnapshotOut<typeof AuthenticationStoreModel>
export interface AuthenticationStoreSnapshot extends AuthenticationStoreSnapshotType { }
export const createAuthenticationStoreDefaultModel = () => types.optional(AuthenticationStoreModel, {})
