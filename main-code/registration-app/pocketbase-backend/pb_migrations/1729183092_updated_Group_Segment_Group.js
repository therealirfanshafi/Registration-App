/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z3ik9uq8ie2sgat")

  collection.listRule = "@request.auth.id ?= Group.Members.id || (@collection.Group_Requests.Group.id ?= id && @collection.Group_Requests.Participant.id ?= @request.auth.id)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z3ik9uq8ie2sgat")

  collection.listRule = "@request.auth.id ?= Group.Members.id"

  return dao.saveCollection(collection)
})
