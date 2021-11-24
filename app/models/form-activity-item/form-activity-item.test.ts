import { FormActivityItemModel } from "./form-activity-item"

test("can be created", () => {
  const instance = FormActivityItemModel.create({})

  expect(instance).toBeTruthy()
})
