/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_43CZyFv` ON `Group` (`Name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2hw4q14xn2iqyr")

  collection.indexes = []

  return dao.saveCollection(collection)
})
