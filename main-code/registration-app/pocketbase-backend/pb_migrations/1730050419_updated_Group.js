/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  collection.updateRule = "(@request.auth.id ?= Members.id || (@collection.Group_Requests.Group.id ?= id && @collection.Group_Requests.Participant.id ?= @request.auth.id)) && @request.data.Admin:isset = false"

  return dao.saveCollection(collection)
})
