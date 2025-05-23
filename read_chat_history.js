const fs = require('fs');

// JSONファイルを読み込む関数
function getChatHistory() {
    const filePath = 'logs/chat_history.json';

    // ファイルが存在するか確認
    if (!fs.existsSync(filePath)) {
        console.log("ログファイルが見つかりません。新しいログデータを作成します。");
        return [];
    }

    // ファイルを読み込んでJSONデータに変換
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("ログデータの読み込みエラー:", error);
        return [];
    }
}

// 発言ログを取得
const chatHistory = getChatHistory();
console.log("現在の発言ログ:", chatHistory);
