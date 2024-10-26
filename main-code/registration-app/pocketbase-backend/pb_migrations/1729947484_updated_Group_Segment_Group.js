/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z3ik9uq8ie2sgat")

  // remove
  collection.schema.removeField("xq1zzzcx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ptvbgu7u",
    "name": "Submission",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": [
        "drive.google.com"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z3ik9uq8ie2sgat")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xq1zzzcx",
    "name": "Submission",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "video/mp4",
        "video/quicktime",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "video/x-matroska"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 209715200,
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("ptvbgu7u")

  return dao.saveCollection(collection)
})
