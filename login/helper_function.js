export function sendEmail(otp , userName , email) {
    (function () {
        emailjs.init({
            publicKey: "grYNfmXN7Bd5hh-Aq",
        });
    })();

    const templateParams = {
        from_name: "Keshav",
        to_name: userName.value,
        to_email: email.value,
        message: `Your OTP is : ${otp}`
    };
    emailjs.send('service_7856tyn', 'template_7g22xh9', templateParams).then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
            console.log('FAILED...', error);
        },
    );

}