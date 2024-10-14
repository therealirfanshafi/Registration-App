/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k43xv1tifp9dznj")

  collection.listRule = "@request.auth.id = Participant.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k43xv1tifp9dznj")

  collection.listRule = null

  return dao.saveCollection(collection)
})
