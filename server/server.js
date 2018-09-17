const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/listings/:id' , express.static('public'));

app.listen(3000, () => console.log('Proxy-server is listening on port 3000'));

app.get('/', (req, res) => res.send('reviews'));

//re-route photo carousel get and post requests
app.get('/api/listings/:id/photos', (request, res) => {
  let id = Number(request.params.id);
  axios.get(`http://ec2-18-188-253-85.us-east-2.compute.amazonaws.com/api/listings/${id}/photos`)
    .then(response => {res.status(200).send(response.data)})
    .catch( err => {res.status(500).send(err)});
});

app.post('/api/listings/:id/saved', (req, res) => {
  const request = Object.keys(req.body)[0];
  axios.post(`http://ec2-18-188-253-85.us-east-2.compute.amazonaws.com/saved`, request)
    .then( () => {res.status(200).send()})
    .catch(err => {res.status(500).send(err)});
 });

//re-route bookings get and post requests
app.get('/api/listings/:id/bookings', (request, res) => {
  let id = Number(request.params.id);
  axios.get(`http://ec2-34-207-95-35.compute-1.amazonaws.com/api/listings/${id}/bookings`)
    .then(response => {res.status(200).send(response.data)})
    .catch(err => {res.status(500).send(err)});
});

 //re-route house description get request
app.get('/api/house/:id', (req, res) => {
  let id = parseInt(req.params.id);
  axios.get(`http://ec2-18-222-220-204.us-east-2.compute.amazonaws.com/api/house/${id}/`)
    .then(response => {res.status(200).send(response.data)})
    .catch( err => {res.status(500).send(err)})
});

//re-route reviews get and post requests
app.get('/:id/reviews', (request, res) => {
  let id = Number(request.params.id);
  axios.get(`http://ec2-52-87-204-118.compute-1.amazonaws.com/${id}/reviews`)
    .then(response => {res.status(200).send(response.data)})
    .catch( err => {res.status(500).send(err)})
});

app.post('/:id/reviews/query=:searchTerm', (req, res) => {
  let id = Number(request.params.id);
  let searchTerm = request.params.searchTerm

  axios.post(`http://ec2-52-87-204-118.compute-1.amazonaws.com/${id}/reviews/query=${searchTerm}`, request)
    .then(response => {res.status(200).send(response.data)})
    .catch(err => {res.status(404).send(err)});
 });
