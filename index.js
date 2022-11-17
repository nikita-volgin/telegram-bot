const axios = require('axios')

const app = require('express')(),
    bodyparser = require('body-parser')

const botToken = 'bot5671144029:AAEQ1QSnofMwGLJgnSO_MMBgodG7y52Os9M'

app.use(bodyparser.json())

app.post('/', async (req, res) => {
    const body = req.body
    const chatId = body.message ? body.message.chat.id : body.edited_message.chat.id

    if (body.poll) {
        await sendMessage(chatId, "i don't know what to do with this information")
        res.sendStatus(200)
    }
    
    const message = body.edited_message ? `this is a joke? why did u changed the message to "${body.edited_message.text}"` : 
        body.message.sticker ? `sticker ${body.message.sticker.emoji}` :
        body.message.voice ? "voice messages" :
        body.message.text.toLowerCase().trim()

    if (body.edited_message) {

        await sendMessage(chatId, message)

    } else if (message === '/start') {

        await sendMessage(chatId, 'welcome to the club, buddy')

    } else if (message === '/help') {

        await sendMessage(chatId, "you can use one of this commands:\n/poll-question-...options(separated by spaces)-anon(if you need anonymous poll) - create poll\nthat's all")

    } else if (message.indexOf('/poll') === 0) {

        const array = message.split('-')
        array.shift()

        if (array.length > 3) {
            await sendMessage(chatId, 'something went wrong')
        } else {

            const question = array.shift()
            const anon = array.includes('anon')

            if (anon) array.pop()

            await sendPoll(chatId, question, array, anon)

        }

    } else {
        await sendMessage(chatId, `i don't know what u need, fuck to your "${message}", have a nice day`)
    }

    res.sendStatus(200)
})

async function sendMessage(chatId, message) {
    await axios.post(`https://api.telegram.org/${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message,
    })
}

async function sendPoll(chatId, question, options, is_anonymous) {
    await axios.post(`https://api.telegram.org/${botToken}/sendPoll`, {
        chat_id: chatId,
        question,
        options,
        is_anonymous,
        parse_mode: 'HTML'
    })
}

app.listen(process.env.PORT || 8080, () => {
    console.log('bot is listening')
})