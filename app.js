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
  res.render('index', { name: 'Brutus', links: [
    { label: "Carmen", url: "https://carmen.osu.edu" },
    { label: "BuckeyeMail", url: "https://buckeyemail.osu.edu" },
    { label: "My Buckeye Link", url: "https://buckeyelink.osu.edu" }
  ]});
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
