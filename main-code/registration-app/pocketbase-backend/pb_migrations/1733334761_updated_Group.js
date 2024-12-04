/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  // update collection data
  unmarshal({
    "updateRule": "(@request.auth.id ?= Members.id || (@collection.Group_Requests.Group.id ?= id && @collection.Group_Requests.Participant.id ?= @request.auth.id)) && @request.body.Admin:isset = false"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  // update collection data
  unmarshal({
    "updateRule": ""
  }, collection)

  return app.save(collection)
})
