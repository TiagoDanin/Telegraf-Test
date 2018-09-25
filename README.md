# Telegraf Test [![Codacy Badge](https://api.codacy.com/project/badge/Grade/626063315da84c0fa65f020a864774c4)](https://www.codacy.com/app/tiagodanin/Telegraf-Test?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=TiagoDanin/Telegraf-Test&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/TiagoDanin/Telegraf-Test.svg?branch=master)](https://travis-ci.org/TiagoDanin/Telegraf-Test) [![Known Vulnerabilities](https://snyk.io/test/github/TiagoDanin/Telegraf-Test/badge.svg?targetFile=package.json)](https://snyk.io/test/github/TiagoDanin/Telegraf-Test?targetFile=package.json)

Telegraf Test - Simple Test ToolKit of Telegram Bots

## Features

- Telegram bot api server emulator.
- Compatible with [Telegraf](http://telegraf.js.org) <3.
- Compatible with test framework.
- Send message, inline query and callback query.
- Work in local network.

## Installation

This is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/). It can be installed using the
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) command line tools.

```sh
npm install telegraf-test --save
```

## How to Use

### Example

```javascript
const Telegraf = require('telegraf')
const TelegrafTest = require('telegraf-test')

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
}) /*return {
	id: 1234,
	is_bot: false,
	first_name: 'FIST-NAME',
	last_name: '',
	username: '@Jack',
	language_code: 'en-US'
}*/

bot.hears(/ping/i, (ctx) => {
	ctx.reply('Pong!')
})

bot.startWebhook(`/${secretPath}`, null, port)

test.sendMessageWithText('/ping')
	.then((res) => {
		console.log(res.data)
		//return { method: 'sendMessage', chat_id: 1234567890, text: 'Pong!' }
	})
	.catch((err) => {
		console.error(err)
	})

```

### Options of Class `TelegrafTest({options})`

- **url** - String
> Webhook url of your bot.</br>
> Default value: `http://127.0.0.1:3000/secret-path`
- **axios** - Object
> Config/option of Axios.</br>
> Default value: `{headers: {'content-type': 'application/json'}, method: 'POST'}`
- **port** - Number
> Server emulator port.</br>
> Default value: `2000`
- **token** - String
> Bot token.</br>
> Default value: `ABCD:1234567890`

### API

#### Set & Get Objects

- **setBot({**[params](https://core.telegram.org/bots/api#user)**})**
- **setUser({**[params](https://core.telegram.org/bots/api#user)**})**
- **setChat({**[params](https://core.telegram.org/bots/api#chat)**})**
- **setMessage({**[params](https://core.telegram.org/bots/api#message)**})**
- **setInlineQuery({**[params](https://core.telegram.org/bots/api#inlinequery)**})**
- **setCallbackQuery({**[params](https://core.telegram.org/bots/api#callbackquery)**})**
- **setUpdateId(id: Number)**
> Update id.</br>
> Default value: Start in `0`

### Get Objects

- **getUser()**
- **getChat()**
- **getMessage()**
- **getInlineQuery()**
- **getCallbackQuery()**
- **getUpdateId()**

#### Send Requests

Return request of [axios](https://github.com/axios/axios).

- **sendUpdate({**[params](https://core.telegram.org/bots/api#update)**})**
- **sendMessage({**[params](https://core.telegram.org/bots/api#message)**})**
- **sendMessageWithText(text: String, {**[params](https://core.telegram.org/bots/api#message)**})**
- **sendInlineQuery(query: String, {**[params](https://core.telegram.org/bots/api#inlinequery)**})**
- **sendCallbackQuery({**[params](https://core.telegram.org/bots/api#callbackquery)**})**
- **sendCallbackQueryWithData(data: String, {**[params](https://core.telegram.org/bots/api#callbackquery)**})**

#### [WIP] Web Server

Telegram Bot Api Server Emulator. Start with `startServer()`.

- [ ] [getMe](https://core.telegram.org/bots/api#getme)

<!--
- [ ] [getMe](https://core.telegram.org/bots/api#getme)
- [ ] [getUpdates](https://core.telegram.org/bots/api#getupdates)
- [ ] [setWebhook](https://core.telegram.org/bots/api#setwebhook)
- [ ] [sendMessage](https://core.telegram.org/bots/api#sendmessage)
- [ ] [forwardMessage](https://core.telegram.org/bots/api#forwardmessage)
- [ ] [sendPhoto](https://core.telegram.org/bots/api#sendphoto)
- [ ] [sendAudio](https://core.telegram.org/bots/api#sendaudio)
- [ ] [sendDocument](https://core.telegram.org/bots/api#senddocument)
- [ ] [sendVideo](https://core.telegram.org/bots/api#sendvideo)
- [ ] [sendVoice](https://core.telegram.org/bots/api#sendvoice)
- [ ] [sendVideoNote](https://core.telegram.org/bots/api#sendvideonote)
- [ ] [sendMediaGroup](https://core.telegram.org/bots/api#sendmediagroup)
- [ ] [sendLocation](https://core.telegram.org/bots/api#sendlocation)
- [ ] [editMessageLiveLocation](https://core.telegram.org/bots/api#editmessagelivelocation)
- [ ] [stopMessageLiveLocation](https://core.telegram.org/bots/api#stopmessagelivelocation)
- [ ] [sendVenue](https://core.telegram.org/bots/api#sendvenue)
- [ ] [sendContact](https://core.telegram.org/bots/api#sendcontact)
- [ ] [getUserProfilePhotos](https://core.telegram.org/bots/api#getuserprofilephotos)
- [ ] [getFile](https://core.telegram.org/bots/api#getfile)
- [ ] [kickChatMember](https://core.telegram.org/bots/api#kickchatmember)
- [ ] [unbanChatMember](https://core.telegram.org/bots/api#unbanchatmember)
- [ ] [restrictChatMember](https://core.telegram.org/bots/api#restrictchatmember)
- [ ] [promoteChatMember](https://core.telegram.org/bots/api#promotechatmember)
- [ ] [exportChatInviteLink](https://core.telegram.org/bots/api#exportchatinvitelink)
- [ ] [setChatPhoto](https://core.telegram.org/bots/api#setchatphoto)
- [ ] [deleteChatPhoto](https://core.telegram.org/bots/api#deletechatphoto)
- [ ] [setChatTitle](https://core.telegram.org/bots/api#setchattitle)
- [ ] [setChatDescription](https://core.telegram.org/bots/api#setchatdescription)
- [ ] [pinChatMessage](https://core.telegram.org/bots/api#pinchatmessage)
- [ ] [unpinChatMessage](https://core.telegram.org/bots/api#unpinchatmessage)
- [ ] [leaveChat](https://core.telegram.org/bots/api#leavechat)
- [ ] [getChat](https://core.telegram.org/bots/api#getchat)
- [ ] [getChatAdministrators](https://core.telegram.org/bots/api#getchatadministrators)
- [ ] [getChatMembersCount](https://core.telegram.org/bots/api#getchatmemberscount)
- [ ] [getChatMember](https://core.telegram.org/bots/api#getchatmember)
- [ ] [setChatStickerSet](https://core.telegram.org/bots/api#setchatstickerset)
- [ ] [deleteChatStickerSet](https://core.telegram.org/bots/api#deletechatstickerset)
- [ ] [answerCallbackQuery](https://core.telegram.org/bots/api#answercallbackquery)
- [ ] [editMessageText](https://core.telegram.org/bots/api#editmessagetext)
- [ ] [editMessageCaption](https://core.telegram.org/bots/api#editmessagecaption)
- [ ] [editMessageReplyMarkup](https://core.telegram.org/bots/api#editmessagereplymarkup)
- [ ] [deleteMessage](https://core.telegram.org/bots/api#deletemessage)
- [ ] [sendSticker](https://core.telegram.org/bots/api#sendsticker)
- [ ] [getStickerSet](https://core.telegram.org/bots/api#getstickerset)
- [ ] [uploadStickerFile](https://core.telegram.org/bots/api#uploadstickerfile)
- [ ] [createNewStickerSet](https://core.telegram.org/bots/api#createnewstickerset)
- [ ] [addStickerToSet](https://core.telegram.org/bots/api#addstickertoset)
- [ ] [setStickerPositionInSet](https://core.telegram.org/bots/api#setstickerpositioninset)
- [ ] [deleteStickerFromSet](https://core.telegram.org/bots/api#deletestickerfromset)
- [ ] [answerInlineQuery](https://core.telegram.org/bots/api#answerinlinequery)
- [ ] [sendInvoice](https://core.telegram.org/bots/api#sendinvoice)
- [ ] [answerShippingQuery](https://core.telegram.org/bots/api#answershippingquery)
- [ ] [answerPreCheckoutQuery](https://core.telegram.org/bots/api#answerprecheckoutquery)
- [ ] [sendGame](https://core.telegram.org/bots/api#sendgame)
- [ ] [setGameScore](https://core.telegram.org/bots/api#setgamescore)
- [ ] [getGameHighScores](https://core.telegram.org/bots/api#getgamehighscores)
-->

### Using with a Test Framework

You create a test suite with
[Mocha](https://mochajs.org) and [ExpectJS](https://github.com/Automattic/expect.js).

Example `test.js`:

```javascript
const expect = require('expect.js')
describe('bot', function() {
	it('/ping', async function() {
		var r = await test.sendMessageWithText('/ping')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('Pong!')
	})
})
```

Run with `$ mocha --exit --timeout 100000`

### Using Debug

Set environment variables `DEBUG=telgraf:test`.

## Dependencies

- [axios](https://ghub.io/axios): Promise based HTTP client for the browser and node.js
- [debug](https://ghub.io/debug): small debugging utility

## Dev Dependencies

- [telegraf](https://ghub.io/telegraf): 📡 Modern Telegram bot framework
- [mocha](https://ghub.io/mocha): simple, flexible, fun test framework

## License

MIT
