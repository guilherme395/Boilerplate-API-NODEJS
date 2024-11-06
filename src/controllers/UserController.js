const UserModel = require("../models/UserModel.js");

class UserController {
    getAllUsers(req, res) {
        try {
            UserModel.getAllUsers((err, rows) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Internal server error."
                    });
                }
                res.json({
                    success: true,
                    message: "Returned all users.",
                    data: rows
                });
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    getUserById(req, res) {
        try {
            const {
                id
            } = req.params;
            UserModel.getUserById(id, (err, user) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Internal server error."
                    });
                }
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found."
                    });
                }
                res.json({
                    success: true,
                    message: "User Returned successfully.",
                    user: user
                })
            });

        } catch (error) {
            throw new Error(error);
        }
    }

    createUser(req, res) {
        try {
            const {
                name,
                email,
                pass
            } = req.body;

            if (!name || !email || !pass || name.trim() === "" || email.trim() === "" || pass.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Name, email, and password are required."
                });
            }

            UserModel.createUser([name, email, pass], (err, lastID) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Internal server error."
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "User created successfully.",
                    data: {
                        id: lastID,
                        name: name,
                        email: email,
                        pass: pass
                    }
                });
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    updateUser(req, res) {
        try {
            const {
                id
            } = req.params;
            const {
                name,
                email,
                pass
            } = req.body;

            if (!name || !email || !pass || name.trim() === "" || email.trim() === "" || pass.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Name, email, and password cannot be null or empty."
                });
            }

            UserModel.updateUser(id, [name, email, pass], (err, changes) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Internal server error."
                    });
                }

                if (changes === 0) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found."
                    });
                }

                res.json({
                    success: true,
                    message: "User updated successfully",
                    data: {
                        id: id,
                        name: name,
                        email: email,
                        pass: pass
                    }
                });
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteUser(req, res) {
        try {
            const {
                id
            } = req.params;

            UserModel.deleteUser(id, (err, changes) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Internal server error."
                    });
                }

                if (changes === 0) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found."
                    });
                }

                res.json({
                    success: true,
                    message: "User deleted successfully"
                });
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new UserController();