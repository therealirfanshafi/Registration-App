/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  // add field
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "bool1788290731",
    "name": "CA_Reg",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  // remove field
  collection.fields.removeById("bool1788290731")

  return app.save(collection)
})
