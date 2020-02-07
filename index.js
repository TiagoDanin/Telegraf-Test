const axios = require('axios')
const debug = require('debug')
const express = require('express')

const log = debug('telegraf:test')

class TelegrafTest {
	constructor(options) {
		this.options = {
			url: 'http://127.0.0.1:3000/secret-path',
			axios: {},
			port: 2000,
			token: 'ABCD:1234567890',
			...options
		}
		this.updateId = 0
		this.setBot({})
		this.setUser({})
		this.setChat({})
		this.setMessage({})
		this.setInlineQuery({})
		this.setCallbackQuery({})
		this.setAllowedUpdates()
		this.setWebhook({
			url: this.options.url
		})
		this.server = express()
	}

	// Methods start in set**
	setBot(bot) {
		this.bot = {
			id: 1234,
			is_bot: true,
			first_name: 'BOT',
			username: 'bot',
			...this.bot,
			...bot
		}
		log('New bot', this.bot)
		return this.bot
	}

	setUser(user) {
		this.user = {
			id: 1234567890,
			is_bot: false,
			first_name: 'FIST-NAME',
			last_name: '',
			username: 'USERNAME',
			language_code: 'en-US',
			...this.user,
			...user
		}
		log('New user', this.user)
		return this.user
	}

	setChat(chat) {
		this.chat = {
			id: 1234567890,
			type: 'private', // “private”, “group”, “supergroup” or “channel”
			title: 'TITLE',
			username: 'USERNAME',
			first_name: 'FIST-NAME',
			last_name: 'LAST-NAME',
			all_members_are_administrators: false,
			...this.chat,
			...chat
		}
		log('New chat', this.chat)
		return this.chat
	}

	setMessage(message) {
		let message_id = 1
		if (this.message && this.message.message_id) {
			message_id = Math.floor(this.message.message_id) + 1
		}

		// TODO: Add entities
		this.message = {
			message_id,
			from: this.user,
			chat: this.chat,
			date: `${Number(new Date())}`,
			...message
		}
		return this.message
	}

	setInlineQuery(inlineQuery) {
		let id = 1
		if (this.inline_query && this.inline_query.id) {
			id = Math.floor(id) + 1
		}

		this.inline_query = {
			id,
			from: this.user,
			query: '',
			offset: '',
			...inlineQuery
		}
		return this.inline_query
	}

	setCallbackQuery(callbackQuery) {
		let id = 1
		if (this.callback_query && this.callback_query.id) {
			id = Math.floor(id) + 1
		}

		this.callback_query = {
			id,
			from: this.user,
			...callbackQuery
		}
		return this.callback_query
	}

	setUpdateId(id) {
		this.updateId = Math.floor(id)
		log('New update id', this.updateId)
		return this.updateId
	}

	setWebhook(webhook) {
		this.webhook = {
			url: '',
			has_custom_certificate: false,
			pending_update_count: 0,
			last_error_date: `${Number(new Date())}`,
			last_error_message: 'Init Telegraf Test',
			max_connections: 40,
			allowed_updates: [
				...this.allowedUpdates
			],
			...this.webhook,
			...webhook
		}
		log('New webhook info', this.webhook)
		return this.webhook
	}

	setAllowedUpdates(updates) {
		this.allowedUpdates = [
			'message',
			'channel_post',
			'edited_channel_post',
			'inline_query',
			'chosen_inline_result',
			'callback_query',
			'shipping_query',
			'pre_checkout_query'
		]
		if (updates) {
			this.allowedUpdates = updates
		}

		log('New allowedUpdates', this.allowedUpdates)
		return this.allowedUpdates
	}

	// Methods start in get**
	getBot() {
		return this.bot
	}

	getUser() {
		return this.user
	}

	getChat() {
		return this.chat
	}

	getMessage() {
		return this.message
	}

	getInlineQuery() {
		return this.inline_query
	}

	getCallbackQuery() {
		return this.callback_query
	}

	getUpdateId() {
		return this.updateId
	}

	getWebhook() {
		return this.webhook
	}

	getAllowedUpdates() {
		return this.allowedUpdates
	}

	// Methods start in send**
	sendUpdate(update) {
		this.updateId++
		let ignored = true
		for (const updateType of this.allowedUpdates) {
			if (update[updateType]) {
				ignored = false
			}
		}

		if (ignored) {
			log('Update ignored (check getAllowedUpdates()) ', {
				update_id: this.updateId,
				...update
			})
			return false
		}

		log('Send via WebHook ', {
			update_id: this.updateId,
			...update
		})
		return axios({
			method: 'POST',
			url: this.options.url,
			headers: {
				'content-type': 'application/json'
			},
			data: {
				update_id: this.updateId,
				...update
			},
			...this.options.axios
		})
	}

	sendMessage(options) {
		const message = this.setMessage({
			...options
		})
		return this.sendUpdate({message})
	}

	sendMessageWithText(text, options) {
		const message = this.setMessage({
			text,
			...options
		})
		return this.sendUpdate({message})
	}

	sendInlineQuery(query, options) {
		const inlineQuery = this.setInlineQuery({
			query,
			...options
		})
		return this.sendUpdate({inline_query: inlineQuery})
	}

	sendCallbackQuery(options) {
		const callbackQuery = this.setCallbackQuery({
			...options
		})
		return this.sendUpdate({callback_query: callbackQuery})
	}

	sendCallbackQueryWithData(data, options) {
		const callbackQuery = this.setCallbackQuery({
			data,
			message: this.message,
			...options
		})
		return this.sendUpdate({callback_query: callbackQuery})
	}

	startServer() {
		const index = `
Hello World!</br>
Web server of Telegraf Test by Tiago Danin</br>
https://github.com/TiagoDanin/Telegraf-Test
		`

		this.server.get('/', (req, res) => {
			res.send(index)
		})

		this.server.post('/', (req, res) => {
			res.send(index)
		})

		const methods = {
			getMe: () => {
				return {
					ok: true,
					result: {
						...this.bot
					}
				}
			},
			setWebhook: query => {
				const output = {
					ok: true,
					result: true,
					description: 'Webhook is already deleted'
				}
				if (query.length >= 1) {
					this.setWebhook(query)
					output.description = 'Webhook was set'
				} else if (this.webhook.url !== '') {
					output.description = 'Webhook was deleted'
					this.setWebhook({
						url: ''
					})
				}

				return output
			},
			deleteWebhook: () => {
				this.setWebhook({
					url: ''
				})
				return {
					ok: true,
					result: true,
					description: 'Webhook was deleted'
				}
			},
			getWebhookInfo: () => {
				return {
					ok: true,
					result: {
						...this.webhook
					}
				}
			}
			/*
			GetUpdates: (query) => {
				return JSON.stringify()
			},
			sendMessage: (query) => {
				return JSON.stringify()
			},
			forwardMessage: (query) => {
				return JSON.stringify()
			},
			sendPhoto: (query) => {
				return JSON.stringify()
			},
			sendAudio: (query) => {
				return JSON.stringify()
			},
			sendDocument: (query) => {
				return JSON.stringify()
			},
			sendVideo: (query) => {
				return JSON.stringify()
			},
			sendVoice: (query) => {
				return JSON.stringify()
			},
			sendVideoNote: (query) => {
				return JSON.stringify()
			},
			sendMediaGroup: (query) => {
				return JSON.stringify()
			},
			sendLocation: (query) => {
				return JSON.stringify()
			},
			editMessageLiveLocation: (query) => {
				return JSON.stringify()
			},
			stopMessageLiveLocation: (query) => {
				return JSON.stringify()
			},
			sendVenue: (query) => {
				return JSON.stringify()
			},
			sendContact: (query) => {
				return JSON.stringify()
			},
			getUserProfilePhotos: (query) => {
				return JSON.stringify()
			},
			getFile: (query) => {
				return JSON.stringify()
			},
			kickChatMember: (query) => {
				return JSON.stringify()
			},
			unbanChatMember: (query) => {
				return JSON.stringify()
			},
			restrictChatMember: (query) => {
				return JSON.stringify()
			},
			promoteChatMember: (query) => {
				return JSON.stringify()
			},
			exportChatInviteLink: (query) => {
				return JSON.stringify()
			},
			setChatPhoto: (query) => {
				return JSON.stringify()
			},
			deleteChatPhoto: (query) => {
				return JSON.stringify()
			},
			setChatTitle: (query) => {
				return JSON.stringify()
			},
			setChatDescription: (query) => {
				return JSON.stringify()
			},
			pinChatMessage: (query) => {
				return JSON.stringify()
			},
			unpinChatMessage: (query) => {
				return JSON.stringify()
			},
			leaveChat: (query) => {
				return JSON.stringify()
			},
			getChat: (query) => {
				return JSON.stringify()
			},
			getChatAdministrators: (query) => {
				return JSON.stringify()
			},
			getChatMembersCount: (query) => {
				return JSON.stringify()
			},
			getChatMember: (query) => {
				return JSON.stringify()
			},
			setChatStickerSet: (query) => {
				return JSON.stringify()
			},
			deleteChatStickerSet: (query) => {
				return JSON.stringify()
			},
			answerCallbackQuery: (query) => {
				return JSON.stringify()
			},
			editMessageText: (query) => {
				return JSON.stringify()
			},
			editMessageCaption: (query) => {
				return JSON.stringify()
			},
			editMessageReplyMarkup: (query) => {
				return JSON.stringify()
			},
			deleteMessage: (query) => {
				return JSON.stringify()
			},
			sendSticker: (query) => {
				return JSON.stringify()
			},
			getStickerSet: (query) => {
				return JSON.stringify()
			},
			uploadStickerFile: (query) => {
				return JSON.stringify()
			},
			createNewStickerSet: (query) => {
				return JSON.stringify()
			},
			addStickerToSet: (query) => {
				return JSON.stringify()
			},
			setStickerPositionInSet: (query) => {
				return JSON.stringify()
			},
			deleteStickerFromSet: (query) => {
				return JSON.stringify()
			},
			answerInlineQuery: (query) => {
				return JSON.stringify()
			},
			sendInvoice: (query) => {
				return JSON.stringify()
			},
			answerShippingQuery: (query) => {
				return JSON.stringify()
			},
			answerPreCheckoutQuery: (query) => {
				return JSON.stringify()
			},
			sendGame: (query) => {
				return JSON.stringify()
			},
			setGameScore: (query) => {
				return JSON.stringify()
			},
			getGameHighScores: (query) => {
				return JSON.stringify()
			}
			*/
		}

		const handleRequest = (req, res) => {
			if (req.params.token !== this.options.token) {
				return res.json({
					ok: false,
					error_code: 401,
					description: 'Unauthorized'
				})
			}

			if (methods[req.params.method]) {
				return res.json(methods[req.params.method](req.query))
			}

			return res.json({
				ok: false,
				error_code: 401,
				description: 'Not Found: method not found in Telegraf Test'
			})
		}

		this.server.get('/bot:token/:method', handleRequest)
		this.server.post('/bot:token/:method', handleRequest)

		return this.server.listen(this.options.port, () => {
			log('Telegraf Test Server runnig in port: ', this.options.port)
		})
	}
}

module.exports = TelegrafTest
