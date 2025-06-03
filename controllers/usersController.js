// Exported Functions
function getAllUsers(req,res,connectionDb) {

    if (connectionDb) {

        // Select query
        connectionDb.query(
            'SELECT pseudo, email FROM utilisateur',
            (err, rows, fields) => {
                if (err) console.log(err);
                else {
                    res.send(rows);
                }
            }
        )
    } else {
        res.status(503).send('Database not available');
    }
};

function getUserByName(req,res,connectionDb) {
    // Verify user id requested
    if (typeof(req.query.userName) != 'string') {
        res.status(400).send('Wrong type for user name');
    } else {
        const userName = req.query.userName;

        // Select query (prepared)
        connectionDb.query(
            'SELECT pseudo, email FROM utilisateur WHERE pseudo=?',
            [userName],
            (err, rows, fields) => {
                if (err) console.log(err);
                else {
                    res.send(rows);
                }
            }
        )
    }
};

module.exports = { getAllUsers, getUserByName }