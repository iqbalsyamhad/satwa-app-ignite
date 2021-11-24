import { ActivityModel } from "./activity"

test("can be created", () => {
  const instance = ActivityModel.create({})

  expect(instance).toBeTruthy()
})
