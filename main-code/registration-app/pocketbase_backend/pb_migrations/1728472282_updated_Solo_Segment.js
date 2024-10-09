/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uavrlacvl167j3v")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ervijo20",
    "name": "Participants",
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
  const collection = dao.findCollectionByNameOrId("uavrlacvl167j3v")

  // remove
  collection.schema.removeField("ervijo20")

  return dao.saveCollection(collection)
})
