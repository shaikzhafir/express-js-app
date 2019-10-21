
var main = document.querySelector('#mainContent');


async function getQRCode(){
    const name = document.getElementById('orgname').value 
    const url = document.getElementById('eventUrl').value;
    const date = document.getElementById('datepicker').value;
    const imageUrl = document.getElementById('imageUrl').value
    document.getElementById('orgname').value  = "";
    document.getElementById('eventUrl').value  = "";
    document.getElementById('datepicker').value  = "";
    document.getElementById('imageUrl').value  = "";
    const api_url = `users/qrcode/${url}`;
    const response = await fetch(api_url);
    const json_url = await response.json();
    const qrcode = await json_url.url;
    const data =  { name , qrcode, date , imageUrl};
    const options =  {
        method : "POST",
        
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    };
    
    const final_response = await fetch('/users/api',options);     //sends a post request, post can also send a response
    const json = await final_response.json();         //retrives the response from post
    if (json === 200){
        var successMessage = '<div class="alert alert-success"><strong>Success!</strong> You have successfully added your event!</div>'
        main.appendChild(successMessage);
        //append you have added your event successfully!
    }             
}

async function getData(){
    
   const response = await fetch('/users/api');
   const data = await response.json();
   console.log(data);

   for ( i = 0 ; i < data.length ; i++){
        var div = document.createElement('div');
        var details = document.createElement('h1');
        var qrImage = document.createElement('img');
        var eventImage = document.createElement('img');
        var qrcodeUrl = data[i].qrcode ;
        var imageUrl = data[i].imageUrl ;
        var detailsContent = data[i].name;
        div.setAttribute('class','container');
        qrImage.setAttribute('src',qrcodeUrl);
        qrImage.setAttribute('width','500');
        qrImage.setAttribute('src','500');
        eventImage.setAttribute('src',imageUrl);
        details.textContent = detailsContent;
        div.appendChild(details);
        div.appendChild(eventImage);
        div.appendChild(qrImage);
        main.appendChild(div);
        
   }
}

async function logOut(){
    const response = await fetch('/users/logout');
    const json = await response.json();
    if (json === 200){
        console.log('successfully logged out!' + response);
        window.location.href = 'http://localhost:3000/';
    }
}

//jquery functions

$( function() {
    $( "#datepicker" ).datepicker();
} );

