const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const mysql = require('mysql');
require('./util/eventLoader')(client);



var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(aliases => {
      client.aliases.set(aliases, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content === 'sa') {
    msg.reply('Aleyküm Selam Kardeşim, Supremoya Hoş Geldin :)!');
  }
});


client.on('message', msg => {
  if (msg.content === prefix + 'supbilgi') {
    msg.reply('Supremo : Komutan ve arkadaşları tarafından kurulan bir topluluktur. Geçmişte bir çok CS:GO sunucuları vardı ve öyle devam edecek.');
  }
});

  client.on('message', msg => {
  if (msg.content === prefix  + 'botping') {
    msg.channel.send('Botun Pingi ' + client.ping + ' ms');
  }
})

client.on('message', msg => {
  if (msg.content === 'oç') {
    msg.delete(30)
    msg.reply('Küfür Yasak Dostum.');
  }
  if (msg.content === 'amk') {
    msg.delete(30)
    msg.reply('Küfür Yasak Dostum.');
  }
  if (msg.content === 'aq') {
    msg.delete(30)
    msg.reply('Küfür Yasak Dostum.');
  }
  if (msg.content === 'piç') {
    msg.delete(30)
    msg.reply('Küfür Yasak Dostum.');
  }
  if (msg.content === 'anaskm') {
    msg.delete(30)
    msg.reply('Küfür Yasak Dostum.');
  }
});



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};





//////////////////////// 


client.on("guildMemberAdd", member => {
	
	var channel = member.guild.channels.find("name", "hello");
	if (!channel) return;
	
	var role = member.guild.roles.find("name", "member");
	if (!role) return;
	
	member.addRole(role); 
	
	channel.send(member + " Artık " + role + " Rolü ile Aramızda");
	channel.send("https://media.giphy.com/media/8JZu9nEJ8Lubw7Efos/giphy.gif")
	member.send("Aramıza hoş geldin! Artık Member rolüne sahipsin!")
	
});

////////////////////////

bot.on("message", async message => {

  var timer = setInterval(function () { 
    var TET = message.guild.roles.find("name", "Owner").setColor(GenerateHex()); //REPLACE OWNER WITH ROLE NAME
    var TET_1 = message.guild.roles.find("name", "ADMIN").setColor(GenerateHex()); //REPLACE/DELETE THIS LINE
}, 2000);

  if(message.author.bot) return;

  con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
    if(err) throw err;

  if(message.author.bot) return;

  con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
    if(err) throw err;

    let sql;

    if(rows.length < 1){
      sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', ${generateXp()})`
    } else{
      let xp = rows[0].xp;
      sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`;
    }

    con.query(sql);
  });


client.on('message', msg => {
  if (msg.content === prefix + 'profil') {
    msg.channel.send(msg.author.avatarURL);
  }
});

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});



client.login(process.env.BOT_TOKEN);
