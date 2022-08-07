import Item from './../db_interact/item.js';

export const get_items = async (req, res) => {

    const { user_id } = req.session?.passport?.user;

    await Item.get_items(user_id)
        .then(results => {
            var response = {
                "success": true,
                "message": "取得item資料成功",
                "data": []
            };
            for(var i = 0; i < results.length; ++i) {
                var item_obj = {};
                item_obj.id = results[i].id;
                item_obj.title = results[i].title;
                item_obj.description = results[i].description;
                item_obj.date = results[i].date;
                item_obj.time = results[i].time;
                item_obj.done = Boolean(results[i].done);
                item_obj.collected = Boolean(results[i].collected);
                response.data.push(item_obj);
            }
            console.log(response);
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得item資料失敗 error: " + err.message,
                "data": {}
            }
            console.log(response);
            res.status(400).json(response);
        })
}

export const get_done_items = async (req, res) => {

    const { user_id } = req.session?.passport?.user;

    await Item.get_done_items(user_id)
        .then(results => {
            var response = {
                "success": true,
                "message": "取得已完成item資料成功",
                "data": []
            };
            for(var i = 0; i < results.length; ++i) {
                var item_obj = {};
                item_obj.id = results[i].id;
                item_obj.title = results[i].title;
                item_obj.description = results[i].description;
                item_obj.date = results[i].date;
                item_obj.time = results[i].time;
                item_obj.done = Boolean(results[i].done);
                item_obj.collected = Boolean(results[i].collected);
                response.data.push(item_obj);
            }
            console.log(response);
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得已完成item資料失敗 error: " + err.message,
                "data": {}
            }
            console.log(response);
            res.status(400).json(response);
        })
}

export const get_collected_items = async (req, res) => {

    const { user_id } = req.session?.passport?.user;

    await Item.get_collected_items(user_id)
        .then(results => {
            var response = {
                "success": true,
                "message": "取得標記item資料成功",
                "data": []
            };
            for(var i = 0; i < results.length; ++i) {
                var item_obj = {};
                item_obj.id = results[i].id;
                item_obj.title = results[i].title;
                item_obj.description = results[i].description;
                item_obj.date = results[i].date;
                item_obj.time = results[i].time;
                item_obj.done = Boolean(results[i].done);
                item_obj.collected = Boolean(results[i].collected);
                response.data.push(item_obj);
            }
            console.log(response);
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得標記item資料失敗 error: " + err.message,
                "data": {}
            }
            console.log(response);
            res.status(400).json(response);
        })
}

export const search_items = async (req, res) => {

    const { search_str } = req.query;
    const { user_id } = req.session?.passport?.user;

    await Item.search_items(user_id, search_str)
        .then(results => {
            var response = {
                "success": true,
                "message": "搜尋item資料成功",
                "data": []
            };
            for(var i = 0; i < results.length; ++i) {
                var item_obj = {};
                item_obj.id = results[i].id;
                item_obj.title = results[i].title;
                item_obj.description = results[i].description;
                item_obj.date = results[i].date;
                item_obj.time = results[i].time;
                response.data.push(item_obj);
            }
            console.log(response);
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "搜尋item資料失敗 error: " + err.message,
                "data": {}
            }
            console.log(response);
            res.status(400).json(response);
        })
}

export const insert_item = async (req, res) => {
    const body = req.body;
    const { user_id } = req.session?.passport?.user;
    console.log(body.id, body.title, body.description, body.date, body.time);
    await Item.insert_item(
        user_id,
        body.id,
        body.title,
        body.description,
        body.date,
        body.time
    )
        .then(results => {
            var response = {
                "success": true,
                "message": "新增item成功",
                "data": {}
            }
            console.log(response);
            res.status(201).json(response);
        })
        .catch(err => {
            console.log(err.message);
            var response = {
                "success": false,
                "message": "新增item失敗 error: " + err.message,
                "data": {}
            }
            console.log(response);
            res.status(201).json(response);
        })
}

export const mark_item = async (req, res) => {
    const body = req.body;
    console.log(body.id, body.done, body.collected);
    await Item.mark_item(
        body.id,
        body.done,
        body.collected
    ).then(results => {
        var response = {
            "success": true,
            "message": "標記item成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    })
        .catch(err => {
            console.log(err.message);
            var response = {
                "success": false,
                "message": "標記item失敗 error: " + err.message,
                "data": {}
            }
            console.log(response);
            res.status(201).json(response);
        })
}

export const delete_item = async (req, res) => {
    const body = req.body;
    console.log(body);
    await Item.delete_item(body.id)
        .then(results => {
            var response = {
                "success": true,
                "message": "刪除item成功",
                "data": {}
            }
            console.log(response);
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "刪除item失敗 error: " + err.message,
                "data": {}
            }
            console.log(response);
            res.status(201).json(response);
        })
}
