# Telegraf Test [![Codacy Badge](https://api.codacy.com/project/badge/Grade/626063315da84c0fa65f020a864774c4)](https://www.codacy.com/app/tiagodanin/Telegraf-Test?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=TiagoDanin/Telegraf-Test&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/TiagoDanin/Telegraf-Test.svg?branch=master)](https://travis-ci.org/TiagoDanin/Telegraf-Test) [![Known Vulnerabilities](https://snyk.io/test/github/TiagoDanin/Telegraf-Test/badge.svg?targetFile=package.json)](https://snyk.io/test/github/TiagoDanin/Telegraf-Test?targetFile=package.json)

Telegraf Test - Simple Test ToolKit of Telegram Bots

## Features

- Compatible with [Telegraf](http://telegraf.js.org) <3.
- Send message, inline query and callback query.
- Work in local network.

## Installation

This is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/). It can be installed using the
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) command line tools.

```sh
npm install telegraf-test --save
```

## How to Use

### Example

```javascript
const Telegraf = require('telegraf')
const TelegrafTest = require('telegraf-test')

const port = 3000
const secretPath = 'secret-path'

const bot = new Telegraf('ABCD:1234567890')
const test = new TelegrafTest({
	url: `http://127.0.0.1:${port}/${secretPath}`
})

test.setUser({
	id: 1234,
	username: '@Jack'
	//...//
}) /*return {
	id: 1234,
	is_bot: false,
	first_name: 'FIST-NAME',
	last_name: '',
	username: '@Jack',
	language_code: 'en-US'
}*/

bot.hears(/ping/i, (ctx) => {
	ctx.reply('Pong!')
})

bot.startWebhook(`/${secretPath}`, null, port)

test.sendMessageWithText('/ping')
	.then((res) => {
		console.log(res.data)
		//return { method: 'sendMessage', chat_id: 1234567890, text: 'Pong!' }
	})
	.catch((err) => {
		console.error(err)
	})

```

### Options of Class `TelegrafTest({options})`

- **url** - String
> Webhook url of your bot.</br>
> Default value: `http://127.0.0.1:3000/secret-path`

- **axios** - Object
> Config/option of Axios.</br>
> Default value: `{headers: {'content-type': 'application/json'}, method: 'POST'}`

### API

#### Set & Get Objects

- **setUser({**[params](https://core.telegram.org/bots/api#user)**})**

- **setChat({**[params](https://core.telegram.org/bots/api#chat)**})**

- **setMessage({**[params](https://core.telegram.org/bots/api#message)**})**

- **setInlineQuery({**[params](https://core.telegram.org/bots/api#inlinequery)**})**

- **setCallbackQuery({**[params](https://core.telegram.org/bots/api#callbackquery)**})**

- **setUpdateId(id: Number)**
> Update id.</br>
> Default value: Start in `0`

#### Send Requests

Return request of [axios](https://github.com/axios/axios).

- **sendUpdate({**[params](https://core.telegram.org/bots/api#update)**})**
- **sendMessage({**[params](https://core.telegram.org/bots/api#message)**})**
- **sendMessageWithText(text: String, {**[params](https://core.telegram.org/bots/api#message)**})**
- **sendInlineQuery(query: String, {**[params](https://core.telegram.org/bots/api#inlinequery)**})**
- **sendCallbackQuery({**[params](https://core.telegram.org/bots/api#callbackquery)**})**
- **sendCallbackQueryWithData(data: String, {**[params](https://core.telegram.org/bots/api#callbackquery)**})**

### Using with a Test Framework

You create a test suite with
[Mocha](https://mochajs.org) and [ExpectJS](https://github.com/Automattic/expect.js).

Example `test.js`:

```javascript
const expect = require('expect.js')
describe('bot', function() {
	it('/ping', async function() {
		var r = await test.sendMessageWithText('/ping')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('Pong!')
	})
})
```

Run with `$ mocha --exit --timeout 100000`

### Using Debug

Set environment variables `DEBUG=telgraf:test`.

## Dependencies

- [axios](https://ghub.io/axios): Promise based HTTP client for the browser and node.js
- [debug](https://ghub.io/debug): small debugging utility

## Dev Dependencies

- [telegraf](https://ghub.io/telegraf): 📡 Modern Telegram bot framework
- [mocha](https://ghub.io/mocha): simple, flexible, fun test framework

## License

MIT
