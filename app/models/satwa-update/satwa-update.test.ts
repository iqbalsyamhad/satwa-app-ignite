import { SatwaUpdateModel } from "./satwa-update"

test("can be created", () => {
  const instance = SatwaUpdateModel.create({})

  expect(instance).toBeTruthy()
})
