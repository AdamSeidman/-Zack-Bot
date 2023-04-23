/**
 * Author: Adam Seidman
 * 
 * Main entry point for Zack bot.
 * 
 */

const { token, userID } = require('./private')
const Discord = require('discord.js')
const state = require('../base/state')

// Bot Intentions
const myIntents = ['GuildVoiceStates', 'GuildMessages', 'DirectMessages',
    'MessageContent', 'GuildScheduledEvents']

const bot = new Discord.Client({ intents: myIntents })
bot.login(token)

bot.on('ready', () => {
    console.log('Zack Bot Initialized')
})

bot.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.member.id === userID) {
        state.update(newState)
    }
})
