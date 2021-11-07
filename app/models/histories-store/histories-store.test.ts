import { HistoriesStoreModel } from "./histories-store"

test("can be created", () => {
  const instance = HistoriesStoreModel.create({})

  expect(instance).toBeTruthy()
})
