/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `_lhfwfskr4l6nrxq_email_idx` ON `Participant` (`email`) WHERE `email` != ''",
      "CREATE UNIQUE INDEX `_lhfwfskr4l6nrxq_tokenKey_idx` ON `Participant` (`tokenKey`)"
    ],
    "oauth2": {
      "mappedFields": {
        "username": ""
      }
    }
  }, collection)

  // remove field
  collection.fields.removeById("text4166911607")

  // update field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "3onoyxru",
    "max": 0,
    "min": 0,
    "name": "First_Name",
    "pattern": "^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|.(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `_lhfwfskr4l6nrxq_username_idx` ON `Participant` (username COLLATE NOCASE)",
      "CREATE UNIQUE INDEX `_lhfwfskr4l6nrxq_email_idx` ON `Participant` (`email`) WHERE `email` != ''",
      "CREATE UNIQUE INDEX `_lhfwfskr4l6nrxq_tokenKey_idx` ON `Participant` (`tokenKey`)"
    ],
    "oauth2": {
      "mappedFields": {
        "username": "username"
      }
    }
  }, collection)

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "users[0-9]{6}",
    "hidden": false,
    "id": "text4166911607",
    "max": 150,
    "min": 3,
    "name": "username",
    "pattern": "^[\\w][\\w\\.\\-]*$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "3onoyxru",
    "max": 0,
    "min": 0,
    "name": "First_Name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
