/**
 * Author: Adam Seidman
 * 
 * Plays sound bytes in a voice channel
 * 
 * Exports:
 *     play: Play random sound byte.
 */

const { createAudioResource,createAudioPlayer, NoSubscriberBehavior,
    joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice')
const fs = require('fs')

const dir = './assets/sound-bytes/'
const ext = '.mp3'

var soundBytes = []

fs.readdir(`${dir}`, (err, files) => {
    files.forEach(file => {
        if (file.toLowerCase().endsWith(ext)) {
            soundBytes.push(file.toLowerCase().substring(0, file.length - ext.length))
        }
    })
})

var play = async function (channelId, guild) {
    var soundByte = soundBytes[Math.floor(Math.random() * soundBytes.length)]

    if (soundByte === undefined || channelId === undefined || guild === undefined || !soundBytes.includes(soundByte)) {
        console.log('Error in playMusic()')
        return
    }

    // Object to play an audio resource
    const player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause
        }
    })

    // Connection to specific channel in guild
    const connection = joinVoiceChannel({
        channelId: channelId,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator
    })

    // Create new resource from file
    player.play(createAudioResource(`${dir}${soundByte}${ext}`))
    connection.subscribe(player)

    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy()
    })

    player.on('error', console.error)
}

module.exports = { play }