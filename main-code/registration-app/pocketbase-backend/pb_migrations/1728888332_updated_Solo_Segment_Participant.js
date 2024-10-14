/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k43xv1tifp9dznj")

  collection.createRule = "@request.auth.id = Participant.id"
  collection.deleteRule = "@request.auth.id = Participant.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k43xv1tifp9dznj")

  collection.createRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
