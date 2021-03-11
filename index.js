const { Client, Intents } = require('discord.js');
const allIntents = new Intents(Intents.ALL);
const client = new Client({ws: { intents: allIntents }});
const config = require('./config');

const renewalID = '474064320167280642';
const generalRoleID = '748369916075442336';
const generalChannelID = '757351401725624441';
// 748369916075442336 General Role ID
// 757351401725624441 General Channel ID
// 474064320167280642 Renewal Role ID

async function checkRoles(oldRoles, newRoles) {
  // No change in roles, return
  if (oldRoles.length === newRoles.length) return false;
  const oldRole = oldRoles.find(role => role === renewalID);

  // Already had Renewal role, return
  if (oldRole) return false;
  const foundRole = newRoles.find(role => role === renewalID);

  // If Renewal role not added, return
  if (!foundRole) return false;
  return true;
}

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const newUserId = newMember.id;
  const oldRoles = oldMember.roles.cache.array().map((role) => role.id);
  const newRoles = newMember.roles.cache.array().map((role) => role.id);

  const addedRenewal = await checkRoles(oldRoles, newRoles);
  if (!addedRenewal) return;

  const pingChannel = client.channels.cache.get(generalChannelID);
  pingChannel.send(`Welcome <@${newUserId}> :smile: Please be sure to check out #how-to-set-up-discord for information on everything you need to know to get started in the server. If you have any other questions, be sure to let us know!`);
});

client.on('ready', () => {
  console.log('Logged in.');
});

client.login(config.TOKEN);
