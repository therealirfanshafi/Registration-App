/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orxnw99o9v16sxl")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hlwnnbil",
    "name": "Participant",
    "type": "relation",
    "required": true,
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dlktntrc",
    "name": "Payment_Method",
    "type": "select",
    "required": true,
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orxnw99o9v16sxl")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hlwnnbil",
    "name": "Participant",
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

  // update
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

  return dao.saveCollection(collection)
})
