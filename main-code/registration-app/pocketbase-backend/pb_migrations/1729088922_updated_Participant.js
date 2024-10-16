/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  collection.updateRule = "@request.auth.id = id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  collection.updateRule = "  @request.auth.id = id"

  return dao.saveCollection(collection)
})
