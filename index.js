const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const play = require('play-dl');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

let player = createAudioPlayer();

client.once("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  // ping
  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong! บอททำงานอยู่");
  }

  // play
  if (interaction.commandName === "play") {

    await interaction.deferReply();

    const url = interaction.options.getString("url");
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.editReply("❌ คุณต้องอยู่ใน Voice Channel ก่อน");
    }

    try {

      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator
      });

      const stream = await play.stream(url);

      const resource = createAudioResource(stream.stream, {
        inputType: stream.type
      });

      player.play(resource);
      connection.subscribe(player);

      interaction.editReply("🎵 กำลังเล่นเพลง");

    } catch (error) {

      console.log(error);
      interaction.editReply("❌ เล่นเพลงไม่ได้");

    }

  }

  // stop
  if (interaction.commandName === "stop") {

    player.stop();
    interaction.reply("⏹ หยุดเพลงแล้ว");

  }

});

client.login(process.env.TOKEN);