require("dotenv").config();
const mainRouter = require('./routers/mainRouter');
const authRouter = require('./routers/authRouter');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoDBSession = require('connect-mongodb-session')(session);
const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/connectDB');
const app = express();

const store = new mongoDBSession({
    uri: process.env.mongoURI,
    collection:'sessions'
})

app.use(cookieParser())
app.use(express.json());

app.use(cors({
    // cors: {
    //     origin: process.env.SERVER_NAME+process.env.APP_PORT,
    //     methods: ["GET", "POST"]
    // }
})) ;

app.post('/logout', async (req, res, next) => {
    try {
        // req.session.destroy();
    } catch (err) {
        console.error('Error logging out:', err);
        return next(new Error('Error logging out'));
    }
    res.status(200).send();
})

connectDB();

//routers
app.use("/api/", mainRouter);
app.use("/api/auth", authRouter);

// server start
app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});
