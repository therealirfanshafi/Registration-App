/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mhjop2ibssr1qt8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yohe7f6l",
    "name": "Reference",
    "type": "text",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mhjop2ibssr1qt8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yohe7f6l",
    "name": "Reference",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
