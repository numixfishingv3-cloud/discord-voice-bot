const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const play = require("play-dl");
const { createAudioPlayer, createAudioResource } = require("@discordjs/voice");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ],
});

const player = createAudioPlayer();

client.once("ready", () => {

  console.log(`ล็อกอินแล้ว ${client.user.tag}`);

  const channel = client.channels.cache.get("1248950710331113542"); // ใส่ Voice ID

  if (!channel) {
    console.log("หา Voice Channel ไม่เจอ");
    return;
  }

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  connection.subscribe(player);

  console.log("บอทเข้า Voice แล้ว (24/7)");

});

client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    interaction.reply("บอททำงานอยู่ 🟢");
  }

  if (interaction.commandName === "play") {

    const url = interaction.options.getString("url");

    const stream = await play.stream(url);

    const resource = createAudioResource(stream.stream);

    player.play(resource);

    interaction.reply("กำลังเปิดเพลง 🎵");

  }

});

client.login(process.env.TOKEN);