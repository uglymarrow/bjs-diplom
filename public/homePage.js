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
            myMoneyManager.setMessage(true, "Пополнение счета прошло успешно");
            ProfileWidget.showProfile(data);
        } else {
            myMoneyManager.setMessage(false, error);
        }
    });
};

myMoneyManager.conversionMoneyCallback = ({ fromCurrency, targetCurrency, fromAmount }) => {
    ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, ({success, data, error}) => {
        if (success) {
            myMoneyManager.setMessage(true, "Конвертация прошла успешно");
            ProfileWidget.showProfile(data);
        } else {
            myMoneyManager.setMessage(false, error);
        }
    });
};

myMoneyManager.sendMoneyCallback = ({ to, amount, currency }) => {
    ApiConnector.transferMoney({ to, currency, amount }, ({success, data, error}) => {
        if (success) {
            myMoneyManager.setMessage(true, "Перевод средств прошел успешно");
            ProfileWidget.showProfile(data);
        } else {
            myMoneyManager.setMessage(false, error);
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
        myFavoritesWidget.setMessage(false, error);
    }
});

myFavoritesWidget.addUserCallback = ({ id, name }) => {
    ApiConnector.addUserToFavorites({ id, name }, ({success, data, error}) => {
        if (success) {
            myFavoritesWidget.setMessage(true, "Добавление в избранное прошло успешно");
            myFavoritesWidget.clearTable();
            myFavoritesWidget.fillTable(data);
            myMoneyManager.updateUsersList(data);
        } else {
            myFavoritesWidget.setMessage(false, error);
        }
    })
}

myFavoritesWidget.removeUserCallback = (userId) => {
    ApiConnector.removeUserFromFavorites(userId, ({success, data, error}) => {
        if (success) {
            myFavoritesWidget.setMessage(true, "Удаление из избранного прошло успешно");
            myFavoritesWidget.clearTable();
            myFavoritesWidget.fillTable(data);
            myMoneyManager.updateUsersList(data);
        } else {
            myMoneyManager.setMessage(false, error);
        }
    });
}; 