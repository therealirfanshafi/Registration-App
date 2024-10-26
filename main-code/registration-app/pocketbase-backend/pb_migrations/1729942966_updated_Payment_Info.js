/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orxnw99o9v16sxl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hlwnnbil",
    "name": "Participant",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "lhfwfskr4l6nrxq",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orxnw99o9v16sxl")

  // remove
  collection.schema.removeField("hlwnnbil")

  return dao.saveCollection(collection)
})
