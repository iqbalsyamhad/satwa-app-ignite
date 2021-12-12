import { PakanStoreModel } from "./pakan-store"

test("can be created", () => {
  const instance = PakanStoreModel.create({})

  expect(instance).toBeTruthy()
})
