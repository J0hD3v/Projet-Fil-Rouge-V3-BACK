class ReservationsController {
    constructor(connectionDb) {
        this.connectionDb = connectionDb;
    }

    getAllReservations(req, res) {
        if (this.connectionDb) {
            try {
                this.connectionDb.query(
                    'SELECT reservations.date_horaire FROM reservations',
                    (err, rows, fields) => {
                        res.send(rows);
                    }
                );
                
            } catch (error) {
                console.error(error);
                res.status(500).send('Erreur serveur');
                
            }
        } else {
            res.status(503).send('Database not available');
        }
    }


    createReservation(req, res) {
        if (this.connectionDb) {
            const idUser = req.body.idUser
            const idTerrain = req.body.idTerrain
            const date_horaire = req.body.date_horaire
            try {
                this.connectionDb.query(
                    'INSERT INTO reservations (id_utilisateur, id_terrain, date_horaire) VALUES (?, ?, ?)',
                    [idUser, idTerrain, date_horaire],
                    (err, rows, fields) => {
                        if (err) console.log(err);
                        else {
                            res.send(rows);
                        }
                    }
                );
                
            } catch (error) {
                console.error(error);
                res.status(500).send('Erreur serveur');
                
            }
        } else {
            res.status(503).send('Database not available');
        }
    }
}

module.exports = ReservationsController;