import express from 'express';
import bodyParser from 'body-parser';
import { getMoods, deleteMood, addMood, editMood } from './database.js';


const app = express();
app.use(express.json());
app.use(express.static("client"))
app.use(bodyParser.urlencoded({ extended: false }));

let moods = [
  {
    id: 1,
    date: Date.now(),
    note: "feeling meh",
    rating: 9
  },
  {
    id: 2,
    date: Date.now(),
    note: "feeling GREAT",
    rating: 5
  },
  {
    id: 3,
    date: Date.now(),
    note: "could be better",
    rating: 5
  }
];

app.get("/", (req, res) => {
  res.send(res.data)
  
});

app.get('/api/moods', (req, res) => {
  getMoods().then(result => { res.send(result)}).catch(err => console.log(err))
});

app.delete('/api/moods/:id', (req, res) => {
  const id = +req.params.id;
  moods = deleteMood(id).then(() => res.status(200).json(moods)).catch(err => console.log(err))
  res.status(200).json(moods);
});

app.post('/api/moods', (req, res) => {
  addMood(req.body.note, req.body.rating).then(() => res.status(200).json(moods)).catch(err => console.log(err))
});


app.put('/api/moods/:id', (req, res) => {
  const id = req.body.id;
  let note = req.body.newMood;
  let rating = req.body.newRating;
  let newMood = {id, note, rating}
  editMood(id, note, rating).then(() => res.status(200).json(newMood)).catch(err => console.log(err))
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));


