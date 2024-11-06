const UserModel = require("../models/UserModel.js");
const logError = require("../helpers/logger.js");

class UserController {
    getAllUsers(req, res) {
        try {
            UserModel.getAllUsers((error, rows) => {
                if (error) {
                    logError(error);
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
            logError(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong."
            });
        }
    }

    getUserById(req, res) {
        try {
            const {
                id
            } = req.params;
            UserModel.getUserById(id, (error, user) => {
                if (error) {
                    logError(error);
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
                });
            });
        } catch (error) {
            logError(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong."
            });
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

            UserModel.createUser([name, email, pass], (error, lastID) => {
                if (error) {
                    logError(error);
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
            logError(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong."
            });
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

            UserModel.updateUser(id, [name, email, pass], (error, changes) => {
                if (error) {
                    logError(error);
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
            logError(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong."
            });
        }
    }

    deleteUser(req, res) {
        try {
            const {
                id
            } = req.params;

            UserModel.deleteUser(id, (error, changes) => {
                if (error) {
                    logError(error);
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
            logError(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong."
            });
        }
    }
}

module.exports = new UserController();