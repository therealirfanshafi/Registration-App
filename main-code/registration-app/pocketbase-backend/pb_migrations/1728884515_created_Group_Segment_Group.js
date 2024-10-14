/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "z3ik9uq8ie2sgat",
    "created": "2024-10-14 05:41:55.155Z",
    "updated": "2024-10-14 05:41:55.155Z",
    "name": "Group_Segment_Group",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ilw1u0im",
        "name": "Segment",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "w5pvvfz9bz4sgg8",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "1f3ynyr6",
        "name": "Group",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "i2hw4q14xn2iqyr",
          "cascadeDelete": true,
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
  const collection = dao.findCollectionByNameOrId("z3ik9uq8ie2sgat");

  return dao.deleteCollection(collection);
})
