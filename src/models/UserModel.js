const db = require("../database/database.js");

class UserModel {
    getAllUsers(callback) {
        db.all("SELECT * FROM users", [], (err, rows) => {
            callback(err, rows);
        });
    }

    getUserById(id, callback) {
        const query = "SELECT * FROM users WHERE id = ?";
        db.get(query, [id], (err, row) => {
            callback(err, row);
        });
    }

    createUser(user, callback) {
        const query = "INSERT INTO users (name, email, pass) VALUES (?, ?, ?)";
        db.run(query, user, function (err) {
            callback(err, this ? this.lastID : null);
        });
    }

    updateUser(id, user, callback) {
        const query = "UPDATE users SET name = ?, email = ?, pass = ? WHERE id = ?";
        db.run(query, [...user, id], function (err) {
            callback(err, this.changes);
        });
    }

    deleteUser(id, callback) {
        const query = "DELETE FROM users WHERE id = ?";
        db.run(query, [id], function (err) {
            callback(err, this.changes);
        });
    }
}

module.exports = new UserModel();