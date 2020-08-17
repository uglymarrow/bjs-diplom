let myLogoutButton = new LogoutButton();

myLogoutButton.action = () => {
    ApiConnector.logout((success) => {
        if (success) {
            location.reload();
        }
    });
};

ApiConnector.current(({success, data}) => {
    if (success) {
        ProfileWidget.showProfile(data);
    }
});

let myRatesBoard = new RatesBoard();

setInterval(ApiConnector.getStocks(({success, data}) => {
                if (success) {
                    myRatesBoard.clearTable();
                    myRatesBoard.fillTable(data);
                }
             }), 1000);

let myMoneyManager = new MoneyManager();

myMoneyManager.addMoneyCallback = ({ currency, amount }) => {
    ApiConnector.addMoney({ currency, amount }, ({success, data, error}) => {
        if (success) {
            myMoneyManager.setMessage(false, "Пополнение счета прошло успешно");
            ProfileWidget.showProfile(data);
        } else {
            myMoneyManager.setMessage(true, error);
        }
    });
};

myMoneyManager.conversionMoneyCallback = ({ fromCurrency, targetCurrency, fromAmount }) => {
    ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, ({success, data, error}) => {
        if (success) {
            myMoneyManager.setMessage(false, "Конвертация прошла успешно");
            ProfileWidget.showProfile(data);
        } else {
            myMoneyManager.setMessage(true, error);
        }
    });
};

myMoneyManager.sendMoneyCallback = ({ to, amount, currency }) => {
    ApiConnector.transferMoney({ to, currency, amount }, ({success, data, error}) => {
        if (success) {
            myMoneyManager.setMessage(false, "Перевод средств прошел успешно");
            ProfileWidget.showProfile(data);
        } else {
            myMoneyManager.setMessage(true, error);
        }
    });
};

let myFavoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(({success, data, error}) => {
    if (success) {
        myFavoritesWidget.clearTable();
        myFavoritesWidget.fillTable(data);
        myMoneyManager.updateUsersList(data);
    } else {
        myFavoritesWidget.setMessage(true, error);
    }
});

myFavoritesWidget.addUserCallback = ({ id, name }) => {
    ApiConnector.addUserToFavorites({ id, name }, ({success, data, error}) => {
        if (success) {
            myFavoritesWidget.setMessage(false, "Добавление в избранное прошло успешно");
            myFavoritesWidget.clearTable();
            myFavoritesWidget.fillTable(data);
            myMoneyManager.updateUsersList(data);
        } else {
            myFavoritesWidget.setMessage(true, error);
        }
    })
}

myFavoritesWidget.removeUserCallback = (userId) => {
    ApiConnector.removeUserFromFavorites(userId, ({success, data, error}) => {
        if (success) {
            myFavoritesWidget.setMessage(false, "Удаление из избранного прошло успешно");
            myFavoritesWidget.clearTable();
            myFavoritesWidget.fillTable(data);
            myMoneyManager.updateUsersList(data);
        } else {
            myMoneyManager.setMessage(true, error);
        }
    });
}; 