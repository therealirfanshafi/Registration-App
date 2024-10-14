/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uavrlacvl167j3v")

  collection.listRule = "@request.auth.verified = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uavrlacvl167j3v")

  collection.listRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
})
