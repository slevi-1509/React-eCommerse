const mongoose = require('mongoose');

// Connect to MongoDB

const connectDB = () => {
    try {
        mongoose.connect('mongodb://localhost:27017/React_Project').then(()=>{
            console.log('Database connection established')
        });
    } catch (error) {
        alert (error.message);
    }
}
   

module.exports = connectDB;
