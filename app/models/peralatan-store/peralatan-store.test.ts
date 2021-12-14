import { PeralatanStoreModel } from "./peralatan-store"

test("can be created", () => {
  const instance = PeralatanStoreModel.create({})

  expect(instance).toBeTruthy()
})
