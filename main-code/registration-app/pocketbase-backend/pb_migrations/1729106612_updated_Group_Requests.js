/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tb23jpvrz27vmbg")

  collection.listRule = "@request.auth.verified = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tb23jpvrz27vmbg")

  collection.listRule = "@request.auth.verified = Participant.id"

  return dao.saveCollection(collection)
})
