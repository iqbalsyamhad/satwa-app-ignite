import { HistoriesModel } from "./histories"

test("can be created", () => {
  const instance = HistoriesModel.create({})

  expect(instance).toBeTruthy()
})
