const Telegraf = require('telegraf')
const TelegrafTest = require('.')
const assert = require('assert')

const port = 3000
const secretPath = 'secret-path'

const bot = new Telegraf('ABCD:1234567890')
const test = new TelegrafTest({
	url: `http://127.0.0.1:${port}/${secretPath}`
})
test.startServer()

bot.hears(/ping/i, (ctx) => {
	ctx.reply('Pong!')
})

bot.on('inline_query', (ctx) => {
	ctx.answerInlineQuery([{
		type: 'article',
		title: 'TITLE',
		id: 'TEST',
		input_message_content: {
			message_text: 'TEST'
		}
	}], {
		cache_time: 0
	})
})

bot.on('callback_query', (ctx) => {
	ctx.answerCbQuery(
		'Test‼️',
		true
	)
})

bot.startWebhook(`/${secretPath}`, null, port)

describe('Telegraf Test', function() {
	it('setBot()', async function() {
		var bot = test.setBot({
			username: 'Tiagobot'
		})
		assert.equal(bot.username, 'Tiagobot')
	})

	it('setUser()', async function() {
		var user = test.setUser({
			id: 1234,
			username: '@Jack'
		})
		assert.equal(user.id, 1234)
		assert.equal(user.username, '@Jack')
	})

	it('setChat()', async function() {
		var chat = test.setChat({
			id: 6655465,
			type: 'supergroup'
		})
		assert.equal(chat.id, 6655465)
		assert.equal(chat.type, 'supergroup')
	})

	it('setMessage()', async function() {
		var message = test.setMessage({})
		assert.equal(message.message_id, 2)
		assert.equal(message.from.username, '@Jack')
	})

	it('setMessage()', async function() {
		var message = test.setMessage({})
		assert.equal(message.from.username, '@Jack')
	})

	it('setInlineQuery()', async function() {
		var inline = test.setInlineQuery({})
		assert.equal(inline.from.username, '@Jack')
	})

	it('setCallbackQuery()', async function() {
		var callback = test.setCallbackQuery({})
		assert.equal(callback.from.username, '@Jack')
	})

	it('setUpdateId()', async function() {
		var id = test.setUpdateId(6)
		assert.equal(id, 6)
	})

	it('setWebhook()', async function() {
		var webhook = test.setWebhook()
		assert.equal(webhook.url, test.webhook.url)
		assert.equal(webhook.allowed_updates.toString(), test.getAllowedUpdates().toString())
	})

	it('setAllowedUpdates()', async function() {
		var updatesType = test.setAllowedUpdates()
		assert.equal(updatesType.toString(), [
			'message',
			'channel_post',
			'edited_channel_post',
			'inline_query',
			'chosen_inline_result',
			'callback_query',
			'shipping_query',
			'pre_checkout_query'
		].toString())
	})

	it('getBot', async function() {
		assert.equal(test.getBot(), test.bot)
	})

	it('getUser', async function() {
		assert.equal(test.getUser(), test.user)
	})

	it('getChat', async function() {
		assert.equal(test.getChat(), test.chat)
	})

	it('getMessage', async function() {
		assert.equal(test.getMessage(), test.message)
	})

	it('getInlineQuery', async function() {
		assert.equal(test.getInlineQuery(), test.inline_query)
	})

	it('getCallbackQuery', async function() {
		assert.equal(test.getCallbackQuery(), test.callback_query)
	})

	it('getUpdateId', async function() {
		assert.equal(test.getUpdateId(), test.updateId)
	})

	it('getWebhook', async function() {
		assert.equal(test.getWebhook(), test.webhook)
	})

	it('getAllowedUpdates', async function() {
		assert.equal(test.getAllowedUpdates(), test.allowedUpdates)
	})

	it('sendUpdate()', async function() {
		var r = await test.sendUpdate({})
		assert.equal(r, false)
	})

	it('sendMessage()', async function() {
		var r = await test.sendMessage({
			text: '/ping'
		})
		assert.equal(r.data.text, 'Pong!')
	})

	it('sendMessageWithText()', async function() {
		var r = await test.sendMessageWithText('/ping')
		assert.equal(r.data.text, 'Pong!')
	})

	it('sendInlineQuery()', async function() {
		var r = await test.sendInlineQuery('hi!')
		assert.equal(r.data.method, 'answerInlineQuery')
		assert.equal(r.data.cache_time, 0)
	})

	it('sendCallbackQuery()', async function() {
		var r = await test.sendCallbackQueryWithData({
			data: 'test'
		})
		assert.equal(r.data.method, 'answerCallbackQuery')
		assert.equal(r.data.text, 'Test‼️')
	})

	it('sendCallbackQueryWithData()', async function() {
		var r = await test.sendCallbackQueryWithData('test')
		assert.equal(r.data.method, 'answerCallbackQuery')
		assert.equal(r.data.text, 'Test‼️')
	})
})
