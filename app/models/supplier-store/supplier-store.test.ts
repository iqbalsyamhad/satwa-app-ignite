import { SupplierStoreModel } from "./supplier-store"

test("can be created", () => {
  const instance = SupplierStoreModel.create({})

  expect(instance).toBeTruthy()
})
