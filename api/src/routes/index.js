const column = require("./column");
const task = require("./task");

function bind(app) {
    app.post("/column/add", column.add);
    app.put("/column/modify", column.modify);
    app.get("/column/list", column.list);
    app.delete("/column/remove/:id", column.remove);

    app.post("/task/add", task.add);
    app.put("/task/modify", task.modify);
    app.get("/task/list", task.list);
    app.delete("/task/remove/:id", task.remove);
}

exports.bind = bind;