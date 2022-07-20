// Setup empty JS object to act as endpoint for all routes
let projectData = [{
  key: 0,
  cityKey: '62',
  temp: 25.03,
  feel: 'test',
  date: '6.6.2022'
}];
//a variable for data index
let localKey=1;

const clientURL='/tempData';

// Require Express to run server and routes
const express=require('express');


// Start up an instance of app
const app=express();

/* Middleware*/
const bodyParser=require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));


// Setup Server
const port=3000;

const server=app.listen(port,listener);

function listener()
{
    console.log('The server is on and the localhost port is: '+port);
    
}




app.post(clientURL,addData)

app.get(clientURL,sendData);



//a function to post data from client side and save it in
function addData(req,res)
{
  newData = {
    key: localKey,
    cityKey: req.body.cityKey,
    temp: req.body.temp,
    feel: req.body.feel,
    date: req.body.date
  };
  
  projectData.push(newData);
  console.log(projectData[localKey]);
  localKey++;
}


//a Function to send data back to the client
function sendData(req,res)
{
  res.send(projectData[localKey-1]);
}