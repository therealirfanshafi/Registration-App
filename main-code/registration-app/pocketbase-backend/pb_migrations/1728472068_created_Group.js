/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "i2hw4q14xn2iqyr",
    "created": "2024-10-09 11:07:48.010Z",
    "updated": "2024-10-09 11:07:48.010Z",
    "name": "Group",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dkghcidg",
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
  const collection = dao.findCollectionByNameOrId("i2hw4q14xn2iqyr");

  return dao.deleteCollection(collection);
})
