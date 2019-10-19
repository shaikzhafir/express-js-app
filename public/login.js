


async function registerUser(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = {username, password};
    const options = {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)

    };

    const response = await fetch('/register',options);

}

async function loginUser(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = {username,password};
    const options = {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)

    };

    const response = await fetch('/login',options);
    const json = await response.json();
    if (json === 200){
        console.log('success!' + response);
        window.location.href = 'http://localhost:3000/users';
    }
}