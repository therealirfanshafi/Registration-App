/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  collection.updateRule = "@request.auth.id = id && @request.data.Paid:isset = false && @request.data.First_Name:isset = false && @request.data.Last_Name:isset = false && @request.data.Category:isset = false && @request.data.email:isset = false && @request.data.School:isset = false && @request.data.Phone_Number:isset = false"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lhfwfskr4l6nrxq")

  collection.updateRule = "@request.auth.id = id && @request.data.Paid:isset = false && @request.data.First_Name:isset = false && @request.data.Last_Name:isset = false && @request.data.Category:isset = false && @request.data.email:isset = false && @request.data.Paid:isset = false"

  return dao.saveCollection(collection)
})
