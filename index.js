const { Client, GatewayIntentBits } = require("discord.js");
const readline = require("readline");
const chalk = require("chalk"); // Compatible with chalk version 4.1.2 IMPORTANT FOR THIS VERSION !!

// Function to create a new readline interface
const createReadlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

// Function to prompt for input from the console
const promptInput = (rl, query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

let token = "";
let dmMessage = "";
let client = null;

const promptServerAndSendDMs = async () => {
  const rl = createReadlineInterface();
  const guilds = client.guilds.cache;
  let guildList = [];
  let index = 1;

  console.log(chalk.blue("\nAVAILABLE SERVERS:"));
  for (const [guildId, guild] of guilds) {
    try {
      const owner = await guild.fetchOwner();
      const members = await guild.members.fetch();
      guildList.push({
        index,
        id: guildId,
        name: guild.name,
        owner: owner.user.tag,
        memberCount: members.size,
      });
      console.log(
        `${index} | Server: ${guild.name}, Owner: ${owner.user.tag}, Members: ${members.size}`
      );
      index++;
    } catch (error) {
      console.log(`Failed to fetch details for guild ${guild.name}: ${error}`);
    }
  }

  console.log(`C | Option: Change Token`);
  console.log(`X | Option: Exit\n`);

  const chosenOption = await promptInput(
    rl,
    "Enter the number of the server, C to change token, or X to exit: "
  );

  if (chosenOption.toUpperCase() === "X") {
    console.log("Exiting the script. Goodbye!");
    rl.close();
    client.destroy();
    process.exit(0);
  } else if (chosenOption.toUpperCase() === "C") {
    console.log("Changing the token...");
    rl.close();
    client.destroy();
    return startBot(); // Restart the bot with a new token
  }

  const chosenGuild = guildList.find((g) => g.index === parseInt(chosenOption));

  if (!chosenGuild) {
    console.log(
      chalk.red("Invalid option chosen. Returning to server list.\n")
    );
    rl.close();
    return promptServerAndSendDMs();
  }

  const guild = guilds.get(chosenGuild.id);
  const members = await guild.members.fetch();

  // Calculate detailed server information
  const totalMembers = members.size;
  const totalBots = members.filter((member) => member.user.bot).size;
  const totalUsers = totalMembers - totalBots;
  const totalOnline = members.filter((member) =>
    ["online", "idle", "dnd"].includes(member.presence?.status)
  ).size;

  // Log detailed server information
  console.log(chalk.green(`\nServer Selected: ${guild.name}`));
  console.log(`Total Users (non-bots): ${totalUsers}`);
  console.log(`Total Bots: ${totalBots}`);
  console.log(`Total Online Members: ${totalOnline}`);
  console.log(`Total Members: ${totalMembers}`);

  const orderOption = await promptInput(
    rl,
    chalk.blue(`\nORDER OF DMs:\n`) +
      `1 | Option: From the newest members to the oldest\n` +
      `2 | Option: From the oldest members to the newest\n` +
      `3 | Option: Online members only\n` +
      `4 | Option: Offline members only\n` +
      `In what order do you want to send (1-4): `
  );

  let filteredMembers;
  switch (orderOption) {
    case "1": // Newest to oldest
      filteredMembers = members.sort(
        (a, b) => b.joinedTimestamp - a.joinedTimestamp
      );
      break;
    case "2": // Oldest to newest
      filteredMembers = members.sort(
        (a, b) => a.joinedTimestamp - b.joinedTimestamp
      );
      break;
    case "3": // Online members only (online, idle, dnd)
      filteredMembers = members.filter((member) =>
        ["online", "idle", "dnd"].includes(member.presence?.status)
      );
      break;
    case "4": // Offline members only
      filteredMembers = members.filter(
        (member) => member.presence?.status === "offline" || !member.presence
      );
      break;
    default:
      console.log("Invalid option. Returning to server list.\n");
      rl.close();
      return promptServerAndSendDMs();
  }

  dmMessage = await promptInput(
    rl,
    `\nWhat is the message to send to selected members in ${guild.name}? `
  );
  rl.close();

  console.log();

  let successCount = 0;
  let failureCount = 0;

  for (const member of filteredMembers.values()) {
    if (!member.user.bot) {
      try {
        await member.send(dmMessage);
        console.log(`DM sent to ${member.user.tag}: ${chalk.green("SUCCESS")}`);
        successCount++;
      } catch (err) {
        console.log(`DM to ${member.user.tag}: ${chalk.red("FAILED")}`);
        failureCount++;
      }
    }
  }

  console.log();

  console.log(chalk.blue(`Total selected members: ${filteredMembers.size}`));
  console.log(chalk.blue(`Members who received the message: ${successCount}`));
  console.log(
    chalk.blue(`Members who didn't receive the message: ${failureCount}`)
  );
  console.log(
    chalk.blue(
      `Ratio: ${successCount}/${filteredMembers.size} members received the message\n`
    )
  );

  console.log("Returning to server list...\n");
  return promptServerAndSendDMs(); // Restart the process
};

const startBot = async () => {
  const rl = createReadlineInterface();
  token = await promptInput(rl, "Enter your bot token: ");
  rl.close();

  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
    ],
  });

  client.once("ready", async () => {
    console.log(
      chalk.green(
        "\nNote: Bot is online! (Originally made by sayonaratv on GitHub)\n"
      )
    );
    await promptServerAndSendDMs(); // Start the DM process
  });

  client.login(token).catch((err) => {
    console.error("Failed to login. Invalid token provided or network issue.");
    console.error(err);
    process.exit(1); // Exit with error
  });
};

startBot();
