// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  const links = [
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: "/images/instagram.svg",
      bgClass: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
      textColor: "text-white",
      id: 0
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: "/images/linkedin.svg",
      bgClass: "bg-blue-600",
      textColor: "text-white",
      id: 1
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      icon: "/images/youtube.svg",
      bgClass: "bg-red-600",
      textColor: "text-white",
      id: 2
    },
    {
      name: "Snapchat",
      url: "https://snapchat.com",
      icon: "/images/snapchat.svg",
      bgClass: "bg-yellow-400",
      textColor: "text-black",
      id: 3
    },
    {
      name: "Spotify",
      url: "https://spotify.com",
      icon: "/images/spotify.svg",
      bgClass: "bg-gradient-to-r from-green-500 to-black",
      textColor: "text-white",
      id: 4
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com",
      icon: "/images/apple-music.svg",
      bgClass: "bg-pink-500",
      textColor: "text-white",
      id: 5
    },
    {
      name: "Website",
      url: "https://yourwebsite.com",
      icon: "/images/browser-safari.svg",
      bgClass: "bg-blue-500",
      textColor: "text-white",
      id: 6
    },
    {
      name: "Email",
      url: "mailto:your@email.com",
      icon: "/images/envelope.svg",
      bgClass: "bg-gray-600",
      textColor: "text-white",
      id: 7
    },
    {
      name: "Facebook",
      url: "https://facebook.com",
      icon: "/images/facebook.svg",
      bgClass: "bg-blue-700",
      textColor: "text-white",
      id: 8
    },
    {
      name: "GitHub",
      url: "https://github.com",
      icon: "/images/github.svg",
      bgClass: "bg-gray-800",
      textColor: "text-white",
      id: 9
    },
    {
      name: "Threads",
      url: "https://threads.net",
      icon: "/images/threads.svg",
      bgClass: "bg-black",
      textColor: "text-white",
      id: 10
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: "/images/twitter-x.svg",
      bgClass: "bg-black",
      textColor: "text-white",
      id: 11
    }
  ];
  res.render('index', { links });
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

