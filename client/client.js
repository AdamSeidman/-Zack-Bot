/**
 * Author: Adam Seidman
 * 
 * Main entry point for Zack bot.
 * 
 */

const { token, userID } = require('./private')
const Discord = require('discord.js')


// Bot Intentions
const myIntents = ['GuildVoiceStates', 'GuildMessages', 'DirectMessages',
    'MessageContent', 'GuildScheduledEvents']

const bot = new Discord.Client({ intents: myIntents })
bot.login(token)

bot.on('ready', () => {
    console.log('Zack Bot Initialized')
})

bot.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.channel) {
        console.log('Connect.')
    } else {
        console.log('Disconnect.')
    }
    console.log(oldState)
    console.log(newState)
})
