/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uavrlacvl167j3v")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uavrlacvl167j3v")

  collection.createRule = ""
  collection.updateRule = "@request.data.Name:isset = false && @request.auth.id ?= @request.data.Participants.id && @request.data.Participants:length = 1"

  return dao.saveCollection(collection)
})
