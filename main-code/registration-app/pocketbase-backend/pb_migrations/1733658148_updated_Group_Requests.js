/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("tb23jpvrz27vmbg")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": true,
    "collectionId": "lhfwfskr4l6nrxq",
    "hidden": false,
    "id": "s6i103xx",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Participant",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": true,
    "collectionId": "i2hw4q14xn2iqyr",
    "hidden": false,
    "id": "vpokl3qm",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Group",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("tb23jpvrz27vmbg")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "lhfwfskr4l6nrxq",
    "hidden": false,
    "id": "s6i103xx",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Participant",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "i2hw4q14xn2iqyr",
    "hidden": false,
    "id": "vpokl3qm",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Group",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
