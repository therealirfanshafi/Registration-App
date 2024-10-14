/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uavrlacvl167j3v")

  collection.updateRule = "@request.data.Name:isset = false && @request.auth.id ?= @request.data.Participants.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uavrlacvl167j3v")

  collection.updateRule = "@request.data.Name:isset = false "

  return dao.saveCollection(collection)
})
