/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fwmgb0v0",
    "name": "Admin",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1vgdxebd",
    "name": "Members",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "lhfwfskr4l6nrxq",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  // remove
  collection.schema.removeField("fwmgb0v0")

  // remove
  collection.schema.removeField("1vgdxebd")

  return dao.saveCollection(collection)
})
