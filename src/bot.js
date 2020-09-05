require('dotenv').config();

var fs = require('fs');
const { Client } = require('discord.js');
const client = new Client();
const PREFIX = '!';

client.on('ready', () => {
	console.log(`[${client.user.username} LOGGED IN]`);
});

client.on('message', (message) => {
	if (message.author.bot) return;

	if (message.content.startsWith(PREFIX)) {
		console.log('=====================');
		console.log(`[${message.author.tag}]: ${message.content}`);

		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/);

		console.log('[CMD]: ' + CMD_NAME);
		console.log('[args]: ' + args);

		switch (CMD_NAME) {
			case 'help':
			case 'h':
				message.channel.send('I only know these words:');
				message.channel.send('!fortune (!f): Get your fortune told');
				message.channel.send('!compliment (!c): Compliment 4 U!');
				break;
			case 'compliment':
			case 'c':
				compliment(message);
				break;
			case 'fortune':
			case 'f':
				fortuneCookie(message);
				break;
			case 'rap':
				message.channel.send('no thanks');
				break;
			default:
			// nothing
		}
	}
});

function fortuneCookie(message) {
	var prefix = 'Hawk says, "';
	var suffix = '"';

	try {
		message.channel.send('https://imgur.com/NTqU5nb');
		var data = fs
			.readFileSync(__dirname + '/../data/fortunes.txt', 'utf8')
			.toString()
			.split('\n');
		// console.log(data);

		var fortune = data[Math.floor(Math.random() * data.length)];
		fortune = fortune.replace('\r', '');
		console.log(fortune);

		message.channel.send(prefix + fortune + suffix);
	} catch (e) {
		console.log('Error:', e.stack);
	}
}

function compliment(message) {
	var prefix = 'Hawk says, "';
	var suffix = '"';

	try {
		message.channel.send('https://imgur.com/9WQpenA');

		var data = fs
			.readFileSync(__dirname + '/../data/compliments.txt', 'utf8')
			.toString()
			.split('\n');
		// console.log(data);

		var compliment = data[Math.floor(Math.random() * data.length)];
		compliment = compliment.replace('\r', '');
		console.log(compliment);

		message.channel.send(prefix + compliment + suffix);
	} catch (e) {
		console.log('Error:', e.stack);
	}
}

client.login(process.env.DISCORDJS_BOT_TOKEN);

//console.log(process.env.DISCORDJS_BOT_TOKEN);
