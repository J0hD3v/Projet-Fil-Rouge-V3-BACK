function connectDb(db_connection, db_host, db_username, db_password, db_database) {
    const connection = db_connection.createConnection({
        host: db_host,
        user: db_username,
        password: db_password,
        database: db_database
    })
    // connection.connect();


    // test handle disconnect

    try {
      
      connection.connect((err) => {
        if(err) {
          console.log('error when connecting to db :', err);
          // Delay before attempting to reconnect
          setTimeout(() => connectDb(db_connection, db_host, db_username, db_password, db_database), 6000);
        } else {
          console.log('connected');
        }
      });

      connection.on('error', (err) => {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('error connection lost : ', err);
            // Delay before attempting to reconnect
            //setTimeout(() => connectDb(db_connection, db_host, db_username, db_password, db_database), 60000);
          } else if (err.code !== 'ECONNREFUSED') {
            throw err;
          }
      });

    } catch (err) {
      console.error(err);
    }

    return connection;
}

module.exports = { connectDb }