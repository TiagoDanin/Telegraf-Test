const axios = require('axios')
const debug = require('debug')
const express = require('express')

const log = debug('telegraf:test')

class TelegrafTest {
	constructor (options) {
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
		this.server = express()
	}

	//Methods start in set**
	setBot (bot) {
		this.bot = {
			id: 1234,
			is_bot: true,
			first_name: 'BOT',
			username: '@bot',
			...bot
		}
		log('New bot', this.bot)
		return this.bot
	}

	setUser (user) {
		this.user = {
			id: 1234567890,
			is_bot: false,
			first_name: 'FIST-NAME',
			last_name: '',
			username: 'USERNAME',
			language_code: 'en-US',
			...user
		}
		log('New user', this.user)
		return this.user
	}

	setChat (chat) {
		this.chat = {
			id: 1234567890,
			type: 'private', // “private”, “group”, “supergroup” or “channel”
			title: 'TITLE',
			username: 'USERNAME',
			first_name: 'FIST-NAME',
			last_name: 'LAST-NAME',
			all_members_are_administrators: false,
			...chat
		}
		log('New chat', this.chat)
		return this.chat
	}

	setMessage (message) {
		var message_id = 1
		if (this.message && this.message.message_id) {
			message_id = Math.floor(this.message.message_id) + 1
		}
		//TODO: Add entities
		this.message = {
			message_id: message_id,
			from: this.user,
			chat: this.chat,
			date: `${+ new Date()}`,
			...message
		}
		return this.message
	}

	setInlineQuery (inlineQuery) {
		var id = 1
		if (this.inline_query && this.inline_query.id) {
			id = Math.floor(id) + 1
		}
		this.inline_query = {
			id: id,
			from: this.user,
			query: '',
			offset: '',
			...inlineQuery
		}
		return this.inline_query
	}

	setCallbackQuery (callbackQuery) {
		var id = 1
		if (this.callback_query && this.callback_query.id) {
			id = Math.floor(id) + 1
		}
		this.callback_query = {
			id: id,
			from: this.user,
			...callbackQuery
		}
		return this.callback_query
	}

	setUpdateId (id) {
		this.updateId = Math.floor(id)
		log('New update id', this.updateId)
		return this.updateId
	}

	//Methods start in get**
	getBot () {
		return this.bot
	}

	getUser () {
		return this.user
	}

	getChat () {
		return this.chat
	}

	getMessage () {
		return this.message
	}

	getInlineQuery () {
		return this.inline_query
	}

	getCallbackQuery () {
		return this.callback_query
	}

	getUpdateId () {
		return this.updateId
	}

	//Methods start in send**
	sendUpdate (update) {
		this.updateId++
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

	sendMessage (options) {
		var message = this.setMessage({
			...options
		})
		return this.sendUpdate({message: message})
	}

	sendMessageWithText (text, options) {
		var message = this.setMessage({
			text: text,
			...options
		})
		return this.sendUpdate({message: message})
	}

	sendInlineQuery (query, options) {
		var inlineQuery = this.setInlineQuery({
			query: query,
			...options
		})
		return this.sendUpdate({inline_query: inlineQuery})
	}

	sendCallbackQuery (options) {
		var callbackQuery = this.setCallbackQuery({
			...options
		})
		return this.sendUpdate({callback_query: callbackQuery})
	}

	sendCallbackQueryWithData (data, options) {
		var callbackQuery = this.setCallbackQuery({
			data: data,
			message: this.message,
			...options
		})
		return this.sendUpdate({callback_query: callbackQuery})
	}

	startServer () {
		this.server.get('/', (req, res) => {
			var index = `
Hello World!</br>
Web server of Telegraf Test by Tiago Danin</br>
https://github.com/TiagoDanin/Telegraf-Test
			`
			res.send(index)
		})

		var methods = {
			getMe: (query) => {
				return JSON.stringify(this.bot)
			}
			/*
			getUpdates: (query) => {
				return JSON.stringify()
			},
			setWebhook: (query) => {
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

		this.server.get('/bot:token/:method', (req, res) => {
			if (req.params.token != this.options.token) {
				return res.send('{}') //TODO: Return invalid token
			}
			if (req.method == 'GET' && methods[req.params.method]) {
				return res.send(methods[req.params.method](req.query))
			} else {
				return res.send('{}')
			}
		})

		this.server.listen(this.options.port, () => {
			log('Telegraf Test Server runnig in port: ', this.options.port)
		})
	}

}

module.exports = TelegrafTest
