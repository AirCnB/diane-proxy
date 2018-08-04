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
  axios.get(`http://ec2-13-59-102-97.us-east-2.compute.amazonaws.com/api/listings/${id}/photos`, request)
    .then(response => {res.status(200).send(response)})
    .catch( err => {res.status(500).send(err)});
});

app.post('/api/listings/:id/saved', (req, res) => {
  const request = Object.keys(req.body)[0];
  axios.post(`http://ec2-13-59-102-97.us-east-2.compute.amazonaws.com/saved`, request)
    .then(response => {res.status(200).send(response)})
    .catch(err => {res.status(404).send(err)});
 });

 //re-route house description get request
 app.get('/api/house/:id', (req, res) => {
   let id = parseInt(req.params.id);
   axios.get(`http://ec2-18-222-220-204.us-east-2.compute.amazonaws.com/api/house/${id}/`)
    .then()
    .catch();

 });

 //re-route reviews get and post requests

 app.get('/:id/reviews', (request, res) => {
  let id = Number(request.params.id);
  axios.get(`http://ec2-13-59-102-97.us-east-2.compute.amazonaws.com/api/listings/${id}/photos`, request)
    .then(response => {res.status(200).send(response)})
    .catch( err => {res.status(500).send(err)});
});

app.post('/api/listings/:id/saved', (req, res) => {
  const request = Object.keys(req.body)[0];
  axios.post(`http://ec2-13-59-102-97.us-east-2.compute.amazonaws.com/saved`, request)
    .then(response => {res.status(200).send(response)})
    .catch(err => {res.status(404).send(err)});
 });

 //re-route bookings get and post requests
 app.get('api/listings/:id/bookings', (request, res) => {
  let id = Number(request.params.id);
  axios.get(`http://ec2-34-203-218-92.compute-1.amazonaws.com/api/listings/${id}:/bookings`, request)
    .then(response => {res.status(200).send(response)})
    .catch( err => {res.status(500).send(err)});
});

app.post('/api/listings/:id/saved', (req, res) => {
  const request = Object.keys(req.body)[0];
  axios.post(`http://ec2-13-59-102-97.us-east-2.compute.amazonaws.com/saved`, request)
    .then(response => {res.status(200).send(response)})
    .catch(err => {res.status(404).send(err)});
 });