const ObjectID = require("mongodb").ObjectID;

async function add(req, res) {
    const db = req.app.get("api db");
    const columns = db.collection("columns");
    const column = req.body;
    
    const { insertedId } = await columns.insertOne(column);
    const payload = { ...column, id: insertedId };

    res.json({
        payload, 
        error: false,
    });
}

async function modify(req, res) {
    const db = req.app.get("api db");
    const columns = db.collection("columns");
    const column = req.body;
    
    await columns.updateOne(
        { _id: column._id }, 
        { $set: column }
    );
    
    res.json({
        payload: column, 
        error: false,
    });
}

async function list(req, res) {
    const db = req.app.get("api db");
    const columns = db.collection("columns");
    
    const payload = await columns.find({}).toArray();

    res.json({
        payload, 
        error: false,
    });
}

async function remove(req, res) {
    const columnId = req.params.id;
    const db = req.app.get("api db");
    const columns = db.collection("columns");

    await columns.deleteOne({ _id: ObjectID(columnId) });
    
    res.json({
        payload: columnId,
        error: false,
    });
}

exports.add = add;
exports.modify = modify;
exports.list = list;
exports.remove = remove;
