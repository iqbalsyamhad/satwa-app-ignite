import { PeralatanPenggunaanModel } from "./peralatan-penggunaan"

test("can be created", () => {
  const instance = PeralatanPenggunaanModel.create({})

  expect(instance).toBeTruthy()
})
