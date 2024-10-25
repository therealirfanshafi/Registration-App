/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mhjop2ibssr1qt8",
    "created": "2024-10-24 18:34:32.289Z",
    "updated": "2024-10-24 18:34:32.289Z",
    "name": "Public_Relations",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qhtdqqrf",
        "name": "Report",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mhjop2ibssr1qt8");

  return dao.deleteCollection(collection);
})
