"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "https://dummyjson.com/users";
function isObject(obj) {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
function isSuccess(response) {
    if (isObject(response)) {
        return "users" in response && "total" in response;
    }
    else {
        return false;
    }
}
function isUser(user) {
    if (isObject(user)) {
        return 'id' in user && 'userAgent' in user;
    }
    return false;
}
function getUsers(urlString) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(urlString);
        const data = yield response.json();
        return data;
    });
}
function processUser(user) {
    if (isUser(user)) {
        console.log(`Пользователь с идентификационным номером ${user.id} имеет такой логин ${user.username}`);
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responseData = yield getUsers(API_URL);
            if (isSuccess(responseData)) {
                responseData.users.map(user => processUser(user));
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    });
}
main();
