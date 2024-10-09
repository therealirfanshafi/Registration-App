/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y9s07qq3",
    "name": "Phone_Number",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^\\+?[0-9-]*[0-9]{11,}$"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y9s07qq3",
    "name": "Phone_Number",
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
