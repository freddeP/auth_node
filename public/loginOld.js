
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
const req = new XMLHttpRequest();  //ajaxobjekt

req.open("POST","/login",true);
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
req.send("user="+JSON.stringify(user));        

req.onload = function() {
    if (req.status >= 200 && req.status < 400) {
        // Success!
        var data = req.responseText;
        console.log(data);
    } 
    else {
        // We reached our target server, but it returned an error
    }
}


}
