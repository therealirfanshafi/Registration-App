/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z3ik9uq8ie2sgat")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_yGDXrf6` ON `Group_Segment_Group` (\n  `Group`,\n  `Segment`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z3ik9uq8ie2sgat")

  collection.indexes = []

  return dao.saveCollection(collection)
})
