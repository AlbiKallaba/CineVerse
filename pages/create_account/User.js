export class User {
    constructor(username, email, password, gender) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.gender = gender;
    }
  
    // Save user data to localStorage
    saveToLocalStorage() {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
        gender: this.gender
      };
      localStorage.setItem('user', JSON.stringify(userData));
    }
  
    // Retrieve user data from localStorage
    static getFromLocalStorage() {
      const userData = localStorage.getItem('user');
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
    }
  }
  
  // Handle form submission
  document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('enter_box1').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
  
    const newUser = new User(username, email, password, gender);
    newUser.saveToLocalStorage();
    alert('User signed up successfully!');
  });
  
  // Check if user exists in localStorage
  document.getElementById('sign_in_button').addEventListener('click', function() {
    const existingUser = User.getFromLocalStorage();
    
    if (!existingUser) {
      window.location.href = './create_account.html';  // Redirect to the sign-up page
    } else {
      // Load the HTML page with user info
      const userPage = `../Account/Account.html?username=${encodeURIComponent(existingUser.username)}`;
      window.location.href = userPage;  // Redirect to user profile page
    }
  });