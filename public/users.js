
var main = document.querySelector('#mainContent');



/* async function getLocation(){
    const name = document.getElementById('orgname').value 
    const url = document.getElementById('eventPicUrl').value
    const date = document.getElementById('datepicker').value
    const data = { name , url, date};
    document.getElementById('orgname').value  = "";
    document.getElementById('eventPicUrl').value  = "";
    document.getElementById('datepicker').value  = "";
    console.log(data);
    const options = {
        method : "POST",
        
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    };
    
    const response = await fetch('/api',options);     //sends a post request, post can also send a response
    const json = await response.json();         //retrives the response from post
    console.log(json);              //console log it out 
} */


async function getQRCode(){
    const name = document.getElementById('orgname').value 
    const url = document.getElementById('eventPicUrl').value;
    const date = document.getElementById('datepicker').value;
    document.getElementById('orgname').value  = "";
    document.getElementById('eventPicUrl').value  = "";
    document.getElementById('datepicker').value  = "";
    const api_url = `users/qrcode/${url}`;
    const response = await fetch(api_url);
    const json_url = await response.json();
    const qrcode = await json_url.url;
    const data =  { name , qrcode, date};
    const options =  {
        method : "POST",
        
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    };
    
    const final_response = await fetch('/users/api',options);     //sends a post request, post can also send a response
    const json = await final_response.json();         //retrives the response from post
    console.log(json);              //console log it out 
}

async function getData(){
    
   const response = await fetch('/users/api');
   const data = await response.json();
   console.log(data[0].name);

   for ( i = 0 ; i < data.length ; i++){

        var details = document.createElement('h1');
        var image = document.createElement('img');
        var imageUrl = data[i].qrcode ;
        var detailsContent = data[i].name;
        console.log(detailsContent);
        image.setAttribute('src',imageUrl);
        details.textContent = detailsContent;
        main.appendChild(details);
        main.appendChild(image);
        
   }
}

//jquery functions

$( function() {
    $( "#datepicker" ).datepicker();
} );
