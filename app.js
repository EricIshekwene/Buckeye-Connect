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
app.use(express.json());

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
  },
  {
    name: "Discord",
    url: "https://discord.com",
    icon: "/images/discord.svg",
    bgClass: "bg-indigo-600",
    textColor: "text-white",
    id: 12,
    value: "discord"
  },
  {
    name: "TikTok",
    url: "https://tiktok.com",
    icon: "/images/tiktok.svg",
    bgClass: "bg-gradient-to-r from-black via-red-500 to-pink-500",
    textColor: "text-white",
    id: 13,
    value: "tiktok"
  },
  {
    name: "WhatsApp",
    url: "https://wa.me",
    icon: "/images/whatsapp.svg",
    bgClass: "bg-green-500",
    textColor: "text-white",
    id: 14,
    value: "whatsapp"
  },
  {
    name: "Twitch",
    url: "https://twitch.tv",
    icon: "/images/twitch.svg",
    bgClass: "bg-purple-600",
    textColor: "text-white",
    id: 15,
    value: "twitch"
  },
  {
    name: "Telegram",
    url: "https://t.me",
    icon: "/images/telegram.svg",
    bgClass: "bg-blue-500",
    textColor: "text-white",
    id: 16,
    value: "telegram"
  },
  {
    name: "Reddit",
    url: "https://reddit.com",
    icon: "/images/reddit.svg",
    bgClass: "bg-orange-500",
    textColor: "text-white",
    id: 17,
    value: "reddit"
  },
  {
    name: "Pinterest",
    url: "https://pinterest.com",
    icon: "/images/pinterest.svg",
    bgClass: "bg-red-600",
    textColor: "text-white",
    id: 18,
    value: "pinterest"
  }
];




// Home route
app.get('/', async (req, res) => {
  console.log("GET route accessed");
  console.log("Database pool status:", pool.totalCount, "total connections");

  try {
    // Fetch links
    const result = await pool.query("SELECT * FROM links");

    // Fetch user data
    const userResult = await pool.query("SELECT * FROM users LIMIT 1");
    const user = userResult.rows[0];
    console.log("user:", user);

    // Check if username and bio exist
    if (!user || !user.username || !user.bio) {
      console.log("Username or bio missing — skipping render");
      return res.status(204).send(); // No Content or you could redirect
    }

    const username = user.username;
    const bio = user.bio;
    console.log("username:", username);
    console.log("bio:", bio);

    // Match with known platforms and return the links with the actual inputs
    const linkIds = result.rows.map(link => link.type_id);
    const addedLinks = links.filter(link => linkIds.includes(link.id));
    addedLinks.forEach(link => {
      const dbLink = result.rows.find(row => row.type_id === link.id);
      if (dbLink) {
        link.url = dbLink.url;
      }
    });

    console.log("Filtered Added Links:", addedLinks);
    res.render('index', { links, addedLinks, username, bio });

  } catch (err) {
    console.error('Error fetching from database', err);
    res.status(500).send("Database error");
  }
});


app.post('/add-link', async (req, res) => {
  try{const { platform, url } = req.body;
  console.log("New link:", platform, url);
  //find id for link 
  const found = links.find(link => link.value === platform);
  console.log(found);
  const id = found.id;
  const name = found.name;
  // add link and id to database
  try{
    await pool.query(
      "INSERT INTO links (type_id, url, name) VALUES ($1, $2, $3)",  [id, url, name]
    );
    console.log("Link added to database");
    res.redirect('/');
  }catch(error){
    console.error('Error adding link to database', error);
    res.status(500).send("Something went wrong");
  }
}catch(error){
  console.error('couldnt hit post', error);
  res.status(500).send("couldnt hit post");
}    
  });

  app.post('/edit-profile', async (req, res) => {
    try {
      console.log("edit profile route accessed");
      const { name, bio } = req.body;
  
      console.log("Received:", name, bio);
  
      await pool.query("UPDATE users SET username = $1, bio = $2 WHERE id = 4", [name, bio]);
  
      console.log("Profile inserted");
      res.redirect('/');
    } catch (error) {
      console.error('Error editing profile', error);
      res.status(500).send("Error editing profile");
    }
  });
  
app.delete('/delete-link', async (req, res) => {
  console.log("delete link route accessed");
  try {
    const { id } = req.body;
    await pool.query("DELETE FROM links WHERE type_id = $1", [id]);
    res.status(200).send("Deleted");
    console.log(`link deleted of id ${id}`);
  } catch (error) {
    console.error('Error deleting link', error);
    res.status(500).send("Error deleting link");
  }
});

app.get('/samplelogin', (req, res) => {
  res.render('samplelogin');
});
app.get('/samplesignup', (req, res) => {
  res.render('samplesignup');
});
app.get('/sampleforgotpassword', (req, res) => {
  res.render('sampleforgotpassword');
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

