const express = require('express');

const app = express();
const server = require('http').createServer(app);
const userRouter = require('./routes/usermanager');
const orderRouter = require('./routes/orderManager');
const utilRouter = require('./routes/util');
const port = process.env.PORT || 5000;

const cors = require('cors')
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('send', (data) => {
        console.log('a message recieved');
        console.log(data);

        socket.broadcast.emit('rec_msg', data);
    })
})
app.use(cors());

app.use(express.json());

app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/utils', utilRouter);

app.use(express.static('./uploads'));

const stripe = require("stripe")("sk_test_4UUC1EhrWC2XwOh5Y7ag4oK300raaV4B4f");

server.listen(port, () => {

    console.log(`Server Started! on port ${port}`);

});

app.get("/", (req, res) => {
    console.log("Merch API working");
    res.send("Merch API working");
})

app.post("/create-payment-intent", async (req, res) => {
    const data = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: data.amount,
        currency: 'inr'
    });

    res.status(200).json(paymentIntent);
});
