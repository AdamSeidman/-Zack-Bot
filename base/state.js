/**
 * Author: Adam Seidman
 * 
 * Provides Zack's voice state.
 * 
 * Exports:
 *     update: Update Zack's state
 *     isConnected: Is Zack connected?
 *     getChannel: Get information about Zack's voice channel.
 */

var state = undefined

var updateState = function(voiceState) {
    if (voiceState.channelId) {
        state = voiceState
    } else {
        state = undefined
    }
}

var isConnected = function() {
    return state !== undefined
}

var getChannelId = function() {
    if (isConnected()) {
        return state.channelId
    }
}

var getGuild = function() {
    if (isConnected()) {
        return state.guild
    }
}

module.exports = {
    update: updateState,
    isConnected: isConnected,
    getChannelId: getChannelId,
    getGuild: getGuild
}