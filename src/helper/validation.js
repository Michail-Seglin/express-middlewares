function isValidUserId(req, res, next) {
    const { id } = req.params;

    if (!id) throw new Error('id is empty')
    if (isNaN(id)) throw new Error('id not number')
    if (id < 0) throw new Error('id не может быть отрицательным')

    next()
}

function isValidUserData(req, res, next) {
    const { name, surname, email, pwd } = req.body;
    if (!name) throw new Error('Значение name пустое');
    if (!surname) throw new Error('Значение surname пустое');
    if (!email) throw new Error('Значение email пустое');
    if (!pwd) throw new Error('Значение pwd пустое');

    if (!isNaN(name)) throw new Error('Значение name не может быть числом');
    if (!isNaN(surname)) throw new Error('Значение surname не может быть числом');
    if (!/^[a-z0-9\.\-\_]+@[a-z]+\.[a-z]+$/gm.test(email)) throw new Error('Email не соответствует');
    if (pwd.length < 8) throw new Error('Пароль должен быть больше 8 символов');

    next();
}


module.exports = { isValidUserId, isValidUserData };