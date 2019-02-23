const column = require("./column");

function bind(app) {
    app.post("/column/add", column.add);
    app.put("/column/modify", column.modify);
    app.get("/column/list", column.list);
    app.delete("/column/remove/:id", column.remove);
}

exports.bind = bind;