import { pool } from './db_pool.js';

function print_error(err) {
    console.log("error: " + err.message);
}

const authenticate = (id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT id FROM user WHERE id = ?";
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

const sign_up = (id, name, email) => {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO user VALUE(?,?,?)"
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [id, name, email], (err, results, fields) => {
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


export default { authenticate, sign_up }
