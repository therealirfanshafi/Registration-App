/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("z3ik9uq8ie2sgat")

  // update collection data
  unmarshal({
    "createRule": "@request.body.Submission:isset = false"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("z3ik9uq8ie2sgat")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = Group.Admin.id && @request.body.Submission:isset = false"
  }, collection)

  return app.save(collection)
})
