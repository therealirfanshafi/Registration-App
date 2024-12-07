/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  // update field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "3onoyxru",
    "max": 0,
    "min": 0,
    "name": "First_Name",
    "pattern": "^[a-zA-Z]+(?:[-'][a-zA-Z]+)*(?: [a-zA-Z]+(?:[-'][a-zA-Z]+)*)*$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  // update field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "3onoyxru",
    "max": 0,
    "min": 0,
    "name": "First_Name",
    "pattern": "^[a-zA-Z]+(?:[-'][a-zA-Z]+)*(?: [a-zA-Z]+(?:[-'][a-zA-Z]+)*)+$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
