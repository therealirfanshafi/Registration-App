/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  // update field
  collection.fields.addAt(12, new Field({
    "cascadeDelete": true,
    "collectionId": "tzwq2r7o2dx681b",
    "hidden": false,
    "id": "gs6rbead",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "School",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  // update field
  collection.fields.addAt(12, new Field({
    "cascadeDelete": false,
    "collectionId": "tzwq2r7o2dx681b",
    "hidden": false,
    "id": "gs6rbead",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "School",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
