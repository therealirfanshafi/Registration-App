/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tb23jpvrz27vmbg")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_GrRrMSC` ON `Group_Requests` (\n  `Participant`,\n  `Group`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tb23jpvrz27vmbg")

  collection.indexes = []

  return dao.saveCollection(collection)
})
