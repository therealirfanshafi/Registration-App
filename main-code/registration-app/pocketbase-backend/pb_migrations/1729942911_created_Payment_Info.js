/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "orxnw99o9v16sxl",
    "created": "2024-10-26 11:41:51.890Z",
    "updated": "2024-10-26 11:41:51.890Z",
    "name": "Payment_Info",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wb8dfr3q",
        "name": "Order_ID",
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
        "id": "xttgnzfq",
        "name": "Token",
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
  const collection = dao.findCollectionByNameOrId("orxnw99o9v16sxl");

  return dao.deleteCollection(collection);
})
