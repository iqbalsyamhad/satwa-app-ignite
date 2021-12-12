import { PakanModel } from "./pakan"

test("can be created", () => {
  const instance = PakanModel.create({})

  expect(instance).toBeTruthy()
})
