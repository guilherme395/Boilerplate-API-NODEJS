const fs = require("fs");
const path = require("path");

const logError = (error) => {
    const now = new Date();
    const date = now.getFullYear() + "-" +
        ("0" + (now.getMonth() + 1)).slice(-2) + "-" +
        ("0" + now.getDate()).slice(-2);
    const time = ("0" + now.getHours()).slice(-2) + ":" +
        ("0" + now.getMinutes()).slice(-2) + ":" +
        ("0" + now.getSeconds()).slice(-2);
    const timestamp = `${date} ${time}`;

    const errorMessage = `[${timestamp}] - ${error}\n`;
    fs.appendFileSync(path.join(__dirname, "..", "error.log"), errorMessage);
};

module.exports = logError;