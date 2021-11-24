import { FormActivitiesModel } from "./form-activities"

test("can be created", () => {
  const instance = FormActivitiesModel.create({})

  expect(instance).toBeTruthy()
})
