/**
 * Author: Adam Seidman
 * 
 * Schedule the voice clips.
 * 
 * Exports:
 *     scheduleVoiceEvents: Start schedule.
 */

const schedule = require('node-schedule')
const state = require('./state')
const { play } = require('./voice')

const minSeconds = (60 * 15)
const maxSeconds = (60 * 30)

var scheduleCheck = function () {
    var date = new Date()
    var seconds = minSeconds + Math.ceil(Math.random() * (maxSeconds - minSeconds)) + 1
    date.setSeconds(date.getSeconds() + seconds)
    schedule.scheduleJob(date, async () => {
        if (state.isConnected()) {
            play(state.getChannelId(), state.getGuild())
        }
        scheduleCheck()
    })
}

module.exports = { scheduleVoiceEvents: scheduleCheck }