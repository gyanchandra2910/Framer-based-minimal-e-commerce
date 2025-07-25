# F1 Streetwear - Minimal E-commerce App

A modern, responsive e-commerce application built with React, TypeScript, and Framer Motion, featuring a Formula 1 racing-inspired streetwear theme.

## 🏎️ Features

- **Modern React 19 Architecture**: Built with the latest React and TypeScript
- **Smooth Animations**: Powered by Framer Motion for silky-smooth UI transitions
- **Responsive Design**: Mobile-first approach with a sleek F1-inspired dark theme
- **Google Sheets Integration**: Automatic logging of user signups and password resets
- **Complete E-commerce Flow**: Product browsing, cart management, and user authentication
- **Fast Development**: Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Styling**: Custom CSS with F1 racing theme
- **Backend Integration**: Google Apps Script webhooks
- **Linting**: ESLint with TypeScript support

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gyanchandra2910/Framer-based-minimal-e-commerce.git
   cd Framer-based-minimal-e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 🎨 Theme & Design

The application features a Formula 1 racing-inspired design with:

- **Dark theme** with racing red (#DC143C) accents
- **Orbitron font** for that tech-forward F1 feel
- **Smooth animations** powered by Framer Motion
- **Responsive layout** that works on all devices
- **Custom red glow effects** for interactive elements

## 📊 Google Sheets Integration

This app includes automatic data logging to Google Sheets for:

- User signups (email, name, timestamp)
- Password reset requests
- Demo testing functionality

### Setup Instructions

For detailed Google Sheets integration setup, see [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md).

**Quick Setup:**
1. Create a Google Apps Script webhook using the provided `webhook.gs` code
2. Update the webhook URL in `src/code/store.ts`
3. Configure your Google Sheet ID in the Apps Script

## 📱 Application Structure

```
src/
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── index.css              # Global styles
└── code/
    ├── components.tsx     # All React components
    ├── store.ts          # State management & Google Sheets service
    └── theme.ts          # Theme configuration
```

### Key Components

- **AppRouter**: Main routing and navigation logic
- **HomePage**: Product categories and featured items
- **CategoryPage**: Product listings by category
- **ProductDetailPage**: Individual product details
- **CartPage**: Shopping cart management
- **Authentication**: Login, signup, and forgot password flows

## 🛍️ E-commerce Features

- **Product Catalog**: Browse products by categories
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Complete signup and login flow
- **Product Details**: Detailed product information pages
- **Responsive Navigation**: Smooth navigation between all pages

## 🔧 Development

### Project Structure

The application follows a component-based architecture with:

- **Single-file components**: All components in `components.tsx` for simplicity
- **Centralized state**: Global state management in `store.ts`
- **Theme system**: Consistent styling through `theme.ts`
- **Type safety**: Full TypeScript coverage

### Adding New Features

1. **Components**: Add new components to `src/code/components.tsx`
2. **State**: Extend the store in `src/code/store.ts`
3. **Styling**: Update theme variables in `src/code/theme.ts`
4. **Types**: Add interfaces to the appropriate files

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deploy Options

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Any static host**: Upload the `dist` folder contents

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🏁 Acknowledgments

- Inspired by Formula 1 racing aesthetics
- Built with modern React best practices
- Powered by Framer Motion for smooth animations
- Designed for performance and user experience

---

**Built with ❤️ for F1 fans and streetwear enthusiasts**
