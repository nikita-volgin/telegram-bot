const { default: axios } = require('axios')

const app = require('express')(),
    bodyparser = require('body-parser')

const botToken = 'bot5671144029:AAEQ1QSnofMwGLJgnSO_MMBgodG7y52Os9M'
const port = process.env.PORT || 80

app.use(bodyparser.json())

app.listen(port, () => {
    console.log('bot is listening http://localhost:3000')
})

app.post('/', async (req, res) => {
    const chatId = req.body.message.chat.id
    const message = req.body.message.text

    await sendMessage(chatId, message)

    res.sendStatus(200)
})

async function sendMessage (chatId, message) {
    await axios.post(`https://api.telegram.org/${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message
    })
}