const express = require('express');
const xml = require('xml');
const xmlparser = require('express-xml-bodyparser')
const app = express();
app.use(express.json())
app.use(xmlparser());
const port = 3000

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});


const mockData = [
  {
    test: '123'
  },
  {
    test: '123'
  },
  {
    test: '123'
  },
  {
    test: '111'
  }
];

let data = {
  XDDD : [
      {
          "XDDD": "XDDDD1"
      }
  ]
}

app.get('/json', function (req, res) {
  console.log("/json");
  res.send(mockData);
});

app.get('/xml', function (req, res) {
  console.log("/xml");
  res.set('Content-type', 'text/xml');
  return res.send(xml(data, true));
});


app.post('/postTest', function (req, res) {
  console.log("/postTest");
  console.log(req.body);
  const bodyResult = req.body;
  mockData.push(bodyResult);
  res.status(200).send("true");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
