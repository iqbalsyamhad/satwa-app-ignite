import { SatwaModel } from "./satwa"

test("can be created", () => {
  const instance = SatwaModel.create({})

  expect(instance).toBeTruthy()
})
