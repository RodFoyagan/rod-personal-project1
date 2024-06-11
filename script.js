function showSideBar() {
    const sideBar = document.querySelector(".side-bar");
    sideBar.style.display = "flex";
}

function hideSideBar() {
    const hideBar = document.querySelector(".side-bar");
    hideBar.style.display = "none";
}

const navLink = document.querySelectorAll(".side-bar a");
navLink.forEach(nav => {
    nav.addEventListener("click", hideSideBar);
});

//-----------------------------------------------
// Function to scroll to the top of the page
function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to toggle back to top button visibility based on scroll position
function toggleBackToTopButton() {
    let button = document.getElementById("backToTopBtn");
    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if(scrollPosition > 20) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

window.onscroll = toggleBackToTopButton;
//------------------------------------------------------
const form = document.getElementById("form");
const fullName = document.getElementById("login-name");
const email = document.getElementById("login-email");
const myMessage = document.getElementById("login-message");


form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (checkInputs()) { // Check inputs first
    
        // Use a timeout to ensure styles are applied before showing the alert
        setTimeout(() => {
            alert("Form submitted successfully!"); // Show alert
            form.submit(); // Submit the form
        }, 0);
    }
});

function checkInputs() {
    const fullNameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const messageValue = myMessage.value.trim();
    let isValid = true;

    if(fullNameValue === "") {
        setErrorFor(fullName, "Name cannot be blank.");
        isValid= false;
    } else if (!isValidFullName(fullNameValue)) {
        setErrorFor(fullName, "Please provide your First and Last name.");
        isValid = false;
    } else {
        setSuccessFor(fullName);
    }
    
        if(emailValue === "") {
            setErrorFor(email, "Email cannot be blank.");
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setErrorFor(email, "Email is not valid.");
            isValid = false;
        } else {
            setSuccessFor(email);
        }
    
    if(messageValue === "") {
        setErrorFor(myMessage, "Message cannot be blank.");
        isValid = false;
    } else if (messageValue.length < 20 || messageValue.length > 100) {
        setErrorFor(myMessage, "Message must be between 20 and 100 characters.");
        isValid = false;
    } else{
        setSuccessFor(myMessage);
    }
    if (fullNameValue !== "" && isValidEmail(emailValue) && messageValue !== "" && messageValue.length >= 10) {
        isValid = true;
    }
    return isValid; // Return the validation result
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector("p.error-message");
    errorMessage.innerText = message;
    formControl.className = "form-control error";
    errorMessage.style.visibility = "visible";
}
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
    const errorMessage = formControl.querySelector("p.error-message");
    errorMessage.style.visibility = "hidden";
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const fullNameRegex = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;

function isValidFullName(fullName) {
    return fullNameRegex.test(fullName);
}
