/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z3ik9uq8ie2sgat")

  collection.createRule = "@request.auth.id = Group.Admin.id && @request.data.Submission:isset = false"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z3ik9uq8ie2sgat")

  collection.createRule = "@request.auth.id = Group.Admin.id"

  return dao.saveCollection(collection)
})
