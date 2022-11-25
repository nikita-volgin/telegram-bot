const axios = require('axios')

const app = require('express')(),
    bodyparser = require('body-parser')

const botToken = 'bot5671144029:AAEQ1QSnofMwGLJgnSO_MMBgodG7y52Os9M'

app.use(bodyparser.json())

app.post('/', async (req, res) => {
    const body = req.body

    console.log(body);

    if (body.message?.poll || body.poll || body.poll_answer || body.my_chat_member) {
        await sendMessage('791669874', "i don't know what to do with this information")

        res.sendStatus(200)
        return
    }

    const chatId = body.message ? body.message.chat.id : body.edited_message.chat.id

    if (body.message?.new_chat_participant?.username === 'FirstVolginBot' || body.message?.group_chat_created) {
        await sendMessage(chatId, "hello, ma friends")

        res.sendStatus(200)
        return
    }  else if (body.message?.new_chat_participant?.username) {
        await sendMessage(chatId, `welcome, ${body.message.new_chat_participant.username}`)

        res.sendStatus(200)
        return
    }

    if (body.message?.left_chat_member?.username === 'FirstVolginBot') {
        await sendMessage('791669874', `owner, i was kicked out of the group ${body.message.chat.title}`)

        res.sendStatus(200)
        return
    }
    
    const message = body.edited_message ? `this is a joke? why did u changed the message to "${body.edited_message.text}"` : 
        body.message.sticker ? `sticker ${body.message.sticker.emoji}` :
        body.message.voice ? 'voice messages' :
        body.message.chat?.type === 'group' ? "oh, i don't know what to do, i can't read your message in this group. My creator is trying to fix this 😞" :
        body.message.text.toLowerCase().trim()

    if (body.edited_message) {

        await sendMessage(chatId, message)

    } else if (message === '/start') {

        await sendMessage(chatId, 'welcome to the club, buddy')

    } else if (message === '/help') {

        await sendMessage(chatId, "you can use one of this commands:\n\n**create poll** - /poll question(if more than one word separate by '-') options(separate by '-') anon(if you need anonymous poll)\n\nthat's all")

    } else if (message.indexOf('/poll') === 0) {

        const array = message.split(' ')
        array.shift()

        const anon = array.indexOf('anon') === array.length -  1
        if (anon) array.pop()

        if (array.length < 2) {
            await sendMessage(chatId, 'something went wrong')
        } else {

            const question = array.shift().split('-').join(' ')

            const options = array[0].split('-')

            if (options.length < 2) {
                await sendMessage(chatId, 'poll must have at least 2 option, use /help')
            } else await sendPoll(chatId, question, options, anon)

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