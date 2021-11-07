import { HistoryModel } from "./history"

test("can be created", () => {
  const instance = HistoryModel.create({})

  expect(instance).toBeTruthy()
})
