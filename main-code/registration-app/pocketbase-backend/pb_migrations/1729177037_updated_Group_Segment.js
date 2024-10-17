/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5pvvfz9bz4sgg8")

  collection.viewRule = "@request.auth.verified = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5pvvfz9bz4sgg8")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
