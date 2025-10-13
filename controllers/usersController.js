class UserController {
    constructor(connectionDb) {
        this.connectionDb = connectionDb;
    }

    getAllUsers(req, res) {
        if (this.connectionDb) {
            this.connectionDb.query(
                'SELECT pseudo, email FROM utilisateur',
                (err, rows, fields) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Erreur serveur');
                    } else {
                        res.send(rows);
                    }
                }
            );
        } else {
            res.status(503).send('Database not available');
        }
    }

    getUserByName(req, res) {
        const userName = req.query.userName;

        if (typeof userName !== 'string') {
            res.status(400).send('Wrong type for user name');
            return;
        }

        this.connectionDb.query(
            'SELECT pseudo, email FROM utilisateur WHERE pseudo = ?',
            [userName],
            (err, rows, fields) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Erreur serveur');
                } else {
                    res.send(rows);
                }
            }
        );
    }
}

module.exports = UserController;