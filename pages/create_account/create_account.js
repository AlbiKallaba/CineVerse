const email = document.getElementById('email').value;
const emailForm = document.getElementById('email');
const password = document.getElementById('password').value;
        
console.log(email);
console.log(password);

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function emailHandler(e) {
    if (!(validateEmail(e))) {
        alert('Your email must be valid');
        e.style.outline = '2px solid red';
        return;
    }
    emailElement.style.outline = 'none'; // Reset outline if valid

}
email.addEventListener('input', emailHandler(e))
// emailHandler(email);

function passwordHandler(e) {
    if (e.length < 8) {
        if (e.length != 0) {
            alert('Your password is too short');
        }
        return;
    }
}
<<<<<<< HEAD

password.addEventListener('input',passwordHandler(e))
// passwordHandler(password)
const username = document.getElementById("enter_box1").value;
const bio = document.getElementById("bio_box").value;
Forma.addEventListener("submit", setCookie(username,bio));

function setCookie(username,bio) {
    localStorage.setItem({"Username":username.toString() , "Bio":bio.toString()});
}
=======
password.addEventListener('input', passwordHandler(e))
// passwordHandler(password)

const inputElement = document.getElementById('Privacy_Policy_description');
inputElement.addEventListener('change', (event) => {
    console.log('privarcy policy accepted');
});
>>>>>>> 61aca6798f65131d12b3ff2c9814596d199cf835
