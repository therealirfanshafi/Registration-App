/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  collection.deleteRule = "@request.auth.id = Admin.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})