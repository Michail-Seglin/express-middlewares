const fs = require("fs");
const path = './storage/storage.json';

function getAllUser() {
    const data = JSON.parse(fs.readFileSync(path));
    if (!data.length) throw new Error('emty')
    return data;
}

function getUserById(id) {
    const data = JSON.parse(fs.readFileSync(path));
    const filtered = data.filter((el) => el.id == id);
    if (!data.length) throw new Error('id not found')
    return filtered
}

function updateUser(id, name, surname, email, pwd) {
    const data = JSON.parse(fs.readFileSync(path));
    const filtered = data.filter((el) => el.id != id);

    const newObj = {
        id: +id,
        name: name,
        surname: surname,
        email: email,
        pwd: pwd
    }

    if (filtered.length === data.length) throw new Error('id not found')
    filtered.push(newObj);
    fs.writeFileSync(path, JSON.stringify(filtered));
    return filtered
}

function createUser(name, surname, email, pwd) {
    const data = JSON.parse(fs.readFileSync(path));
    const item = {
        id: data.length + 1,
        name: name,
        surname: surname,
        email: email,
        pwd: pwd
    }
    data.push(item);
    return data
}

function patchUser(id, clientObj) {
    const data = JSON.parse(fs.readFileSync(path));

    const oldData = data.find((el) => el.id == id);
    const newData = { ...oldData, ...clientObj };

    const patched = data.filter((el) => el.id != id);
    if (patched.length == data.length) throw new Error('id not found');

    patched.push(newData);

    fs.writeFileSync(path, JSON.stringify(patched));
    return patched
}

function deleteUser(id) {
    const data = JSON.parse(fs.readFileSync(path));
    const filtered = data.filter((el) => el.id != id);

    if (filtered.length == data.length) throw new Error('id not found')

    fs.writeFileSync(path, JSON.stringify(filtered));
    return filtered
}
module.exports = {
    getAllUser,
    deleteUser,
    getUserById,
    updateUser,
    createUser,
    patchUser
};