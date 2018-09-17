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
	}

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
			date: `${+ new Date()}`,
			...message
		}
		return this.message
	}

	setUpdateId (id) {
		this.updateId = Math.floor(id)
	}

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

	sendUpdateText (text, options) {
		var message = this.setMessage({
			from: this.user,
			chat: this.chat,
			text: text,
			...options
		})
		return this.sendUpdate({message: message})
	}

	//TODO: Add sendUpdateInline
	sendUpdateInline () {
		return sendUpdate()
	}

	//TODO: Add sendUpdateCallback
	sendUpdateCallback () {
		return sendUpdate()
	}

}

module.exports = TelegrafTest
