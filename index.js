const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const asciiLowerA = 97;
const asciiUpperA = 65;

//=========== Create server ===================
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//=========== Api - api/encode ===================
app.post('/api/encode', (req, res) => {
    const responseBody = {
        'EncodedMessage': '',
    };
    const { Shift, Message } = req.body;

    // validate request body
    if (isNaN(Shift) || !Number.isInteger(Number(Shift)) || !Message) {
        return res.status(500).json(responseBody);
    }

    const numShift = Number(Shift) < 0 ? Number(Shift) + 26 : Number(Shift);

    // run encoder
    const words = Message.split(' ');
    responseBody.EncodedMessage = words.map(word => {
        let encoded = '';
        for (let i = 0 ; i < word.length ; i ++) {
            let charEncoded = word[i];
            if ((charEncoded <= 'Z' && charEncoded >= 'A') || (charEncoded <= 'z' && charEncoded >= 'a')) {
                const isUppercase = charEncoded <= 'Z' && charEncoded >= 'A';
                charEncoded = charEncoded.toLowerCase();
                charEncoded = charEncoded.charCodeAt(0) + numShift;
                charEncoded = (charEncoded - asciiLowerA) % 26 + asciiLowerA;
                if (isUppercase) {
                    charEncoded -= asciiLowerA - asciiUpperA;
                }
                charEncoded = String.fromCharCode(charEncoded);
            }
            encoded = `${encoded}${charEncoded}`;
        }
        return encoded;
    }).join(' ');

    res.status(200).json(responseBody);
});

//=========== Start server ===================
app.listen(config.port, function () {
	console.log(`Server is running on port=${config.port}`);
});
