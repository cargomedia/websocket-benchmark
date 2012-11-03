#!/usr/bin/env node
var optimist = require('optimist');
var _ = require('underscore');
var WebSocket = require('ws');

optimist.usage('Usage: $0 -h [host] -n [clients] -c [concurrency] -r [roundtrips] -s [size]').demand(['h']);
var argv = optimist.default('n', 1000).default('c', 1).default('s', 30).default('r', 5).argv;
var host = argv.h;
var clients = argv.n;
var concurrency = argv.c;
var size = argv.s;
var roundtripsPerClient = argv.r;
if (concurrency > clients) {
	throw 'Concurrency is larger than requests';
}

console.log('Starting ' + clients + ' clients doing ' + roundtripsPerClient + ' roundtrips to `' + host + '`.')

var clientsStarted = 0;
var clientsFinished = 0;
var message = new Array(size + 1).join('x');
var times = [];

var done = function() {
	console.log('Min: ' + _.min(times) + 'ms');
	console.log('Mean: ' + (_.reduce(times, function(memo, num) {
		return memo + num;
	}, 0) / times.length) + 'ms');
	console.log('Max: ' + _.max(times) + 'ms');
};

var startRequest = function() {
	clientsStarted++;
	var roundtrips = 0;
	var start = new Date().getTime();
	var ws = new WebSocket(host);
	var sendMessage = function() {
		ws.send(message);
	};
	ws.on('open', function() {
		sendMessage();
	});
	ws.on('message', function(response) {
		if (response != message) {
			throw 'Message and response differ';
		}
		roundtrips++;
		if (roundtrips < roundtripsPerClient) {
			sendMessage();
		} else {
			ws.close();
			times.push(new Date().getTime() - start);
			clientsFinished++;
			if (clientsStarted < clients) {
				startRequest();
			}
			if (clientsFinished == clients) {
				done();
			}
		}
	});
};

for (var i = 0; i < concurrency; i++) {
	startRequest();
}
