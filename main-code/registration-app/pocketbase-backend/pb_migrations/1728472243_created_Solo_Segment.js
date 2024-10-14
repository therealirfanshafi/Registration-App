/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "uavrlacvl167j3v",
    "created": "2024-10-09 11:10:43.119Z",
    "updated": "2024-10-09 11:10:43.119Z",
    "name": "Solo_Segment",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xh0bmqsq",
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
  const collection = dao.findCollectionByNameOrId("uavrlacvl167j3v");

  return dao.deleteCollection(collection);
})
