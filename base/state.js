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
    if (voiceState.channel) {
        state = voiceState
    } else {
        state = undefined
    }
}

var isConnected = function() {
    return state !== undefined
}

var getChannel = function() {
    if (isConnected()) {
        return state.channel
    }
}

module.exports = {
    update: updateState,
    isConnected: isConnected,
    getChannel: getChannel
}