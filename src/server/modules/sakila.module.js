import mysql from 'mysql';
import config from '../../config/config';
import jwt from 'jsonwebtoken';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.sqlHost,
  user: config.sqlUserName,
  password: config.sqlPass,
  database: config.sqlDatabase
});


const selectSakilaStaff = (token) => {
    return new Promise((resolve, reject) => {

        jwt.verify(token, config.hash , (err, payload) => {
            if (err) {
                reject(err);
            } else {
                connectionPool.getConnection((connectionError, connection) => {
                    if (connectionError) {
                        reject(connectionError);
                    } else {
                        connection.query(
                        `SELECT
                            *
                        FROM
                            staff`
                        , (error, result) => {
                            if (error) {
                            console.error('SQL error: ', error);
                            reject(error);
                            } else {
                            resolve(result);
                            }
                            connection.release();
                        });
                    }
                });
            }
        });
    })
}

const createSakilaStaff = (token, insertValues) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.hash , (err, payload) => {
            if (err) {
                reject(err);
            } else {
                connectionPool.getConnection((connectionError, connection) => {
                    if (connectionError) {
                        reject(connectionError);
                    } else {
                        connection.query('INSERT INTO staff SET ?', insertValues, (error, result) => {
                        if (error) {
                            console.error('SQL error: ', error);
                            reject(error);
                        } else if (result.affectedRows === 1) {
                            resolve(`新增成功！ sakila_id: ${result.insertId}`);
                        }
                        connection.release();
                        });
                    }
                });
            }
        });
    });
};


const modifySakilaStaff = (insertValues, productId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else { 
        connection.query('UPDATE staff SET ? WHERE staff_id = ?', [insertValues, productId], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          } else if (result.affectedRows === 0) { 
            resolve('請確認修改Id！');
          } else if (result.message.match('Changed: 1')) {
            resolve('資料修改成功');
          } else { 
            resolve('資料無異動');
          }
          connection.release();
        });
      }
    });
  });
};

const deleteSakilaStaff = (productId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError); 
      } else {
        connection.query('DELETE FROM staff WHERE staff_id = ?', productId, (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve('刪除成功！');
          } else {
            resolve('刪除失敗！');
          }
          connection.release();
        });
      }
    });
  });
};


export default {
  selectSakilaStaff,
  createSakilaStaff,
  modifySakilaStaff,
  deleteSakilaStaff
};