/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  // update field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": true,
    "collectionId": "shdo8gy6igsa7qk",
    "hidden": false,
    "id": "wnaqnlvj",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Category",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  // update field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "shdo8gy6igsa7qk",
    "hidden": false,
    "id": "wnaqnlvj",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Category",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
