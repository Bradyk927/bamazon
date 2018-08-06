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
        {
            type: "input",
            name: "item_id",
            message: "Enter the Item ID for the desired item",
            validate: "validateInput",
            filter: Number
        },
        {
            type: "input",
            name: "quantity",
            message: "Enter the desired amount",
            validate: validateInput,
            filter: Number
        }
    ]).then(function(input){

        var item = input.item_id;
        var quantity = input.quantity;

        var queryStr = "SELECT * FROM products WHERE ?";

        connection.query(queryStr, {item_id: item}, function(err, data){
            if(err) throw err;

            if (data.length === 0) {
                console.log("Error: Invalid ID. Please input valid Item ID");
                displayInventory();
            }
            else{
                var prodData = data[0];


                if (quantity <= prodData.stock_quantity){
                    console.log("Item added to cart");

                    var updatedQueryStr = "UPDATE products SET stock_quantity = " + (prodData.stock_quantity - quantity)

                    connection.query(updatedQueryStr, function(err, data){
                        if (err) throw err;

                        console.log("Order placed, your total is $" + prodData.price * quantity);

                        connection.end();
                    })
                } else {
                    console.log("Unfortunately that item is out of stock");

                    displayInventory();
                }

            }
        })
    })
}

function displayInventory() {
	
	queryStr = 'SELECT * FROM products';

	
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		
		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	
	  	promptUserPurchase();
	})
}


function runBamazon() {
	
	displayInventory();
}


runBamazon();