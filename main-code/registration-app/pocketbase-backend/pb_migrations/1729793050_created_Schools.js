/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "tzwq2r7o2dx681b",
    "created": "2024-10-24 18:04:10.968Z",
    "updated": "2024-10-24 18:04:10.968Z",
    "name": "Schools",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "b41taobf",
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
  const collection = dao.findCollectionByNameOrId("tzwq2r7o2dx681b");

  return dao.deleteCollection(collection);
})
