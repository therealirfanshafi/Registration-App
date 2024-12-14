/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("w5pvvfz9bz4sgg8")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool2817645131",
    "name": "Shut_Down",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "bool708538503",
    "name": "Exact_Size",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("w5pvvfz9bz4sgg8")

  // remove field
  collection.fields.removeById("bool2817645131")

  // remove field
  collection.fields.removeById("bool708538503")

  return app.save(collection)
})
