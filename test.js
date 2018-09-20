const Telegraf = require('telegraf')
const TelegrafTest = require('.')
const assert = require('assert')

const port = 3000
const secretPath = 'secret-path'

const bot = new Telegraf('ABCD:1234567890')
const test = new TelegrafTest({
	url: `http://127.0.0.1:${port}/${secretPath}`
})

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

	it('sendUpdate()', async function() {
		var r = await test.sendUpdate({})
		assert.equal(r.data, '')
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
