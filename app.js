// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const streamifier = require('streamifier');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'buckeye-profile-pics',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

const upload = multer({ storage });

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

//Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Database connection
const { Pool } = require('pg');



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

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());


app.post('/login', (req, res, next) => {
  console.log("login route accessed");
  const { email, password } = req.body;
  
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err); 
    if (!user) return res.status(401).json({ message: info.message }); 
    req.logIn(user, (err) => {
      if (err) return next(err); 
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);

});
//login passport
passport.use(new LocalStrategy({ usernameField: 'email' },async (email, password, done) => {
  try{
    //find username
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      const user = result.rows[0];
      
      if (!user) return done(null, false, { message: "User not found" });
      //check if password is correct versus hashing
      
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        return done(null, user); 
      } else {
        return done(null, false, { message: "Invalid credentials" });
      }
  }catch(error){
    console.error('Error logging in', error);
    return done(error);
  }
}));
//serialize user
passport.serializeUser((user, done) => done(null, user.id));
//login passport request returning user
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/links');}else{
    res.render('samplelogin');}
});




app.get('/signup', (req, res) => {
  res.render('samplesignup');
});

app.get('/forgot-password', (req, res) => {
  res.render('sampleforgotpassword');
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}
// Home route
app.get('/links', ensureAuthenticated, async (req, res) => {
  console.log("GET route accessed");
  console.log("Database pool status:", pool.totalCount, "total connections");
  
  try {
    // Fetch links
    const result = await pool.query("SELECT * FROM links WHERE user_id = $1 ORDER BY id ASC", [req.user.id]);
    console.log("result:", result.rows);
    //fetch image
    const imageResult = await pool.query("SELECT profile_image FROM users WHERE id = $1", [req.user.id]);
    const imageUrl = imageResult.rows[0].profile_image;
    console.log("imageUrl:", imageUrl);
    // Fetch user data for bio and username
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id]);
    const user = userResult.rows[0];
    console.log("user:", user);
    const username = user.username;
    const bio = user.bio;
    console.log("username:", username);
    console.log("bio:", bio);

    // Match with known platforms and return the links with the actual inputs
    const linkIds = result.rows.map(link => link.type_id);

    const addedLinks = result.rows.map(dbLink => {
      const platformMeta = links.find(link => link.id === dbLink.type_id);
      return {
        dbId: dbLink.id, 
        id: dbLink.type_id,
        url: dbLink.url,
        name: dbLink.user_link_name || dbLink.name,
        icon: platformMeta?.icon || '',
        bgClass: platformMeta?.bgClass || '',
        textColor: platformMeta?.textColor || '',
      };
    });
    


    console.log("Filtered Added Links:", addedLinks);
    res.render('index', { links, addedLinks, username, bio, imageUrl });

  } catch (err) {
    console.error('Error fetching from database', err);
    res.status(500).send("Database error");
  }
});


app.post('/add-link', ensureAuthenticated, async (req, res) => {
  try{const { platform, url, linkName } = req.body;
  console.log("New link:", platform, url);
  //find id for link 
  const found = links.find(link => link.value === platform);
  console.log(found);
  const id = found.id;
  const name = found.name;
  // add link and id to database
        try{
          await pool.query(
            "INSERT INTO links (type_id, url, name, user_id, user_link_name) VALUES ($1, $2, $3, $4, $5)",  [id, url, name, req.user.id, linkName || name]
          );
          console.log("Link added to database");
          res.redirect('/links');
        }catch(error){
          console.error('Error adding link to database', error);
          res.status(500).send("Something went wrong");
        }
      }catch(error){
        console.error('couldnt hit post', error);
        res.status(500).send("couldnt hit post");
      }    
  });

  app.post('/edit-profile', ensureAuthenticated, upload.single('editPhoto'), async (req, res) => {
    try {
      const userId = req.user.id;
      const name = req.body.editName;
      const bio = req.body.editBio;
      const imageUrl = req.file ? req.file.path : null;
  
      await pool.query(
        `UPDATE users SET username = $1, bio = $2${imageUrl ? ', profile_image = $3' : ''} WHERE id = $${imageUrl ? 4 : 3}`,
        imageUrl ? [name, bio, imageUrl, userId] : [name, bio, userId]
      );
  
      res.status(200).json({ message: "Profile updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  
app.delete('/delete-link', async (req, res) => {
  console.log("delete link route accessed");
  try {
    await pool.query("DELETE FROM links WHERE id = $1 AND user_id = $2", [req.body.id, req.user.id]);
    res.status(200).send("Deleted");
    console.log(`link deleted of id ${req.body.id}`);
  } catch (error) {
    console.error('Error deleting link', error);
    res.status(500).send("Error deleting link");
  }
});



app.post('/signup', async (req, res) => {
  console.log("signup route accessed");
  const { email, password, name } = req.body;
  console.log(email, password, name);
  try{
    //check if email already exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      console.log("email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }

    

    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    //insert user into database
    await pool.query("INSERT INTO users (email, password, full_name, username, bio) VALUES ($1, $2, $3, $4, $5)", [email, hashedPassword, name, name, "Enter a Bio:"]);
    res.status(200).send({ message: "Account created successfully" });
  }catch(error){
    console.error('Error signing up', error);
    res.status(500).send({ message: "Error signing up" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

