/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k43xv1tifp9dznj")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_axiliHh` ON `Solo_Segment_Participant` (\n  `Segment`,\n  `Participant`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k43xv1tifp9dznj")

  collection.indexes = []

  return dao.saveCollection(collection)
})
