/**
 * Author: Adam Seidman
 * 
 * Main entry point for Zack bot.
 * 
 */

const { token, userIdVoice, userIdMessage, userIdEmoji, replies } = require('./private')
const Discord = require('discord.js')
const state = require('../base/state')
const { scheduleVoiceEvents } = require('../base/scheduler')
const emoji = require('emoji-dictionary')

// Bot Intentions
const myIntents = ['Guilds', 'GuildVoiceStates', 'GuildMessages', 'DirectMessages',
    'MessageContent', 'GuildScheduledEvents']
const myPartials = ['Channel']


const bot = new Discord.Client({ intents: myIntents, partials: myPartials })
bot.login(token)

bot.on('ready', () => {
    scheduleVoiceEvents()
    console.log('Zack Bot Initialized')
})

bot.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.member.id === userIdVoice) {
        state.update(newState)
    }
})

bot.on('messageCreate', msg => {
    if ( msg.author !== undefined && `${msg.author.id}` === userIdEmoji ) {
        if ( Math.ceil(Math.random() * 15) === 5 )
        {
            let times = Math.floor(Math.random() * 5) + 3
            console.log(`Reacting ${times} times!`)
            for ( let i = 0; i < times; i++ ) {
                msg.react(emoji.unicode[Math.floor(Math.random() * emoji.unicode.length)])
            }
        }
    }

    if ( msg.author !== undefined && `${msg.author.id}` === userIdMessage && msg.content.length > 6 ) {
        if ( Math.ceil(Math.random() * 20) === 10 ) {
            let response = replies[Math.floor(Math.random() * replies.length)]
            console.log(`Replying to '${msg.content}' with '${response}'`)
            msg.reply(response)
        }
    }
})
