# Discord Direct Message Bot V2

This project is a **Discord bot** designed to send direct messages (DMs) to all members of a selected server. The bot is built using the [Discord.js](https://discord.js.org/) library and provides an easy-to-use console interface for managing servers, selecting recipients, and sending messages.

Originally created by [Unknown](https://github.com/sayonaratv)

## Disclaimer
This program is designed for educational purposes only. When using this script or any similar tools, please adhere to the following guidelines:

- Do not spam: Avoid sending mass direct messages to users without their consent. This can be considered spam and is against Discord's Terms of Service.
- Respect privacy: Do not use the script to gather personal information or harass users.
- Follow Discord's policies: Ensure that your use of the script complies with Discord's [Terms of Service](https://discord.com/terms) and [Community Guidelines](https://discord.com/guidelines).
- Use responsibly: Only use the script in environments where you have explicit permission to do so.

Failure to follow these guidelines could result in your account or bot being restricted or banned by Discord.

## Features

- **Server Selection**: Lists all the servers the bot is a part of, allowing the user to select one.
- **Detailed Server Info**: Displays the server's name, total members, number of bots, number of users (non-bots), and the count of online members before sending messages.
- **Custom Message Input**: Prompts the user for the message to send to all eligible members of the selected server.
- **DM Status Tracking**: Provides a summary of how many messages were successfully sent and how many failed.
- **Token Management**: Allows the user to change the bot token directly within the console.
- **Exit Option**: Cleanly exits the application if desired.

## Prerequisites

Before starting, make sure you have the following installed on your machine:

1. **Node.js** (version 16 or higher recommended).
2. **npm** (included with Node.js).
3. A **Discord bot token**. Refer to the [Discord documentation](https://discord.com/developers/docs/intro) to create an application and obtain a token.

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/sayonaratv/dmall-bot-console.git
   cd dmall-bot-consoleV2
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Install a compatible version of `chalk` (4.1.2 for CommonJS):
   ```bash
   npm install chalk@4.1.2
   ```

## Usage

1. Start the bot with the following command:
   ```bash
   node index.js
   ```

2. Enter your Discord bot token when prompted.

3. Follow the instructions in the console to:
   - Select a server from the list of servers the bot has access to.
   - Choose the order of sending (e.g., from newest to oldest members).
   - Provide the message to send to the selected members.

4. Check the logs in the console to view the results:
   - Successful messages will appear in green with the text `SUCCESS`.
   - Failed messages will appear in red with the text `FAILED`.
   - A summary will be displayed in blue at the end of the operation.

## Example Output

Here is an example of what the console output might look like while the bot is running:

```
AVAILABLE SERVERS:
1 | SERVER: My Discord Server, OWNER: User#1234, MEMBERS: 150
C | OPTION: Change Token
X | OPTION: Exit

Enter the number of the server, C to change token, or X to exit: 1

Server Selected: My Discord Server
Total Users (non-bots): 120
Total Bots: 30
Total Online Members: 45
Total Members: 150

ORDER OF DMs:
1 | From the newest members to the oldest
2 | From the oldest members to the newest
3 | Online members only
4 | Offline members only

In what order do you want to send (1-4): 1

What is the message to send to selected members in My Discord Server? Hello, this is a test DM!

DM sent to User#5678: SUCCESS
DM sent to User#9101: SUCCESS
DM to User#1123: FAILED

Summary:
- Total selected members: 150
- Members who received the message: 148
- Members who didn't receive the message: 2
- Ratio: 148/150 members received the message
```

## Customization

The bot's features can be adjusted by modifying the `index.js` file. For example:
- Add new filters for members.
- Customize the messages displayed in the console.

## Known Limitations

- **Rate Limits**: Discord enforces limits on the number of messages that can be sent within a certain period. If you exceed these limits, some DM attempts may fail.
- **Permissions**: Ensure that the bot has the necessary permissions to read members and send direct messages.

## Contribution

Contributions are welcome! If you'd like to improve this project, feel free to open an [issue](https://github.com/sayonaratv/dmall-bot-console/issues) or a [pull request](https://github.com/sayonaratv/dmall-bot-console/pulls).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
