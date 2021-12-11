import { SatwaJenisStoreModel } from "./satwa-jenis-store"

test("can be created", () => {
  const instance = SatwaJenisStoreModel.create({})

  expect(instance).toBeTruthy()
})
