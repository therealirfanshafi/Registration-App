/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orxnw99o9v16sxl")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_iCkVfkE` ON `Payment_Info` (`Participant`)"
  ]

  // remove
  collection.schema.removeField("wb8dfr3q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zxjnkodd",
    "name": "Amount",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fsl4xqib",
    "name": "Store_Amount",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xttgnzfq",
    "name": "Session_ID",
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
  const collection = dao.findCollectionByNameOrId("orxnw99o9v16sxl")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_iCkVfkE` ON `Payment_Info` (`Participant`)",
    "CREATE UNIQUE INDEX `idx_vGCP4PN` ON `Payment_Info` (`Order_ID`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wb8dfr3q",
    "name": "Order_ID",
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

  // remove
  collection.schema.removeField("zxjnkodd")

  // remove
  collection.schema.removeField("fsl4xqib")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xttgnzfq",
    "name": "Token",
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
