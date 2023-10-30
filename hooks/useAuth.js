import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import app from '../config/connect';

const auth = getAuth(app);

export const SignUp = (account, success, unsuccess) => {
    createUserWithEmailAndPassword(auth, account.email, account.password)
        .then((userCredential) => {
            const user_email = userCredential.user.email
            const user_pass = userCredential.user.password
            const msg = `Create User complete: ${user_email}`
            success(msg)
        }
        )
        .catch((error) => {
            const msg = `signUpEmailPass error: ${error}`
            console.error(msg)
            unsuccess(msg)
        }
        )
        
}

export const SignIn = (account, success, unsuccess) => {
    console.log(account.email)
    console.log(account.password)

    signInWithEmailAndPassword(auth, account.email, account.password)
        .then((userCredential) => {
            const user_email = userCredential.user.email
            const msg = `You got SignIn complete: ${user_email}`
            success(msg)
        }
        )
        .catch((error) => {
            const msg = `signUpEmailPass error: ${error}`
            console.error(msg)
            unsuccess(msg)
        }
        )
        
}

export const SignOut = (success,unsuccess) => {
    signOut(auth)
        .then(() => {
            const msg = `You got Logout complete `
            success(msg)
        }
        )
        .catch((error) => {
            const msg = `signOut error: ${error}`
            console.error(msg)
            unsuccess(msg)
        }
        )
}

export const ForgotPass = (email,success,unsuccess) => {
    sendPasswordResetEmail(auth,email)
    .then(() => {
        const msg = `Reset Password in Your ${email} `
        success(msg)
    }
    )
    .catch((error) => {
        const msg = `Reset Password : ${error}`
        console.error(msg)
        unsuccess(msg)
    }
    )
}
