/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mhjop2ibssr1qt8")

  // remove
  collection.schema.removeField("qhtdqqrf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "09rhflyq",
    "name": "Report",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mhjop2ibssr1qt8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qhtdqqrf",
    "name": "Report",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("09rhflyq")

  return dao.saveCollection(collection)
})
