
// skapa lyssnare för loginknapp

const loginButton = document.getElementById("login");
loginButton.addEventListener("click",login);



// funktion för att skicka inloggningsuppgifter till servern
function login()
{
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
let user = {};
    user.email = email;
    user.password = password;

// skicka användaruppgifter till servern
    const url = "/login";
    const data = JSON.stringify(user);

    fetch(url,
        {method :"post",
        body : data,
        headers: {"Content-Type": "application/json",
                  "X-auth" : "testing"}
        }   
    ).then(res => res.json())
     .then(response => {
        console.log(response);
        localStorage.setItem("auth_node_token",response.token);

     })
     .catch(error => console.log(error));


}


