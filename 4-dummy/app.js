"use strict";
const API_URL = "https://dummyjson.com/users/";
// type-guard который в качестве аргумента может получить any или unknown, не понимаю чем хуже unknown
function isSuccess(response) {
    return "users" in response && "total" in response;
}
// type-guard который в качестве аргумента может получить any или unknown, не понимаю чем хуже unknown
function isUser(user) {
    return "id" in user && "userAgent" in user;
}
// функция, возвращает  Promise<unknown> т.к. мы не можем быть на 100% уверенны, что получим список пользователей 
async function getUsers(urlString) {
    const response = await fetch(urlString);
    if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
    }
    /* unknown потому, что если будет ошибка в адресе запроса, то сюда может прилететь или
    список юзеров или например один юзер, или вообще сообщении что запрос некоректный */
    const data = await response.json();
    return data;
}
function processUser(user) {
    console.log(`Пользователь с идентификационным номером ${user.id} имеет такой логин ${user.username}`);
}
async function main() {
    try {
        const responseData = await getUsers(API_URL);
        if (isSuccess(responseData)) {
            responseData.users.forEach((user) => {
                if (isUser(user)) {
                    processUser(user);
                }
            });
        }
        else {
            throw new Error("Не удалось получить список пользователей, проверьте запрос!");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}
main();
