const axios = require('axios')

const app = require('express')(),
    bodyparser = require('body-parser')

const botToken = 'bot5671144029:AAEQ1QSnofMwGLJgnSO_MMBgodG7y52Os9M'

app.use(bodyparser.json())

app.post('/', async (req, res) => {
    //const chatId = req.body.message ? req.body.message.chat.id : '791669874'

    const chatId = '791669874'

    console.log(req.body.edited_message)

    const message = JSON.parse(req.body.edited_message)

    await sendMessage(chatId, message)

    // const message = req.body.message.sticker ? `sticker ${req.body.message.sticker.emoji}` :
    //     req.body.message.voice ? "voice messages" :
    //     req.body.message.text.toLowerCase()

    // if (message === '/start') {
    //     await sendMessage(chatId, 'welcome to the club, buddy')
    // } else if (message === 'hi') {
    //     await sendMessage(chatId, 'wassup, man')
    // } else if (message === 'hello') {
    //     await sendMessage(chatId, 'oh, so official')
    // } else {
    //     await sendMessage(chatId, `i don't know what u need, fuck to your '${message}', have a nice day`)
    // }

    res.sendStatus(200)
})

async function sendMessage (chatId, message) {
    await axios.post(`https://api.telegram.org/${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message
    })
}

app.listen(process.env.PORT || 8080, () => {
    console.log('bot is listening')
})