/* eslint-disable no-undef */
const assert = require('assert')
const Telegraf = require('telegraf')
const TelegrafTest = require('.')

const port = 3000
const secretPath = 'secret-path'

const bot = new Telegraf('ABCD:1234567890')
const test = new TelegrafTest({
	url: `http://127.0.0.1:${port}/${secretPath}`
})
test.startServer()

bot.hears(/ping/i, ctx => {
	ctx.reply('Pong!')
})

bot.on('inline_query', ctx => {
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

bot.on('callback_query', ctx => {
	ctx.answerCbQuery(
		'Test‼️',
		true
	)
})

bot.startWebhook(`/${secretPath}`, null, port)

describe('Telegraf Test', () => {
	it('setBot()', async () => {
		const bot = test.setBot({
			username: 'Tiagobot'
		})
		assert.strictEqual(bot.username, 'Tiagobot')
	})

	it('setUser()', async () => {
		const user = test.setUser({
			id: 1234,
			username: '@Jack'
		})
		assert.strictEqual(user.id, 1234)
		assert.strictEqual(user.username, '@Jack')
	})

	it('setChat()', async () => {
		const chat = test.setChat({
			id: 6655465,
			type: 'supergroup'
		})
		assert.strictEqual(chat.id, 6655465)
		assert.strictEqual(chat.type, 'supergroup')
	})

	it('setMessage()', async () => {
		const message = test.setMessage({})
		assert.strictEqual(message.message_id, 2)
		assert.strictEqual(message.from.username, '@Jack')
	})

	it('setMessage()', async () => {
		const message = test.setMessage({})
		assert.strictEqual(message.from.username, '@Jack')
	})

	it('setInlineQuery()', async () => {
		const inline = test.setInlineQuery({})
		assert.strictEqual(inline.from.username, '@Jack')
	})

	it('setCallbackQuery()', async () => {
		const callback = test.setCallbackQuery({})
		assert.strictEqual(callback.from.username, '@Jack')
	})

	it('setUpdateId()', async () => {
		const id = test.setUpdateId(6)
		assert.strictEqual(id, 6)
	})

	it('setWebhook()', async () => {
		const webhook = test.setWebhook()
		assert.strictEqual(webhook.url, test.webhook.url)
		assert.strictEqual(webhook.allowed_updates.toString(), test.getAllowedUpdates().toString())
	})

	it('setAllowedUpdates()', async () => {
		const updatesType = test.setAllowedUpdates()
		assert.strictEqual(updatesType.toString(), [
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

	it('getBot', async () => {
		assert.strictEqual(test.getBot(), test.bot)
	})

	it('getUser', async () => {
		assert.strictEqual(test.getUser(), test.user)
	})

	it('getChat', async () => {
		assert.strictEqual(test.getChat(), test.chat)
	})

	it('getMessage', async () => {
		assert.strictEqual(test.getMessage(), test.message)
	})

	it('getInlineQuery', async () => {
		assert.strictEqual(test.getInlineQuery(), test.inline_query)
	})

	it('getCallbackQuery', async () => {
		assert.strictEqual(test.getCallbackQuery(), test.callback_query)
	})

	it('getUpdateId', async () => {
		assert.strictEqual(test.getUpdateId(), test.updateId)
	})

	it('getWebhook', async () => {
		assert.strictEqual(test.getWebhook(), test.webhook)
	})

	it('getAllowedUpdates', async () => {
		assert.strictEqual(test.getAllowedUpdates(), test.allowedUpdates)
	})

	it('sendUpdate()', async () => {
		const r = await test.sendUpdate({})
		assert.strictEqual(r, false)
	})

	it('sendMessage()', async () => {
		const r = await test.sendMessage({
			text: '/ping'
		})
		assert.strictEqual(r.data.text, 'Pong!')
	})

	it('sendMessageWithText()', async () => {
		const r = await test.sendMessageWithText('/ping')
		assert.strictEqual(r.data.text, 'Pong!')
	})

	it('sendInlineQuery()', async () => {
		const r = await test.sendInlineQuery('hi!')
		assert.strictEqual(r.data.method, 'answerInlineQuery')
		assert.strictEqual(r.data.cache_time, 0)
	})

	it('sendCallbackQuery()', async () => {
		const r = await test.sendCallbackQueryWithData({
			data: 'test'
		})
		assert.strictEqual(r.data.method, 'answerCallbackQuery')
		assert.strictEqual(r.data.text, 'Test‼️')
	})

	it('sendCallbackQueryWithData()', async () => {
		const r = await test.sendCallbackQueryWithData('test')
		assert.strictEqual(r.data.method, 'answerCallbackQuery')
		assert.strictEqual(r.data.text, 'Test‼️')
	})
})
