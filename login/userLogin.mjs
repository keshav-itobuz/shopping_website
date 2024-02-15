import { sendEmail } from "./helper_function.js";
import { Verification } from "./helper_function.js";

const signup = document.getElementById('signup');
const phone = document.getElementById('phn');
const email = document.getElementById('email');
const password = document.getElementById('password');
const otpData = document.getElementById('otpData');
const signupData = document.getElementById('signupData');
const loginData = document.getElementById('loginData');
const otpVerification = document.getElementById('otpVerification');
const signin = document.getElementById('login')
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const gotoLogin = document.getElementById('gotoLogin');
const gotoSignup = document.getElementById('gotoSignup');
const userName = document.getElementById('name');
let otp = Math.floor(Math.random() * 1000000);
let userData;

signup.addEventListener('click', (event) => {
    event.preventDefault();
    if (!userName.value || !phone.value || !email.value || !password.value) {
        alert("Error : Please fill all the info");
    }
    else {
        userData = {
            name: userName.value,
            email: email.value,
            password: password.value,
            phone: phone.value
        };
        let obj = JSON.parse(localStorage.getItem('userData') || '[]')
        let user = obj.findIndex((item) => item.phone === userData.phone || item.email === userData.email);
        if (user !== -1) {
            alert("user already exists");
            window.location.href = "./login.html";
        }
        else {
            signupData.style.display = "none";
            loginData.style.display = "none";
            otpData.style.display = "block";
            sendEmail(otp, userName, email);
        }
    }
})

otpVerification.addEventListener('click', (event) => {
    Verification(event, otpInput, otp, userData)
})

signin.addEventListener('click', (event) => {
    event.preventDefault();
    userData = {
        email: loginEmail.value,
        password: loginPassword.value,
    }
    let obj = JSON.parse(localStorage.getItem('userData') || '[]');
    let user = obj.findIndex((item) => item.email == userData.email && item.password == userData.password);
    if (user === -1) {
        alert("Invalid Email or Password");
    }
    else {
        let cartItems = JSON.parse(localStorage.getItem('userCartData') || '[]');
        if (cartItems[userData.email] === undefined) {
            cartItems = [];
        }
        else {
            cartItems = cartItems[userData.email];
        }

        let currentUser = {
            name: obj[user].name,
            email: userData.email,
            cartItems: cartItems,
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = "../main/index.html";
    }
})

gotoLogin.addEventListener('click', (event) => {
    event.preventDefault();
    loginData.style.display = 'block';
    signupData.style.display = 'none';

})
gotoSignup.addEventListener('click', (event) => {
    event.preventDefault();
    signupData.style.display = 'block';
    loginData.style.display = 'none';

})

