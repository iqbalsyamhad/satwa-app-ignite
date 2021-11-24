import { FormActivityStoreModel } from "./form-activity-store"

test("can be created", () => {
  const instance = FormActivityStoreModel.create({})

  expect(instance).toBeTruthy()
})
