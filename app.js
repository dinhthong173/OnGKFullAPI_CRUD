const express = require('express')
const cors = require('cors')
const path = require('path');
const app = express()
const listen_port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const userRouter = require('./api/router')
app.use("/api/sinhvien", userRouter)
app.use(express.static(path.join(__dirname, 'views')));

app.listen(listen_port, () => {
    console.log("Listening port: " + listen_port)
})