/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tb23jpvrz27vmbg")

  collection.deleteRule = "@request.auth.id = Participant.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tb23jpvrz27vmbg")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
