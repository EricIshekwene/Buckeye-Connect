# Buckeye Connect 🌰

A modern social media link aggregator built with Node.js, Express, EJS, and PostgreSQL. Create a beautiful landing page to showcase all your social media profiles in one place.

## ✨ Features

- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Dynamic Links**: Add and manage your social media profiles
- **Database Storage**: PostgreSQL backend to persist your links
- **Real-time Updates**: Hot reloading with nodemon
- **Social Media Support**: 18+ platforms including Instagram, LinkedIn, YouTube, TikTok, and more
- **Custom Styling**: Each platform has its authentic brand colors and gradients

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd buckeye-connect
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up your database**

   ```sql
   CREATE TABLE links (
     id SERIAL PRIMARY KEY,
     type_id INTEGER NOT NULL,
     url TEXT NOT NULL,
     name TEXT NOT NULL
   );
   ```

4. **Create environment file**
   Create a `.env` file in the root directory:

   ```env
   PGUSER=your_username
   PGHOST=localhost
   PGDATABASE=your_database_name
   PGPASSWORD=your_password
   PGPORT=5432
   ```

5. **Build CSS**

   ```bash
   npm run build:css
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
buckeye-connect/
├── app.js                 # Main Express server
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── .env                   # Environment variables (create this)
├── public/
│   ├── style.css         # Compiled CSS
│   ├── tailwind.css      # Tailwind source
│   └── images/           # Social media icons
└── views/
    └── index.ejs         # Main template
```

## 🎨 Supported Platforms

- Instagram (Purple-Pink-Orange gradient)
- LinkedIn (Blue)
- YouTube (Red)
- Snapchat (Yellow)
- Spotify (Green-Black gradient)
- Apple Music (Pink)
- Website (Blue)
- Email (Gray)
- Facebook (Dark Blue)
- GitHub (Dark Gray)
- Threads (Black)
- Twitter (Black)
- Discord (Purple)
- TikTok (Black-Red-Pink gradient)
- WhatsApp (Green)
- Twitch (Purple)
- Telegram (Blue)
- Reddit (Orange)
- Pinterest (Red)

## 🛠️ Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build:css` - Build Tailwind CSS with watch mode
- `npm run start:bs` - Start with browser-sync for live reload

## 📝 Usage

1. **View your profile**: Visit `http://localhost:3000` to see your current links
2. **Add new links**: Click the "+link" button to add new social media profiles
3. **Select platform**: Choose from the dropdown of supported platforms
4. **Enter URL**: Add your profile URL (e.g., `https://instagram.com/yourusername`)
5. **Save**: Click "Add Link" to save to the database

## 🔧 Customization

### Adding New Platforms

1. Add the platform to the `links` array in `app.js`:

   ```javascript
   {
     name: "New Platform",
     url: "https://newplatform.com",
     icon: "/images/newplatform.svg",
     bgClass: "bg-custom-color",
     textColor: "text-white",
     id: 19,
     value: "newplatform"
   }
   ```

2. Add the background class to `tailwind.config.js` safelist
3. Add the platform to the dropdown in `views/index.ejs`

### Styling

- Modify `public/tailwind.css` for custom styles
- Update `tailwind.config.js` for theme customization
- Icons are stored in `public/images/`

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Check your `.env` file credentials
- Verify the database and table exist

### CSS Not Loading

- Run `npm run build:css` to compile Tailwind
- Check that `public/style.css` exists and is being served

### Links Not Appearing

- Check browser console for errors
- Verify the `links` table exists in your database
- Ensure all required columns are present

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Go Bucks! 🌰** - Built for the Ohio State University community
