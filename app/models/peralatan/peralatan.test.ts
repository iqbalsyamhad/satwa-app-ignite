import { PeralatanModel } from "./peralatan"

test("can be created", () => {
  const instance = PeralatanModel.create({})

  expect(instance).toBeTruthy()
})
