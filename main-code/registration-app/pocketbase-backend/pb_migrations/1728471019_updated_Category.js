/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shdo8gy6igsa7qk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kiddqywh",
    "name": "Category",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shdo8gy6igsa7qk")

  // remove
  collection.schema.removeField("kiddqywh")

  return dao.saveCollection(collection)
})
