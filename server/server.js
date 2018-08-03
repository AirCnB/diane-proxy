const express = require('express')
const app = express();

app.use('/listings/:id' , express.static('public'));

app.get('/', (req, res) => res.send('reviews'))

app.listen(3000, () => console.log('Proxy-server is listening on port 3000'))