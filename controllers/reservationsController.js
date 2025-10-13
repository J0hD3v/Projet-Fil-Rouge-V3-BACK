class ReservationsController {
    constructor(connectionDb) {
        this.connectionDb = connectionDb;
    }

    getAllReservations(req, res) {
        if (this.connectionDb) {
            try {
                this.connectionDb.query(
                    'SELECT creneau FROM reservations',
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
}

module.exports = ReservationsController;