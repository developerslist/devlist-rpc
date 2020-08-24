require('colors');
const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs');
const clear = require('clear');
const client = require('discord-rich-presence')('697846463459491932');
const homedir = require('os').homedir();

clear();
console.log(`👋🏻 Welcome to the ${'Dev List'.bold.underline} Rich Presence ${'CLI'.bold}!\n`.magenta);

inquirer
  .prompt([
    {
      name: 'Choice',
      type: 'list',
      choices: [
        'Start Rich Presence', 'Update Dev List details',
      ],
    },
  ])
  .then((answers) => {
    switch (answers.Choice) {
      case 'Update devlist.xyz details':
        createPresence();
        break;
      case 'Start Rich Presence':
        loadPresence();
        break;
      default:
        break;
    }
  });
function loadPresence() {
  if (!fs.readdirSync(homedir).includes('.devlist-rpc-config.json')) return createPresence()
  clear();
  const data = fs.readFileSync(`${homedir}/.devlist-rpc-config.json`)
  const { tag } = JSON.parse(data);
  ora('Displaying Dev List Rich Presence!'.red).start();
  client.updatePresence({
    state: `🔗 devlist.xyz/${tag}`,
    details: 'My Developer Profile!',
    largeImageKey: 'bio',
    instance: true,
  });
}

function createPresence() {
  clear();
  console.log(`What is your ${'Dev List tag'.bold}?`);
  inquirer
    .prompt([
      {
        name: 'Tag',
        type: 'input',
      },
    ])
    .then((answers) => {
      fs.writeFileSync(`${homedir}/.devlist-rpc-config.json`, JSON.stringify({ tag: answers.Tag.trim() }));
      loadPresence();
    });
}
