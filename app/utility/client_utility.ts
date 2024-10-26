"use client"
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
// function to 

export function getCookieData () {
    const token = Cookies.get('token');
    const decodedData = jwt.decode(token);
    if (decodedData === null) return "";
    if (typeof decodedData === "string") return "";
    return decodedData.userName;
}

export function getToken () {
    const token = Cookies.get('token');
    return token;
}