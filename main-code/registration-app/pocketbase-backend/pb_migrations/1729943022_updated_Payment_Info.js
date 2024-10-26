/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orxnw99o9v16sxl")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_iCkVfkE` ON `Payment_Info` (`Participant`)",
    "CREATE UNIQUE INDEX `idx_vGCP4PN` ON `Payment_Info` (`Order_ID`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orxnw99o9v16sxl")

  collection.indexes = []

  return dao.saveCollection(collection)
})
