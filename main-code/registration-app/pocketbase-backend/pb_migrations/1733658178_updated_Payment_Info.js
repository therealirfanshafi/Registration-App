/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("orxnw99o9v16sxl")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": true,
    "collectionId": "lhfwfskr4l6nrxq",
    "hidden": false,
    "id": "hlwnnbil",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Participant",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("orxnw99o9v16sxl")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "lhfwfskr4l6nrxq",
    "hidden": false,
    "id": "hlwnnbil",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Participant",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
