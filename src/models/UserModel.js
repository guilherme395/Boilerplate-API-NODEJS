const db = require("../database/database.js");

class UserModel {
    getAllUsers(callback) {
        db.all("SELECT * FROM users", [], (error, rows) => {
            callback(error, rows);
        });
    }

    getUserById(id, callback) {
        const query = "SELECT * FROM users WHERE id = ?";
        db.get(query, [id], (error, row) => {
            callback(error, row);
        });
    }

    createUser(user, callback) {
        const query = "INSERT INTO users (name, email, pass) VALUES (?, ?, ?)";
        db.run(query, user, function (error) {
            callback(error, this ? this.lastID : null);
        });
    }

    updateUser(id, user, callback) {
        const query = "UPDATE users SET name = ?, email = ?, pass = ? WHERE id = ?";
        db.run(query, [...user, id], function (error) {
            callback(error, this.changes);
        });
    }

    deleteUser(id, callback) {
        const query = "DELETE FROM users WHERE id = ?";
        db.run(query, [id], function (error) {
            callback(error, this.changes);
        });
    }
}

module.exports = new UserModel();