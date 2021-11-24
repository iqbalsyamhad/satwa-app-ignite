import { ActivityOptionModel } from "./activity-option"

test("can be created", () => {
  const instance = ActivityOptionModel.create({})

  expect(instance).toBeTruthy()
})
