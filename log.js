const chalk = require('chalk');
module.exports = function(data, data2, option) {
	if (option == "ok") return console.log(("-----------------------------------------------------------\n")+chalk.bold.hex("#FFFF00")('[ OK ] » ') + chalk.hex("#19ade1")(data) + chalk.hex("#00FF00")(data2));
	if (option == "err") return console.log(("-----------------------------------------------------------\n")+chalk.bold.hex("#FF0000")('[ ERR ] » ') + chalk.hex("#19ade1")(data) + chalk.hex("#Efa70f")(data2));
}