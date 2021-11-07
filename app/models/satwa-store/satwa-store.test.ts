import { SatwaStoreModel } from "./satwa-store"

test("can be created", () => {
  const instance = SatwaStoreModel.create({})

  expect(instance).toBeTruthy()
})
