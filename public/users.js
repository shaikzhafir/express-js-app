
var main = document.querySelector('#mainContent');


async function getQRCode(){
    const name = document.getElementById('orgname').value 
    const url = document.getElementById('eventUrl').value;
    const date = document.getElementById('datepicker').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const eventType = document.getElementById("select1").value;
    document.getElementById('orgname').value  = "";
    document.getElementById('eventUrl').value  = "";
    document.getElementById('datepicker').value  = "";
    document.getElementById('imageUrl').value  = "";
    document.getElementById('select1').value = "";
    const api_url = `users/qrcode/${url}`;
    const response = await fetch(api_url);
    const json_url = await response.json();
    const qrcode = await json_url.url;
    const data =  { name , qrcode, date , imageUrl , eventType};
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
        $("#mainContent").append(successMessage);
        //append you have added your event successfully!
    }             
}
async function getData(){
    document.getElementById('mainContent').innerHTML = "";
    const eventType = document.getElementById("select1").value;
    const response = await fetch(`/users/api/${eventType}`);
    const data = await response.json();
    console.log(data);
 
    for ( i = 0 ; i < data.length ; i++){
         var div = document.createElement('div');
         var name = document.createElement('h1');
         var qrImage = document.createElement('img');
         var image = document.createElement('img');
         var date = document.createElement('p');
         var qrcodeUrl = data[i].qrcode ;
         var imageUrl = data[i].imageUrl ;
         var eventName = data[i].name;
         var eventDate = data[i].date;
         div.setAttribute('class','container');
         div.setAttribute('id', 'events');
         date.textContent = eventDate;
         qrImage.setAttribute('src',qrcodeUrl);
         qrImage.setAttribute('width','300');
         qrImage.setAttribute('height','300');
         image.setAttribute('src',imageUrl);
         name.textContent = eventName;
         div.appendChild(name);
         div.appendChild(image);
         div.appendChild(qrImage);
         div.appendChild(date);
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

