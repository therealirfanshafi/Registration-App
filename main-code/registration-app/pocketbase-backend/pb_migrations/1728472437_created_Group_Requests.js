/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "tb23jpvrz27vmbg",
    "created": "2024-10-09 11:13:57.079Z",
    "updated": "2024-10-09 11:13:57.079Z",
    "name": "Group_Requests",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "s6i103xx",
        "name": "User",
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
      },
      {
        "system": false,
        "id": "vpokl3qm",
        "name": "Group",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "i2hw4q14xn2iqyr",
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
  const collection = dao.findCollectionByNameOrId("tb23jpvrz27vmbg");

  return dao.deleteCollection(collection);
})
