/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orxnw99o9v16sxl")

  // remove
  collection.schema.removeField("xttgnzfq")

  // remove
  collection.schema.removeField("zxjnkodd")

  // remove
  collection.schema.removeField("fsl4xqib")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dlktntrc",
    "name": "Payment_Method",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Bkash",
        "CA/BA",
        "Club Moderator"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8nwupb9g",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "utlerkle",
    "name": "Tran_ID",
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

  // add
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

  // remove
  collection.schema.removeField("dlktntrc")

  // remove
  collection.schema.removeField("8nwupb9g")

  // remove
  collection.schema.removeField("utlerkle")

  return dao.saveCollection(collection)
})
