import { sendEmail } from "./helper_function.js";

const userName = document.getElementById('name');
const phone = document.getElementById('phn');
const email = document.getElementById('email');
const password = document.getElementById('password');
const signup = document.getElementById('signup');
const otpData = document.getElementById('otpData');
const signupData = document.getElementById('signupData');
const otpVerification = document.getElementById('otpVerification');
const otpInput = document.getElementById('otpInput');


let otp=Math.floor(Math.random() * 1000000);


signup.addEventListener('click', (event) => {
    event.preventDefault();
    if (!userName.value || !phone.value || !email.value || !password.value) {
        alert("Error : Please fill all the info");
    }
    else {
        signupData.style.display = "none";
        otpData.style.display = "block";
        sendEmail(otp , userName , email);
    }
})

otpVerification.addEventListener('click',(event)=>{
    event.preventDefault();
    if(Number(otpInput.value) === otp){
        let userData={
            name : userName.value,
            email : email.value,
            password : password.value,
            phone : phone.value
        };
        let obj = JSON.parse(localStorage.getItem('userData') || '[]')
        let user=obj.find((item)=>item.phone===userData.phone);
        if(user===undefined){
            obj.push(userData);
            localStorage.setItem('userData',JSON.stringify(obj));
            alert("Succesfully signed up!!");
        }
        else{
            alert("user already exists");
        }
        

    }
    else{
        alert("wrong Output");
    }
})