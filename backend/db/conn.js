const mongoose = require('mongoose');

async function main() {
        await mongoose.connect('mongodb://localhost:27017/GetAPet')
        console.log('conectou ao DB!')   
}  


main().catch(err => console.log(err));
console.log('MongoDB state:', mongoose.connection.readyState)

module.exports = mongoose