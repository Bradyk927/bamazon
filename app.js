var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8000,
    user: "root",
    password:"root",
    database: "bamazon"
});

function validateInput(val){
    var integer = Number.isInteger(parseFloat(val));
    var sign = Math.sign(value);
    if (integer && (sign === 1)) {
        return true;
    }else {
        return "Please enter a valid whole number";
    }
}

function purchase(){
    inquirer.prompt([
        
    ])
}