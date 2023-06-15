const express = require('express');
const app = express();

const nodemailer = require('nodemailer');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended:true
    })
);

app.get('/', async(req, res) => {
    res.status(200).json({message: "running"})
})

app.post('/send-email', async(req, res) => {
    const message = {
        ClicouNoNao: req.body.ClicouNoNao,
        ClicouNoSimReal: req.body.ClicouNoSimReal,
        ClicouNoSimDoBait: req.body.ClicouNoSimDoBait   
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smpt.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'quersaircomigoenvia2@gmail.com',
            pass: 'ibjhbaoqszpmdtlm'
        }
    });
    const option = {
        from: 'quersaircomigoenvia2@gmail.com',
        to: 'quersaircomigorecebe@gmail.com',
        subject: 'update',
        text: `Clicou no não: ${message.ClicouNoNao},\nClicou no sim real: ${message.ClicouNoSimReal},\nClicou no sim do bait: ${message.ClicouNoSimDoBait}`
    };

    transporter.sendMail(option, (error, info) => {
        if(error) console.log(error, 'error');
        else console.log('mail send', info);
    })
})


app.listen(3000, () => {
    console.log('running on 3000');
})

module.exports = app;
