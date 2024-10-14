/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "k43xv1tifp9dznj",
    "created": "2024-10-14 05:39:16.715Z",
    "updated": "2024-10-14 05:39:16.715Z",
    "name": "Solo_Segment_Participant",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6vb1bioo",
        "name": "Segment",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "uavrlacvl167j3v",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "okjodxtx",
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
  const collection = dao.findCollectionByNameOrId("k43xv1tifp9dznj");

  return dao.deleteCollection(collection);
})
