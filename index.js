class TelegrafTest {
	constructor (options) {
		this.options = {
			host: 'http://127.0.0.1:3000/secret-path',
			...options
		}
	}

	setUser (user) {
		this.user = {
			id: 0123456789,
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
		this.message = {
			message_id: message_id
			date: `${+ new Date()}`
		}
		return this.message
	}

	sendUpdate () {
		//setMessage()
		return
	}

	sendUpdateText () {
		return sendUpdate()
	}

	sendUpdateInline () {
		return sendUpdate()
	}

	sendUpdateCallback () {
		return sendUpdate()
	}

}

module.exports = TelegrafTest
