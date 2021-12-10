import { SatwaJenisModel } from "./satwa-jenis"

test("can be created", () => {
  const instance = SatwaJenisModel.create({})

  expect(instance).toBeTruthy()
})
