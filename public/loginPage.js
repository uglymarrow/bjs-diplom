'use strict';
/*
class ApiConnector {
    static _parseBody(response) {
        //  пробует парсить тело ответа, если оно существует
    }

    static login({ login, password }, callback) {
        //  запрос на авторизацию пользователя
    }

    static register({login, password}, callback) {
        //  запрос на создание пользователя с переданными параметрами
    }

    static current(callback) {
        //  запрос на получение текущего авторизованного пользователя
    }

    static logout(callback) {
        //  запрос на деавторизацию пользователя
    }

    static getFavorites(callback) {
        //  запрос на получение списка избранного
    }

    static addUserToFavorites({id, name}, callback) {
        //  запрос на добавление пользователя в список избранного
    }

    static removeUserFromFavorites(id, callback) {
        //  запрос на удаление пользователя из списка избранного
    }

    static transferMoney({ to, currency, amount }, callback) {
        //  запрос на перевод денег авторизованного пользователя тому пользователю, чьё id передано
    }

    static addMoney({ currency, amount }, callback) {
        //  запрос на добавление денег авторизованному пользователю
    }

    static convertMoney({ fromCurrency, targetCurrency, fromAmount }, callback) {
        //  запрос на конвертацию денег авторизованного пользователя из одной валюты в другую
    }

    static getStocks(callback) {
        //  запрос на получение курсов валют
    }
}
*/

let myUserForm = new UserForm();

myUserForm.loginFormCallback = data => {
    ApiConnector.login(data, ({success, data}) => {
        if (success) {
            location.reload();
        } else {
            myUserForm.setLoginErrorMessage(data);
        }
    })
};

myUserForm.registerFormCallback = data => {
    ApiConnector.register(data, ({success, data}) => {
        if (success) {
            location.reload();
        } else {
            myUserForm.setRegisterErrorMessage(data);
        }
    })
};
