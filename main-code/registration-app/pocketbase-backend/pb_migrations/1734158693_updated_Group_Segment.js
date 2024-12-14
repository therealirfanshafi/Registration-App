/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("w5pvvfz9bz4sgg8")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number838194164",
    "max": null,
    "min": null,
    "name": "Group_Size",
    "onlyInt": true,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("w5pvvfz9bz4sgg8")

  // remove field
  collection.fields.removeById("number838194164")

  return app.save(collection)
})
