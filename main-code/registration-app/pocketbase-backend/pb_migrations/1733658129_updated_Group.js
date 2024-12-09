/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": true,
    "collectionId": "lhfwfskr4l6nrxq",
    "hidden": false,
    "id": "fwmgb0v0",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Admin",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "lhfwfskr4l6nrxq",
    "hidden": false,
    "id": "fwmgb0v0",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Admin",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
