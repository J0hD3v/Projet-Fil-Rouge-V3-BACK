// Exported Functions

// Créer une transaction d'un billet, de utilisateur1 vers utilisateur2
function createTransaction(req,res,connectDb) {

    const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '-');
    // A COMPLETER
    const idUser1 = req.body.idUser1
    const idUser2 = req.body.idUser2
    const idItem = req.body.idItem

    // Insert query
    connectDb.query(
        'INSERT INTO transaction (id_utilisateur, id_utilisateur2, date_transaction, id_billet) VALUES (?, ?, ?, ?)',
        [idUser1, idUser2, currentDate, idItem],
        (err, rows, fields) => {
            if (err) console.log(err);
            else {
                res.send(rows);
            }
        }
    )
};

// Mettre à jour à qui appartient le billet
function updateItemOwner(req,res,connectDb) {

    // A COMPLETER
    const idUser2 = req.body.idUser2
    const idItem = req.body.idItem

    // Update query
    connectDb.query(
        'UPDATE billet SET id_utilisateur = ? WHERE id_billet = ?',
        [idUser2, idItem],
        (err, rows, fields) => {
            if (err) console.log(err);
            else {
                res.send(rows);
            }
        }
    )
};

module.exports = { createTransaction, updateItemOwner }