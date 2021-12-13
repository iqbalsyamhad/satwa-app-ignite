import { PakanPermasalahanModel } from "./pakan-permasalahan"

test("can be created", () => {
  const instance = PakanPermasalahanModel.create({})

  expect(instance).toBeTruthy()
})
