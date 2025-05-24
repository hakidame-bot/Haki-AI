const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Discord Botの設定
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const LOG_FILE_PATH = 'logs/chat_history.json';

// チャット履歴を読み込む関数
function getChatHistory() {
    if (!fs.existsSync(LOG_FILE_PATH)) return [];
    
    try {
        const data = fs.readFileSync(LOG_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("ログデータの読み込みエラー:", error);
        return [];
    }
}

// 新しいメッセージをログに追加する関数
function saveChatMessage(user, message) {
    const chatHistory = getChatHistory();
    chatHistory.push({
        timestamp: new Date().toISOString(),
        user: user,
        message: message
    });

    fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(chatHistory, null, 2));
}

// メッセージを受信したときの処理
client.on('messageCreate', message => {
    if (message.author.bot) return; // Botのメッセージは無視

    saveChatMessage(message.author.username, message.content);
    
    // Botの応答（過去ログを活用）
    const chatHistory = getChatHistory();
    const lastMessages = chatHistory.slice(-3).map(entry => entry.message).join(' / ');
    
    message.reply(`過去の発言履歴: ${lastMessages}`);
});

// Botをログイン
client.login(process.env.BOT_TOKEN);
