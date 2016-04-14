'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');

var HeartBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'hotdogbot';
    this.user = null;
};

// inherits methods and properties from the Bot constructor
util.inherits(HeartBot, Bot);

/**
 * Run the bot
 * @public
 */
HeartBot.prototype.run = function () {
    HeartBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

/**
 * On Start callback, called when the bot connects to the Slack server and access the channel
 * @private
 */
HeartBot.prototype._onStart = function () {
    this._loadBotUser();
    this._firstRunCheck();
};

/**
 * On message callback, called when a message (of any type) is detected with the real time messaging API
 * @param {object} message
 * @private
 */
HeartBot.prototype._onMessage = function (message) {    
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFromHeartBot(message)) {
        this._addHeart(message);
    }
};


HeartBot.prototype._addHeart = function (originalMessage) {
        var self = this;
        var channel = self._getChannelById(originalMessage.channel);
        
        // self._api("reactions.add",{channel:channel.id, name:"heart",timestamp:originalMessage.ts})
        self._api("reactions.add",{channel:channel.id, name:"hotdog",timestamp:originalMessage.ts})
        // self._api("reactions.add",{channel:channel.id, name:"shit",timestamp:originalMessage.ts})
            
};

/**
 * Loads the user object representing the bot
 * @private
 */
HeartBot.prototype._loadBotUser = function () {
    var self = this;

    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

/**
 * Check if the first time the bot is run. It's used to send a welcome message into the channel
 * @private
 */
HeartBot.prototype._firstRunCheck = function () {
            this._welcomeMessage();
};

/**
 * Sends a welcome message in the channel
 * @private
 */
HeartBot.prototype._welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, this.settings.name + " --- Satisfying you since 2002",
        {as_user: true});
};

/**
 * Util function to check if a given real time message object represents a chat message
 * @param {object} message
 * @returns {boolean}
 * @private
 */
HeartBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

/**
 * Util function to check if a given real time message object is directed to a channel
 * @param {object} message
 * @returns {boolean}
 * @private
 */
HeartBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C'
        ;
};


/**
 * Util function to check if a given real time message has ben sent by the HeartBot
 * @param {object} message
 * @returns {boolean}
 * @private
 */
HeartBot.prototype._isFromHeartBot = function (message) {
    return message.user === this.user.id;
};

/**
 * Util function to get the name of a channel given its id
 * @param {string} channelId
 * @returns {Object}
 * @private
 */
HeartBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

module.exports = HeartBot;
