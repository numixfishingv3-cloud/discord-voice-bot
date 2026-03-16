const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [

new SlashCommandBuilder()
.setName('ping')
.setDescription('เช็คว่าบอททำงานไหม'),

new SlashCommandBuilder()
.setName('play')
.setDescription('เล่นเพลงจาก YouTube')
.addStringOption(option =>
option.setName('url')
.setDescription('ลิงก์ YouTube')
.setRequired(true)),

new SlashCommandBuilder()
.setName('stop')
.setDescription('หยุดเพลง')

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {

    console.log("กำลังสร้าง Slash Commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log("สร้างคำสั่งสำเร็จแล้ว!");

  } catch (error) {
    console.error(error);
  }
})();