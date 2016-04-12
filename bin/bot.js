#!/usr/bin/env node

'use strict';

/**
 * HeartBot launcher script.
 *
 * @author Pablo Lopez Domowicz <plopezd1321@gmail.com>
 */

var HeartBot = require('../lib/heartbot');


var token = process.env.BOT_API_KEY || require('../token');
var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME;

var heartbot = new HeartBot({
    token: token,
    dbPath: dbPath,
    name: name
});

heartbot.run();
