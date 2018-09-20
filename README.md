# Telegraf Test

Telegraf Test - Simple Test Framework of Telegram Bots

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
	console.log('------')
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

**url** - String
> Webhook url of your bot.</br>
> Default value: `http://127.0.0.1:3000/secret-path`

### API

#### Set & Get Objects

- **setUser({**[params](https://https://core.telegram.org/bots/api)**})**

- **setChat({**[params](https://https://core.telegram.org/bots/api)**})**

- **setMessage({**[params](https://https://core.telegram.org/bots/api)**})**

- **setInlineQuery({**[params](https://https://core.telegram.org/bots/api)**})**

- **setCallbackQuery({**[params](https://https://core.telegram.org/bots/api)**})**

- **setUpdateId(id: Number)**
> Update id.</br>
> Default value: Start in `0`

#### Send Requests

Return request of [axios](https://github.com/axios/axios).

- **sendUpdate({**[params](https://https://core.telegram.org/bots/api)**})**
- **sendMessage({**[params](https://https://core.telegram.org/bots/api)**})**
- **sendMessageWithText(text: String, {**[params](https://https://core.telegram.org/bots/api)**})**
- **sendInlineQuery(query: String, {**[params](https://https://core.telegram.org/bots/api)**})**
- **sendCallbackQuery({**[params](https://https://core.telegram.org/bots/api)**})**
- **sendCallbackQueryWithData(data: String, {**[params](https://https://core.telegram.org/bots/api)**})**

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

Set environment variables `DEBUG=telgraf:test`

## Dependencies

- [axios](https://ghub.io/axios): Promise based HTTP client for the browser and node.js
- [debug](https://ghub.io/debug): small debugging utility

## Dev Dependencies

- [telegraf](https://ghub.io/telegraf): 📡 Modern Telegram bot framework
- [expect.js](https://ghub.io/expect.js): BDD style assertions for node and the browser.
- [mocha](https://ghub.io/mocha): simple, flexible, fun test framework

## License

MIT
