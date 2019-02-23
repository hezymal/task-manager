const MongoClient = require('mongodb').MongoClient;

async function create(app) {
    const config = app.get("api config");
    const client = await MongoClient.connect(config.db.url);
    const db = client.db(config.db.name);

    app.set("api db client", client);
    app.set("api db", db);
}

exports.create = create;
