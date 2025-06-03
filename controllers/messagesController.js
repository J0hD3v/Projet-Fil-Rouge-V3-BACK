function sendMessages(req,res,data) {
    res.send(data);
};


function saveMessage(req,res,data) {
    // receiving payload
    console.log('message received');
    console.log(req.body);
    try {
        // saving new data
        data.push(req.body.newMessage);
        // sending OK response
        res.status(201).send('Message saved');
    } catch (error) {
        // sending NOT OK response
        res.status(500).send(error);
    }
    return data
}

module.exports = { sendMessages, saveMessage }