// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

//Data parsing
app.use(express.urlencoded({ extended: true }));

//Database connection
const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to the database');
  release();
});

const links = [
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: "/images/instagram.svg",
    bgClass: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
    textColor: "text-white",
    id: 0,
    value: "instagram"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "/images/linkedin.svg",
    bgClass: "bg-blue-600",
    textColor: "text-white",
    id: 1,
    value: "linkedin"
  },
  {
    name: "YouTube",
    url: "https://youtube.com",
    icon: "/images/youtube.svg",
    bgClass: "bg-red-600",
    textColor: "text-white",
    id: 2,
    value: "youtube"
  },
  {
    name: "Snapchat",
    url: "https://snapchat.com",
    icon: "/images/snapchat.svg",
    bgClass: "bg-yellow-400",
    textColor: "text-black",
    id: 3,
    value: "snapchat"
  },
  {
    name: "Spotify",
    url: "https://spotify.com",
    icon: "/images/spotify.svg",
    bgClass: "bg-gradient-to-r from-green-500 to-black",
    textColor: "text-white",
    id: 4,
    value: "spotify"
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com",
    icon: "/images/apple-music.svg",
    bgClass: "bg-pink-500",
    textColor: "text-white",
    id: 5,
    value: "apple-music"
  },
  {
    name: "Website",
    url: "https://yourwebsite.com",
    icon: "/images/browser-safari.svg",
    bgClass: "bg-blue-500",
    textColor: "text-white",
    id: 6,
    value: "website"
  },
  {
    name: "Email",
    url: "mailto:your@email.com",
    icon: "/images/envelope.svg",
    bgClass: "bg-gray-600",
    textColor: "text-white",
    id: 7,
    value: "email"
  },
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: "/images/facebook.svg",
    bgClass: "bg-blue-700",
    textColor: "text-white",
    id: 8,
    value: "facebook"
  },
  {
    name: "GitHub",
    url: "https://github.com",
    icon: "/images/github.svg",
    bgClass: "bg-gray-800",
    textColor: "text-white",
    id: 9,
    value: "github"
  },
  {
    name: "Threads",
    url: "https://threads.net",
    icon: "/images/threads.svg",
    bgClass: "bg-black",
    textColor: "text-white",
    id: 10,
    value: "threads"
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: "/images/twitter-x.svg",
    bgClass: "bg-black",
    textColor: "text-white",
    id: 11,
    value: "twitter"
  }
];

// Home route
app.get('/', (req, res) => {
  
  res.render('index', { links });
});

app.post('/add-link', (req, res) => {
  const { platform, url } = req.body;
  console.log("New link:", platform, url);
  //find id for link 
  const found = links.find(link => link.value === platform);
  console.log(found);
  const id = found.id;
  
  // add link and id to database
  res.redirect('/');
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

