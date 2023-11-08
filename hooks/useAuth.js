import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import app from "../config/connect";
import axios from "axios";

const auth = getAuth(app);

export const SignUp = (account, success, unsuccess) => {
  createUserWithEmailAndPassword(auth, account.email, account.password)
    .then((userCredential) => {
      axios
        .post("http://192.168.94.10:4000/createAccount", {
          email: account.email,
          password: account.password,
          name: account.name,
        })
        .catch((err) => {
          console.error("Axios Error : " + err);
        })
        .then((response) => {
          const user_email = userCredential.user.email;
          const msg = `Create User complete: ${user_email}`;
          success(msg);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      const msg = `signUpEmailPass error: ${error}`;
      console.error(msg);
      unsuccess(msg);
    });
};

export const SignIn = (account, success, unsuccess) => {
  console.log(account.email);
  console.log(account.password);

  signInWithEmailAndPassword(auth, account.email, account.password)
    .then((userCredential) => {
      axios.post("http://192.168.94.10:4000/login", {
          email: account.email,
          password: account.password,
        }).then((response) => {
            
        })
        .catch((err) => {
          console.error("Axios Error : " + err);
        });
      const user_email = userCredential.user.email;
      const msg = `You got SignIn complete: ${user_email}`;
      success(msg);
    })
    .catch((error) => {
      const msg = `signUpEmailPass error: ${error}`;
      console.error(msg);
      unsuccess(msg);
    });
};

export const SignOut = (success, unsuccess) => {
  signOut(auth)
    .then(() => {
      axios.get('http://192.168.94.10:4000/logout').then((response) => {

      }).catch((err) => {
        console.error("Axios Error : " + err);
      })
      const msg = `You got Logout complete `;
      success(msg);
    })
    .catch((error) => {
      const msg = `signOut error: ${error}`;
      console.error(msg);
      unsuccess(msg);
    });
};

export const ForgotPass = (email, success, unsuccess) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      const msg = `Reset Password in Your ${email} `;
      success(msg);
    })
    .catch((error) => {
      const msg = `Reset Password : ${error}`;
      console.error(msg);
      unsuccess(msg);
    });
};

export const updateEmailAndPassword = (email, password, success, unsuccess) => {
  updateEmail(auth.currentUser, email)
   .then(() => {
    const msg = `Update Password in Your ${email} `;
       success(msg);
  }).catch((error) => {
    const msg = `Update Password : ${error}`;
    console.error(msg);
    unsuccess(msg);
  });
  updatePassword(auth.currentUser, password)
   .then(() => {
       const msg = `Update Password in Your ${email} `;
       success(msg);
     })
   .catch((error) => {
       const msg = `Update Password : ${error}`;
       console.error(msg);
       unsuccess(msg);
     });
};
