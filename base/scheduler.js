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
const utils = require('poop-sock')
const { userIdMessage, weeklyMessage } = require('../client/private')

const minSeconds = (10 * 60)
const maxSeconds = (20 * 60)

var scheduleCheck = function () {
    var date = new Date()
    var seconds = minSeconds + Math.ceil(Math.random() * (maxSeconds - minSeconds)) + 1
    date.setSeconds(date.getSeconds() + seconds)
    console.log(date)
    schedule.scheduleJob(date, async () => {
        let hour = new Date().getHours()
        if (state.isConnected() && (hour > 21 || hour < 6)) {
            console.log('Playing...')
            play(state.getChannelId(), state.getGuild())
        }
        scheduleCheck()
    })
}

var scheduleMessage = function () {
    schedule.scheduleJob({hour: 21, minute: 30, second: 30}, async () => {
        if ((new Date()).getDay() == 5) {
            // Send message
            let channel = await utils.getUserById(userIdMessage)
            if (channel === undefined || weeklyMessage === undefined) {
                console.log('Could not send weekly message')
            } else {
                channel.send(weeklyMessage)
                console.log('Sent weekly message!')
            }
        }

    })
}

module.exports = { scheduleVoiceEvents: scheduleCheck, scheduleMessage }