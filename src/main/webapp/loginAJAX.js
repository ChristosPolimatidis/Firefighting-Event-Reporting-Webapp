document.getElementById("register").addEventListener("click", function () {
    window.location.href = "index.html";
});

/* submit the login page */
document.getElementById("login").addEventListener("click",function (event) {
    event.preventDefault();

    /* getting values from form input fields */
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    /* getting the document field from the error login */
    const errorElement = document.getElementById("loginError");

    if(username.length > 0 && password.length > 0){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (){
            if(this.readyState === 4 && this.status === 200){
                const response = JSON.parse(this.responseText);
                if(response.success){
                    /* user is logged in now and needs to hide the login section and appear the logged one */
                    document.getElementById("login_section").style.display = "none";
                    document.getElementById("logged_section").style.display = "block";

                    /* getting the values of the fields from the response of servlet */
                    document.getElementById("usernameF").value = response.username;
                    document.getElementById("firstnameF").value = response.firstname;
                    document.getElementById("lastnameF").value = response.lastname;
                    document.getElementById("emailF").value = response.email;
                    document.getElementById("passwordF").value = response.password;
                    document.getElementById("birthdateF").value = response.birthdate;
                    document.getElementById("genderF").value = response.gender;
                    document.getElementById("afmF").value = response.afm;
                    document.getElementById("countryF").value = response.country;
                    document.getElementById("addressF").value = response.address;
                    document.getElementById("municipalityF").value = response.municipality;
                    document.getElementById("prefectureF").value = response.prefecture;
                    document.getElementById("jobF").value = response.job;
                    document.getElementById("telephoneF").value = response.telephone;

                }else{
                    errorElement.textContent = "Invalid username or password.";
                }
            }else if (this.readyState === 4){
                errorElement.textContent = "Error during login. Please try again.";
                console.error(`Error checking login:`, this.statusText);
            }
        };
        xhttp.open("GET", `http://localhost:8081/project2025_war_exploded/LoginServlet?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, true);
        xhttp.send();
    }else{
        errorElement.textContent = "Please fill in both username and password.";
    }
})
/* clearing the previous spans */
document.getElementById("username").addEventListener("input", function (){
    const errorElement = document.getElementById("loginError");
    errorElement.textContent = "";
})

document.getElementById("password").addEventListener("input", function (){
    const errorElement = document.getElementById("loginError");
    errorElement.textContent = "";
})

document.getElementById("update").addEventListener("click", function (event){
    event.preventDefault();

    /* check if html patterns are valid and correct */

    const form = document.getElementById("profileForm");

    if (!form.checkValidity()) {
        alert("Fill out all fields correctly!");
        form.reportValidity();
        return;
    }

    /* taking the new data from the update form */
    const data={
        username: document.getElementById("usernameF").value,
        firstname: greekToLatin(document.getElementById("firstnameF").value),
        lastname: greekToLatin(document.getElementById("lastnameF").value),
        email: document.getElementById("emailF").value,
        password: greekToLatin(document.getElementById("passwordF").value),
        birthdate: document.getElementById("birthdateF").value,
        gender: document.getElementById("genderF").value,
        afm: document.getElementById("afmF").value,
        country: document.getElementById("countryF").value,
        address: greekToLatin(document.getElementById("addressF").value),
        municipality: greekToLatin(document.getElementById("municipalityF").value),
        prefecture: greekToLatin(document.getElementById("prefectureF").value),
        job: greekToLatin(document.getElementById("jobF").value),
        telephone: document.getElementById("telephoneF").value
    };
    /* stringify them */
    const jsonData = JSON.stringify(data);

    /* and post them to the server through the LoginServlet */
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8081/project2025_war_exploded/LoginServlet", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert(response.message);
            } else {
                alert("Error: " + response.message);
            }
        } else {
            alert("Error: " + xhr.status + " " + xhr.statusText);
        }
    };

    xhr.onerror = function () {
        alert("Request failed. Unable to connect to the server.");
    };

    xhr.send(jsonData);
});

/* converting the greek words into latin through the table mapping */
function greekToLatin(text){
    const map = {
        'Ά': 'A', 'Έ': 'E', 'Ή': 'H', 'Ί': 'I', 'Ό': 'O', 'Ύ': 'Y', 'Ώ': 'O',
        'ά': 'a', 'έ': 'e', 'ή': 'h', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ώ': 'o',
        'Ϊ': 'I', 'Ϋ': 'Y', 'ϊ': 'i', 'ϋ': 'y', 'ΐ': 'i', 'ΰ': 'y',
        'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z',
        'Η': 'H', 'Θ': 'Th', 'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M',
        'Ν': 'N', 'Ξ': 'X', 'Ο': 'O', 'Π': 'P', 'Ρ': 'R', 'Σ': 'S',
        'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'Ch', 'Ψ': 'Ps', 'Ω': 'O',
        'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z',
        'η': 'h', 'θ': 'th', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm',
        'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's',
        'ς': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'ch', 'ψ': 'ps',
        'ω': 'o'
    };

    return text.split('').map(char => map[char] || char).join('');
}

/* logout button event listener for disconnect */
document.getElementById("logout").addEventListener("click", function (){

    document.getElementById("profileForm").reset();

    /* hide this section */
    document.getElementById("logged_section").style.display = "none";

    /* appear the login section again */
    document.getElementById("login_section").style.display = "block";

});

/* Cookie Handling */
document.addEventListener("DOMContentLoaded",function (){

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (response.loggedIn) {
                document.getElementById("login_section").style.display = "none";
                document.getElementById("logged_section").style.display = "block";

                /* user data */
                document.getElementById("usernameF").value = response.data.username;
                document.getElementById("firstnameF").value = response.data.firstname;
                document.getElementById("lastnameF").value = response.data.lastname;
                document.getElementById("emailF").value = response.data.email;
                document.getElementById("passwordF").value = response.data.password;
                document.getElementById("birthdateF").value = response.data.birthdate;
                document.getElementById("genderF").value = response.data.gender;
                document.getElementById("afmF").value = response.data.afm;
                document.getElementById("countryF").value = response.data.country;
                document.getElementById("addressF").value = response.data.address;
                document.getElementById("municipalityF").value = response.data.municipality;
                document.getElementById("prefectureF").value = response.data.prefecture;
                document.getElementById("jobF").value = response.data.job;
                document.getElementById("telephoneF").value = response.data.telephone;
            } else {
                document.getElementById("login_section").style.display = "block";
                document.getElementById("logged_section").style.display = "none";
            }
        }
    };
    xhttp.open("GET", "http://localhost:8081/project2025_war_exploded/CookieServlet", true);
    xhttp.send();
});

/* deleting cookie at log out */

document.getElementById("logout").addEventListener("click", function (){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (response.success) {
                document.getElementById("login_section").style.display = "block";
                document.getElementById("logged_section").style.display = "none";
            }
        }
    };
    xhttp.open("POST", "http://localhost:8081/project2025_war_exploded/CookieServlet", true);
    xhttp.send();
});

let isEmailValid = false;    /* Initial state of valid email */

/* checking for duplicates in logged in page where user update his info */

document.getElementById("emailF").addEventListener("input", function () {
    checkDuplicateUP("email", this.value, "emailError");
});

/* function use the CheckDuplicateServlet */
function checkDuplicateUP(field,value,errorElementID){
    const errorElement=document.getElementById(errorElementID);
    const userType="user";

    if(value.length > 0){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if(this.readyState === 4 && this.status === 200){
                const response = JSON.parse(this.responseText);
                if (response.duplicate) {
                    errorElement.textContent = `${field} is already taken.`;
                    isEmailValid=false;
                } else {
                    errorElement.textContent = "";
                    isEmailValid=true;
                }
            }else if (this.readyState === 4){
                errorElement.textContent = "Error checking for duplicates.";
                console.error(`Error checking ${field}:`, this.statusText);
                isEmailValid=false;
            }
            updateUP();
        };
        xhttp.open("GET", `http://localhost:8081/project2025_war_exploded/CheckDuplicateServlet?field=${encodeURIComponent(field)}&value=${encodeURIComponent(value)}&userType=${encodeURIComponent(userType)}`, true);
        xhttp.send();
    }else{
        errorElement.textContent = ""; /* clear the span*/
        isEmailValid=false;
        updateUP();
    }
}

function updateUP(){
    const updateBtn = document.getElementById("update");
    updateBtn.disabled = !(isEmailValid);
}
