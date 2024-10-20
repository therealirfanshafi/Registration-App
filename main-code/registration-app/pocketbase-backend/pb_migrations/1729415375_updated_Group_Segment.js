/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5pvvfz9bz4sgg8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0yvjtx2d",
    "name": "Requires_Submission",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5pvvfz9bz4sgg8")

  // remove
  collection.schema.removeField("0yvjtx2d")

  return dao.saveCollection(collection)
})
