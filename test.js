const Telegraf = require('telegraf')
const TelegrafTest = require('.')
const expect = require('expect.js')

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
})

bot.hears(/ping/i, (ctx) => {
	console.log('------')
	ctx.reply('Pong!')
})

bot.startWebhook(`/${secretPath}`, null, port)

describe('Telegraf Test', function() {
	it('/ping', async function() {
		var r = await test.sendMessageWithText('/ping')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('Pong!')
	})
})
