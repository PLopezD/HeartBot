#!/usr/bin/env node

'use strict';

/**
 * HeartBot launcher script.
 *
 * @author Pablo Lopez Domowicz <plopezd1321@gmail.com>
 */
var http = require('http');

var HeartBot = require('../lib/heartbot');


var token = process.env.BOT_API_KEY || require('../token');
var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME;

var heartbot = new HeartBot({
    token: token,
    name: name
});




http.createServer(function (req, res) {

res.writeHead(200, { 'Content-Type': 'text/plain' });

res.send('it is running\n');

}).listen(process.env.PORT || 5000);



heartbot.run();
