import { PeralatanKategoriModel } from "./peralatan-kategori"

test("can be created", () => {
  const instance = PeralatanKategoriModel.create({})

  expect(instance).toBeTruthy()
})
