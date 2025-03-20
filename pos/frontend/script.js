// Import Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Firebase Config
// const firebaseConfig = {
//     apiKey: "AIzaSyBVFj9t148VrP3hzhIPq-dklPTtgzTDjhs",
//     authDomain: "quickserve-14b25.firebaseapp.com",
//     projectId: "quickserve-14b25",
//     storageBucket: "quickserve-14b25.appspot.com",
//     messagingSenderId: "624553281030",
//     appId: "1:624553281030:web:4d886c6b5b45b57d702587",
//     measurementId: "G-JXX6BYD78K"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Select the form and button
// const form = document.querySelector("form");
// const emailInput = document.querySelector("input[type='email']");
// const passwordInput = document.querySelector("input[type='password']");
// const button = document.querySelector(".continue-btn");

// // Handle Login/Sign-Up
// button.addEventListener("click", async (e) => {
//     e.preventDefault(); // Prevent form submission

//     const email = emailInput.value;
//     const password = passwordInput.value;

//     try {
//         // Try signing in
//         await signInWithEmailAndPassword(auth, email, password);
//         alert("Login Successful!");
//         window.location.href = "dashboard.html"; // Redirect after login
//     } catch (error) {
//         // If user does not exist, sign them up
//         if (error.code === "auth/user-not-found") {
//             try {
//                 await createUserWithEmailAndPassword(auth, email, password);
//                 alert("Account created! Logging in...");
//                 window.location.href = "dashboard.html";
//             } catch (signupError) {
//                 alert("Signup Error: " + signupError.message);
//             }
//         } else {
//             alert("Error: " + error.message);
//         }
//     }
// });