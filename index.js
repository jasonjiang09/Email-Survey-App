const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there'});
})

//app refers to the const app to associate with express()
//get tries to get info
//Forward slash tries to access route '/'
//req: object representing incoming request
//res: object representing outgoing request
//res.send(<plain JSON>)

const PORT = process.env.PORT || 5000;
app.listen(PORT);
//Tells express to tells node to listen to incoming traffic on port 5000