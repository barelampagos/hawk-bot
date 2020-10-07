require('dotenv').config();

var fs = require('fs');
const { Client } = require('discord.js');
const client = new Client();
const PREFIX = '!';

client.on('ready', () => {
	console.log(`[${client.user.username} LOGGED IN]`);
});

client.on('message', (message) => {
	// Emoji Reaction for REQUEST
	if (
		message.content.startsWith('[REQUEST]') &&
		message.author.username === 'Hawk'
	) {
		message.react('✅');
		message.react('❌');
	}

	// Listen for any character rolls
	if (message.author.username === 'Mudamaid 40') {
		var character = message.embeds[0];

		if (character) {
			if (message.embeds[0].description.includes('LOOΠΔ')) {
				// Fetch yama
				client.users.fetch('176183596204294144').then(
					(user) => {
						console.log(user);

						message.channel.send(
							`[BOUNTY] @ here - ${user} is on the HUNT! If you claim ${character.author.name} for ${user}, you can earn up to 500 kakera (first half of claim reset) or 250 kakera (second half). Only if you want to!`
						);
					},
					(user) => {}
				);

				//console.log(yama);
			}
		}

		//if (character) message.react('🙏');
	}

	if (message.author.bot) return;

	// Bot Commands
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
				message.channel.send('!nom');
				break;
			case 'compliment':
			case 'c':
				compliment(message);
				break;
			case 'fortune':
			case 'f':
				fortuneCookie(message);
				break;
			case 'nom':
				message.channel.send('https://tenor.com/view/hawk-gif-18338314');
				break;
			case 'rap':
				message.channel.send('no thanks');
				break;
			default:
			// nothing
		}
	}

	// // Request
	console.log(`[${message.author.tag}]: ${message}`);
});

client.on('messageReactionAdd', (messageReaction, user) => {
	if (user.bot) return;
	//console.log(messageReaction);

	// Only accept specific Emoji
	if (messageReaction._emoji.name === '🙏') {
		var character = messageReaction.message.embeds[0]
			? messageReaction.message.embeds[0].author.name
			: '';
		//console.log(character);

		if (character) {
			messageReaction.message.channel.send(
				`[REQUEST] @here - ${user} requests ${character} , do you accept?`
			);
		}
	} else if (messageReaction._emoji.name === '✅') {
		var character = messageReaction.message.content.split(' ')[5];

		messageReaction.message.channel.send(
			`[ACCEPT] @here - ${user} ACCEPTS request for ${character}.`
		);
	} else if (messageReaction._emoji.name === '❌') {
		var character = messageReaction.message.content.split(' ')[5];

		messageReaction.message.channel.send(
			`[DENY] @here - ${user} DENIES request for ${character}.`
		);
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
