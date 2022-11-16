const { default: axios } = require('axios')

const app = require('express')(),
    bodyparser = require('body-parser')

const botToken = 'bot5671144029:AAEQ1QSnofMwGLJgnSO_MMBgodG7y52Os9M'

app.use(bodyparser.json())

app.listen(3000, () => {
    console.log('bot is listening http://localhost:3000')
})

app.post('/', async (req, res) => {
    await sendMessage(791669874, 'hello, world')

    res.sendStatus(200)
})

async function sendMessage (chatId, text) {
    await axios.post(`https://api.telegram.org/${botToken}/sendMessage`, {
        chatId,
        text
    })
}