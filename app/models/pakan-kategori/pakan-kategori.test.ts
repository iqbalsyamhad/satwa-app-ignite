import { PakanKategoriModel } from "./pakan-kategori"

test("can be created", () => {
  const instance = PakanKategoriModel.create({})

  expect(instance).toBeTruthy()
})
