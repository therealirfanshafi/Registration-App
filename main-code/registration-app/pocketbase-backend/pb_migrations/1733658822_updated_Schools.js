/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("tzwq2r7o2dx681b")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_AwVXN8QYz9` ON `Schools` (`Name`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("tzwq2r7o2dx681b")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
