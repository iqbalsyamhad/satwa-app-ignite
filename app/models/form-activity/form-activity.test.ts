import { FormActivityModel } from "./form-activity"

test("can be created", () => {
  const instance = FormActivityModel.create({})

  expect(instance).toBeTruthy()
})
