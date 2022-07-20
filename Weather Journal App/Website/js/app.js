/* Global Variables */
//The base url which uses zip code
const basicURL= 'https://api.openweathermap.org/data/2.5/weather?zip=';

//the API key and setting units to imperial
const apiKey = '&APPID=580597005d74080fa5d596d97a71051a&units=imperial';

//The localhost server URL
let serverURL='/tempData' //http:localhost:3000
/////////////////////////////////////////////////////////////////////////////////////////
let zipCode=0;    // a variable to temp store zip-code from user
let feelingExp=0; // a variable to temp store feelings from user 
let flag=0;       // a flag to check if the data entry are empty or not
let tempStore=0;
/* End Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


//create an action function for button
function action(e)
{
    readPage();
    if(flag===0)
    {
        e.stopImmediatePropagation();
        alert('Empty Fields');
        document.querySelector('#temp').innerHTML = 'error';
        document.querySelector('#content').innerHTML = 'error';
        document.querySelector('#date').innerHTML ='error';
    }
    else
    {
        getTemp(basicURL,zipCode,apiKey)
        .then (function (data)
        {
            //console.log(data);
            postDataToServer(serverURL,{cityKey:zipCode,temp:data.main.temp,feel:feelingExp,date:newDate})
            
             
        }
        )
        .then( function(){
            updateUI()
        })
    }
    
    
}

//A function to get data entered by the user
function readPage()
{
    zipCode=document.querySelector('#zip').value;
    feelingExp=document.querySelector('#feelings').value;
    if(zipCode&&feelingExp)
    {
        flag=1;
    }
    else
    {
        flag=0;
        console.log('empty fields');
    }  
}


//A function to fetch given url and return results
const getTemp=async (basic,code,key)=>{//
    const res=await fetch(basic+code+key);//
    try
    {
        const data=await res.json();
        console.log(data)
        //tempStore=data.main.temp;
       /* .then
        postDataToServer(serverURL,{cityKey:zipCode,temp:data.main.temp,feel:feelingExp,date:newDate})*/
        return data
    }
    catch(error)
    {
        console.log('error',error);
    } 
     
    

}

//A function to post data to the server
const postDataToServer = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log(newData)
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};







//create button event
const button=document.querySelector('#generate');
button.addEventListener('click',action);







//update the page
const updateUI = async () =>{
    const request = await fetch(serverURL);
    try {
    // Transform into JSON
    const resData = await request.json()
    // Write updated data to DOM elements
    document.querySelector('#temp').innerHTML = Math.round(resData.temp)+ ' degrees';
    document.querySelector('#content').innerHTML = resData.feel;
    document.querySelector('#date').innerHTML =resData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }