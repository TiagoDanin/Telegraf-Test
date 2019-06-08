const Telegraf = require('telegraf')
const TelegrafTest = require('.')

const port = 3000
const secretPath = 'secret-path'

const bot = new Telegraf('ABCD:1234567890')
const test = new TelegrafTest({
	url: `http://127.0.0.1:${port}/${secretPath}`
})

test.setUser({
	id: 1234,
	username: '@TiagoEDGE'
	// ...//
}) /* Return {
	id: 1234,
	is_bot: false,
	first_name: 'FIST-NAME',
	last_name: '',
	username: '@TiagoEDGE',
	language_code: 'en-US'
} */

bot.hears(/ping/i, ctx => {
	ctx.reply('Pong!')
})

bot.startWebhook(`/${secretPath}`, null, port)

test.sendMessageWithText('/ping')
	.then(res => {
		console.log(res.data)
		// { method: 'sendMessage', chat_id: 1234567890, text: 'Pong!' }
	})
	.catch(error => {
		console.error(error)
	})
