/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  // update
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
      "minSelect": 1,
      "maxSelect": 4,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  // update
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
})
