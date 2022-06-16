import store from "../store";
import { http } from "./HttpService";
import jwt from "jsonwebtoken";
//IMPORT SOKECT.IO
import io from "socket.io-client";
export const localStorageVisitItem = "helloscribe-fristtime";
export const localStorageUser = "helloscribe-user";
//var socket = io("ws://localhost:3001/", { transports: ["websocket"] });
var socket = io(process.env.VUE_APP_STRIPE_HOOK_SOCKET, {
    transports: ["websocket"],
});
//**************Auth Fucntions ************/
//Function Used To Check if isLoggedIn And Grab Token Authentication
export function isLoggedIn() {
    const user = getSession();
    if (!user) {
        return null;
    } else {
        const hasToken = getToken();
        if (!hasToken) {
            return null;
        } else {
            const decodedToken = decodeToken();
            return decodedToken != null;
        }
    }
}
export function switchTenant(tenantId, userId) {
    return http().get(`/switch-account/${tenantId}/${userId}`);
}
//Login Function
export function login(user) {
    return (
        http()
            .post("/auth", user)
            //After Succed
            .then((res, err) => {
                if (res) {
                    //Access User & Token From Response
                    setSession(res.data.user);
                } else {
                    console.log(err.message);
                    //return { message: err.message };
                }
            })
    );
}
//Function For LogOut
export function logout() {
    localStorage.removeItem(localStorageUser);
    //Dispatch The State Through The App
    store.dispatch("authenticate");
    store.dispatch("articleStore/clearArticles");
}
//Function Register User
export function registerUser(user) {
    return http().post("/register", user);
}
//Function Register User by Invitation
export function registerInvitation(user) {
    return http().post("/register-invitation", user);
}
//Send Email Forgot Password
export function forgotPassword(user) {
    return http().put("/forgot-password", user);
}
//Send Email Reset Password
export function resetPassword(user) {
    return http().put("/reset-password", user);
}
//Resend Email Verification
export function resendEmailConfirm(userId) {
    return http().post("/auth/email/confirm/sent", userId);
}
//**************Session & Token Management *****************/
export function updateSession(user) {
    setSession(user);
}
export function setSession(user) {
    const newSession = {
        ...getSession(),
        ...user,
    };
    localStorage.setItem(localStorageUser, JSON.stringify(newSession));
    //Dispatch The Action To The Store
    store.dispatch("authenticate");
}
//Get User Session
export function getSession() {
    const obj = localStorage.getItem(localStorageUser);
    return obj ? JSON.parse(obj) : {};
}
// Extract Token
export function getToken() {
    const user = getSession();
    const token = user.token;
    if (!token) {
        return null;
    }
    return token;
}
export function getCanceled() {
    const user = getSession();
    return user.canceled;
}
export function getCreatedAt() {
    const user = getSession();
    return user.createdAt;
}
//Return The Values Come From The Token
export function decodeToken() {
    const token = getToken();
    if (!token) {
        return null;
    }
    return jwt.decode(token);
}
//**************Get User Informations From Session *****************/
//Function Return image profile
export function getImgProfile() {
    const userInfo = getSession();
    if (!userInfo) {
        return null;
    }
    return userInfo.imgPath;
}
//Function Retunr AccountID
export function getAccountId() {
    const userInfo = getSession();
    if (!userInfo) {
        return null;
    }
    return userInfo.accountId;
}
// Function Return UserName
export function getUsername() {
    const userInfo = getSession();
    if (!userInfo) {
        return null;
    }
    return userInfo.username;
}
// Function Return Email
export function getEmail() {
    const userInfo = getSession();
    if (!userInfo) {
        return null;
    }
    return userInfo.email;
}
// Function Return UserID
export function getUserId() {
    const userInfo = getSession();
    if (!userInfo) {
        return null;
    }
    return userInfo.id;
}
// Function Return Role
export function getUserRole() {
    const userInfo = getSession();
    if (!userInfo) {
        return null;
    }
    return userInfo.role;
}
// Function Return State Email Confirmation
export function getEmailState() {
    const userInfo = getSession();
    if (!userInfo) {
        return null;
    }
    return userInfo.confirmed;
}
// Function Return customerId
export function getCustomerId() {
    const userInfo = getSession();
    if (!userInfo) {
        return null;
    }
    return userInfo.stripeCustomerId;
}
//Parsing User Object
export function getUserObj() {
    return getSession();
}
// Function Return subscription status
export function getSubStatus() {
    const userInfo = getSession();
    if (!userInfo) {
        return null;
    }
    return userInfo.subscribed;
}
// Function Return Plan
export function getUserPlan() {
    const userInfo = getSession();
    if (!userInfo) {
        return null;
    }
    return userInfo.plan;
}
// Function Return Subscription
export function getUserSubscription() {
    const userInfo = getSession();
    if (!userInfo) {
        return null;
    }
    return userInfo.subscription;
}

//SOCKET.IO For Stripe webhooks
socket.on("session", function (data) {
    const payload = data.user;
    getSession(payload);
});

//SOCKET.IO
socket.on("message", function (data) {
    console.log("RECEIVED message", data);
});
