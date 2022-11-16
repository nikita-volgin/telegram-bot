const axios = require('axios')

const app = require('express')(),
    bodyparser = require('body-parser')

const botToken = 'bot5671144029:AAEQ1QSnofMwGLJgnSO_MMBgodG7y52Os9M'

app.use(bodyparser.json())

app.listen(process.env.PORT || 8080, () => {
    console.log('bot is listening')
})

app.post('/', async (req, res) => {
    const chatId = req.body.message.chat.id
    const message = req.body.message.text

    console.log({chatId, message});

    await sendMessage(chatId, message)

    res.sendStatus(200)
})

async function sendMessage (chatId, message) {
    await axios.post(`https://api.telegram.org/${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message
    })
}