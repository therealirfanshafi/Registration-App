/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mhjop2ibssr1qt8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "09rhflyq",
    "name": "Report",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1000000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mhjop2ibssr1qt8")

  // update
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
})
