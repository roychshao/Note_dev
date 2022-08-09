import { pool } from './db_pool.js';

function print_error(err) {
    console.log("error: " + err.message);
}

const get_items = (user_id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM item WHERE user_id = ? AND done = false";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, user_id, (err, results, fields) => {
                    if(err)
                        reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

const get_done_items = (user_id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM item WHERE user_id = ? AND done = true";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, user_id, (err, results, fields) => {
                    if(err)
                        reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

const get_collected_items = (user_id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM item WHERE user_id = ? AND collected = true";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, user_id, (err, results, fields) => {
                    if(err)
                        reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

const search_items = (user_id, search_str) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM item WHERE user_id = ? AND title REGEXP "${search_str}"`;
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, user_id, (err, results, fields) => {
                    if(err)
                        reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

const insert_item = (user_id, id, title, description, date, time) => {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO item(id, user_id, title, description, date, time) VALUE(?,?,?,?,?,?)";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                console.log("pool connected.");
                await conn.query(sql, [id, user_id, pool.escape(title), pool.escape(description), date, time], (err, results, fields) => {
                    if(err)
                        reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

const mark_item = (id, done, collected) => {
    return new Promise((resolve, reject) => {
        var sql = "UPDATE item SET done = ?, collected = ? WHERE id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [done, collected, id], (err, results, fields) => {
                    if(err)
                        reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

const delete_item = (id) => {
    return new Promise((resolve, reject) => {
        var sql = "DELETE FROM item WHERE id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, id, (err, results, fields) => {
                    if(err)
                        reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

export default { get_items, get_done_items, get_collected_items, search_items, insert_item, mark_item, delete_item }
