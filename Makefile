# F1 Streetwear Development Scripts

# Start development server
start-dev:
	npm run dev

# Build for production  
build:
	npm run build

# Preview production build
preview:
	npm run preview

# Install dependencies
setup:
	npm install

# Clean install
clean-install:
	rm -rf node_modules package-lock.json
	npm install
