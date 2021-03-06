'use strict';

const Bluebird = require('bluebird'),
    MongoDB = require('mongodb'),
    Url = process.env.MONGO_URL + 'greenwoodOlympia' + process.env.MONGO_DEV;

module.exports = (findOptions, updateOptions, collectionName) => {
    let connection;

    Bluebird.promisifyAll(MongoDB);

    return MongoDB.MongoClient.connectAsync(Url)
        .then((db) => {
            connection = db;

            return db.collection(collectionName).update(findOptions, {$set: updateOptions});
        })
        .then((result) => {
            connection.close();

            return {
                success: true,
                recordsInserted: result.insertedCount
            };
        })
        .catch((err) => {
            return {
                success: false,
                error: err
            };
        });
};
