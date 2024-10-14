/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5pvvfz9bz4sgg8")

  // remove
  collection.schema.removeField("kis7gfcq")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5pvvfz9bz4sgg8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kis7gfcq",
    "name": "Group",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "i2hw4q14xn2iqyr",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
