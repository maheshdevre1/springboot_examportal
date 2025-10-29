// Show alert function
function showAlert(message, type) {
	const alertBox = document.getElementById('alertBox');
	const alertMessage = document.getElementById('alertMessage');

	alertMessage.innerText = message;
	alertBox.className = 'alert ' + type; // 'alert success' or 'alert error'
	alertBox.style.display = 'block';

	// Auto close after 3 seconds
	setTimeout(() => {
		alertBox.style.display = 'none';
	}, 3000);
}

// Close alert manually
function closeAlert() {
	document.getElementById('alertBox').style.display = 'none';
}


function login() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	const errorMsg = document.getElementById('errorMsg');
	const loginButton = document.querySelector("button");

	// Check if username or password is empty
	if (username === "" && password === "") {
		showAlert("Please enter username and password", "error");
		return; // STOP function here
	} else if (username === "") {
		showAlert("Enter your username", "error");
		return; // STOP function here
	} else if (password === "") {
		showAlert("Enter your password", "error");
		return; // STOP function here
	} else {
		if (errorMsg) {
			errorMsg.textContent = ""; // Clear any previous error messages if present
		}
	}

	// Disable the login button while the request is being processed
	loginButton.disabled = true;

	const data = {
		username: username,
		password: password
	};

	// Sending login request to the backend
	fetch('http://127.0.0.1:8084/generate-token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Invalid credentials');
			}
			return response.json();
		})
		.then(result => {
			// Successful login
			console.log('==== JWT Token Received ====');
			console.log('Token:', result.token);
			localStorage.setItem('token', result.token);
			showAlert("Login successful!", "success");
			window.location.href = 'dashboard.html'; // redirect to dashboard
		})
		.catch(error => {
			console.error('Error:', error);
			showAlert("Invalid username or password!", "error");
		})
		.finally(() => {
			loginButton.disabled = false;
		});
}

function signUp() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const email = document.getElementById('email').value;
	const phone = document.getElementById('phone').value;
	const errorMsg = document.getElementById('errorMsg');
	const singUpButton = document.querySelector("button");


	if (username === "") {
		showAlert("Please enter your username", "error");
		return; // STOP function here
	} else if (password === "") {
		showAlert("Please enter your password", "error");
		return; // STOP function here
	} else if (firstName === "") {
		showAlert("Please enter your first name", "error");
		return; // STOP function here
	} else if (lastName === "") {
		showAlert("Please enter your last name", "error");
		return; // STOP function here
	} else if (email === "") {
		showAlert("Please enter your email", "error");
		return; // STOP function here
	} else if (phone === "") {
		showAlert("Please enter your phone number", "error");
		return; // STOP function here
	} else {
		if (errorMsg) {
			errorMsg.textContent = ""; // Clear any previous error messages if present
		}
	}
	
	// Disable the login button while the request is being processed
	singUpButton.disabled = true;



	const data = {
		username: username,
		password: password,
		firstName: firstName,
		lastName: lastName,
		email: email,
		phone: phone
	};

	// Sending signup request to the backend
	fetch('http://127.0.0.1:8084/user/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(response => {
			if (!response.ok) {
				// If the response is not OK, throw an error (e.g., user already exists)
				//throw new Error('User already exists');
				showAlert("User is already registered!", "error");
			}
			return response.json();
		})
		.then(result => {
			// User registered successfully

			console.log('Username:', result.username);

			// Store the username in localStorage (if needed for later use)
			localStorage.setItem('username', result.username);

			// Show success alert and redirect to login page
			showAlert("User registered successfully!", "success");

			// Redirect to the login page
			//window.location.href = 'login.html'; // Make sure the path is correct
		})
		.catch(error => {
			console.error('Error:', error);

			// Show error alert if something goes wrong
			showAlert(error.message, "error");
		});
}



// Function to reset the input fields (no API call)
function resetFields() {
	// Clear the username and password fields
	document.getElementById('username').value = "";
	document.getElementById('password').value = "";
	document.getElementById('firstName').value = "";
	document.getElementById('lastName').value = "";
	document.getElementById('email').value = "";
	document.getElementById('phone').value = "";
	// Optionally, clear any error messages
	const errorMsg = document.getElementById('errorMsg');
	errorMsg.textContent = "";
	// You may also hide the error modal if it was shown
	const errorModal = document.getElementById('errorModal');
	errorModal.style.display = "none"; // Hide the modal
}

function redirectToSignup() {
	window.location.href = "sign.html";
}
