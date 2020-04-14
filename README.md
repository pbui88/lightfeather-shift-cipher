# lightfeather-shift-cipher
A simple [node.js](https://nodejs.org/en/) web server for encoding messages using [shift-cipher](https://en.wikipedia.org/wiki/Caesar_cipher)

## Installation
1. `npm install`
1. Write .env file and define **PORT** to revise web server port. Default value is **23456**. This is *Optional*
1. `npm start` to launch the project

The endpoint url is http://localhost:23456/api/encode

## Documentation
* **Request method** POST
* **Request format**
```json
{
	"Shift": 3,
	"Message": "Encode me"
}
```
* **Response format**
```json
{
	"EncodedMessage": "Hqfrgh ph"
}
```
