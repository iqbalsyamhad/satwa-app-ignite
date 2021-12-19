import { PakanPermasalahanParentModel } from "./pakan-permasalahan-parent"

test("can be created", () => {
  const instance = PakanPermasalahanParentModel.create({})

  expect(instance).toBeTruthy()
})
