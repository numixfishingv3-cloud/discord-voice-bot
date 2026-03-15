const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);

  const channel = client.channels.cache.get('1248950710331113542');

  if (!channel) {
    console.log("หา Voice Channel ไม่เจอ");
    return;
  }

  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  console.log("Bot joined voice channel");
});

client.login(process.env.TOKEN);