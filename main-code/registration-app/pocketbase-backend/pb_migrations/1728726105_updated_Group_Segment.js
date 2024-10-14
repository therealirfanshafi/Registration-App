/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5pvvfz9bz4sgg8")

  collection.updateRule = "@request.auth.id = @request.data.Group.Admin.id && @request.data.Group:length = 1 && @request.data.Name:isset = false"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5pvvfz9bz4sgg8")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
