// index.js
const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = process.env.PORT || 3000;

// === Telegram Bot ===
const token = "8202524627:AAHXbl_9iIBMrQcaNOgh5wACBQ2zcokqvqc";
const bot = new TelegramBot(token, { polling: true });

// Кнопка запуска WebApp прямо в Telegram
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "👋 Добро пожаловать! Жми кнопку ниже:", {
        reply_markup: {
            keyboard: [[{ text: "🎁 Открыть кейсы", web_app: { url: "https://seven777-0hev.onrender.com" } }]],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
});

// === Express (сайт) ===
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/case", (req, res) => {
    res.sendFile(path.join(__dirname, "case.html"));
});

app.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname, "profile.html"));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
