import { SupplierModel } from "./supplier"

test("can be created", () => {
  const instance = SupplierModel.create({})

  expect(instance).toBeTruthy()
})
