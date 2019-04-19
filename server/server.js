const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fetch = require('node-fetch');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let movies = [];

app.get('/api/watchlist', (req, res) => {
  res.send(movies);
});

app.get('/api/watchlist/:id', (req, res) => { 
  if (req.params.id == null || req.params.id == undefined){
    res.status(404);
  }
  res.send({cont : contains(req.params.id)});
});

app.post('/api/watchlist/:id', (req, res) => {

  if (req.params.id == null || req.params.id == undefined){
    res.status(404);
  }
  if (!contains(req.params.id)){
    fetch('http://api.tvmaze.com/shows/' + req.params.id)
    .then(res => res.json())
    .then(json => {
        json["comment"] = req.body.comment; 
        movies[movies.length] = JSON.stringify(json);
    })
  }
});

app.delete('/api/watchlist/:id', (req, res) => {
  if (req.params.id == null || req.params.id == undefined){
    res.status(404);
  }  
  var movie = movies.find(m => JSON.parse(m).id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(movies);

});


function contains(el){
    for (var m of movies){
      var mov = JSON.parse(m);
      if (el == mov.id){
        return true;
      }
    }
    return false;
}


app.listen(port, (err) => {
  if (err) { console.log(err); };
  console.log(`Listening on port ${port}`)
});