/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "w5pvvfz9bz4sgg8",
    "created": "2024-10-09 11:12:35.200Z",
    "updated": "2024-10-09 11:12:35.200Z",
    "name": "Group_Segment",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ulpssqxi",
        "name": "Name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
  const collection = dao.findCollectionByNameOrId("w5pvvfz9bz4sgg8");

  return dao.deleteCollection(collection);
})
