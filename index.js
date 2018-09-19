const axios = require('axios')

class TelegrafTest {
	constructor (options) {
		this.options = {
			url: 'http://127.0.0.1:3000/secret-path',
			...options
		}
		this.updateId = 0
		this.setUser({})
		this.setChat({})
		this.setMessage({})
		this.setInlineQuery({})
		this.setCallbackQuery({})
	}

	//set**
	setUser (user) {
		this.user = {
			id: 1234567890,
			is_bot: false,
			first_name: 'FIST-NAME',
			last_name: 'LAST-NAME',
			username: 'USERNAME',
			language_code: 'en-US',
			...user
		}
		return this.user
	}

	setChat (chat) {
		this.chat = {
			id: 89198119,
			type: 'private', // “private”, “group”, “supergroup” or “channel”
			title: 'TITLE',
			username: 'USERNAME',
			first_name: 'FIST-NAME',
			last_name: 'LAST-NAME',
			all_members_are_administrators: false,
			...chat
		}
		return this.chat
	}

	setMessage (message) {
		var message_id = 1
		if (this.message && this.message.message_id) {
			message_id = Math.floor(message_id) + 1
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
	}

	//send**
	sendUpdate (update) {
		this.updateId++
		return axios({
			method: 'POST',
			url: this.options.url,
			headers: {
				'content-type': 'application/json'
			},
			data: {
				update_id: this.updateId,
				...update
			}
		})
	}

	sendText (text, options) {
		var message = this.setMessage({
			text: text,
			...options
		})
		return this.sendUpdate({message: message})
	}

	sendMessage (options) {
		var message = this.setMessage({
			...options
		})
		return this.sendUpdate({message: message})
	}

	sendMessageWithText (text, options) {
		return this.sendText(text, options)
	}

	sendInlineQuery (text, options) {
		var inlineQuery = this.setInlineQuery({
			query: text,
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

	sendCallbackQueryWithData (text, options) {
		var callbackQuery = this.setCallbackQuery({
			data: text,
			message: this.message,
			...options
		})
		return this.sendUpdate({callback_query: callbackQuery})
	}

}

module.exports = TelegrafTest
