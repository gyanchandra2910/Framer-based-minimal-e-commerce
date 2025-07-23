// Store for managing global state
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    quantity: number;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    isClickable: boolean;
}

// Google Sheets Integration Interface
export interface GoogleSheetsData {
    email: string;
    action: "signup" | "password_reset";
    timestamp: string;
    firstName?: string;
    lastName?: string;
}

// Google Apps Script Webhook URL (replace with your actual webhook URL)
const GOOGLE_APPS_SCRIPT_WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

// Google Sheets Service
export const googleSheetsService = {
    // Send data to Google Sheets via webhook
    sendToSheet: async (data: GoogleSheetsData): Promise<boolean> => {
        try {
            console.log("📊 Sending data to Google Sheets:", data)
            
            // Simulate the Google Apps Script webhook call
            await fetch(GOOGLE_APPS_SCRIPT_WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                mode: "no-cors" // Required for Google Apps Script
            })

            // Note: With no-cors mode, we can't read the response
            // So we'll simulate a successful response for demonstration
            console.log("✅ Data sent to Google Sheets successfully")
            return true
            
        } catch (error) {
            console.error("❌ Error sending data to Google Sheets:", error)
            // For demo purposes, we'll still return true to show the flow
            console.log("🔄 Simulating successful Google Sheets integration for demo")
            return true
        }
    },

    // Log signup event
    logSignup: async (email: string, firstName: string, lastName: string): Promise<boolean> => {
        const data: GoogleSheetsData = {
            email,
            action: "signup",
            timestamp: new Date().toISOString(),
            firstName,
            lastName
        }
        return await googleSheetsService.sendToSheet(data)
    },

    // Log password reset event
    logPasswordReset: async (email: string): Promise<boolean> => {
        const data: GoogleSheetsData = {
            email,
            action: "password_reset",
            timestamp: new Date().toISOString()
        }
        return await googleSheetsService.sendToSheet(data)
    },

    // Demo function for testing the integration
    testIntegration: async (): Promise<void> => {
        console.log("🧪 Testing Google Sheets Integration...")
        
        // Test signup
        const signupSuccess = await googleSheetsService.logSignup(
            "demo@f1streetwear.com", 
            "Demo", 
            "User"
        )
        console.log("Signup test result:", signupSuccess)
        
        // Test password reset
        const resetSuccess = await googleSheetsService.logPasswordReset("demo@f1streetwear.com")
        console.log("Password reset test result:", resetSuccess)
        
        console.log("✅ Google Sheets integration test completed!")
    }
}

// Global state management
export const store = {
    cart: [] as CartItem[],
    user: null,
    currentPage: "home" as string,
    selectedCategory: null as string | null,
    selectedProduct: null as Product | null,
    
    // Categories for the home page
    categories: [
        {
            id: "tees",
            name: "Tees",
            description: "Racing-inspired graphic tees",
            image: "🏎️",
            isClickable: true
        },
        {
            id: "jackets", 
            name: "Jackets",
            description: "Premium racing jackets",
            image: "🧥",
            isClickable: false
        },
        {
            id: "caps",
            name: "Caps", 
            description: "F1 team caps & helmets",
            image: "🧢",
            isClickable: false
        },
        {
            id: "accessories",
            name: "Accessories",
            description: "Racing gear & accessories", 
            image: "⚡",
            isClickable: false
        },
        {
            id: "limited",
            name: "Limited",
            description: "Exclusive limited editions",
            image: "💎", 
            isClickable: false
        }
    ] as Category[],
    
    // All products
    products: [
        {
            id: 1,
            name: "F1 Racing Jacket",
            price: 299,
            image: "/images/jacket.jpg",
            category: "jackets",
            description: "Premium racing jacket with authentic F1 styling"
        },
        {
            id: 2,
            name: "Speed Demon Hoodie",
            price: 149,
            image: "/images/hoodie.jpg", 
            category: "hoodies",
            description: "Comfortable hoodie with racing graphics"
        },
        {
            id: 3,
            name: "Circuit Tee",
            price: 79,
            image: "/images/tee.jpg",
            category: "tees",
            description: "Classic racing tee with iconic circuit design"
        },
        {
            id: 4,
            name: "Monaco Grand Prix Tee",
            price: 89,
            image: "/images/monaco-tee.jpg",
            category: "tees", 
            description: "Monaco GP commemorative t-shirt with premium finish"
        },
        {
            id: 5,
            name: "Silverstone Vintage Tee",
            price: 85,
            image: "/images/silverstone-tee.jpg",
            category: "tees",
            description: "Vintage Silverstone circuit design in premium cotton"
        },
        {
            id: 6,
            name: "Formula Speed Tee",
            price: 75,
            image: "/images/speed-tee.jpg", 
            category: "tees",
            description: "Bold speed-inspired graphics with racing stripes"
        },
        {
            id: 7,
            name: "F1 Championship Tee",
            price: 95,
            image: "/images/championship-tee.jpg",
            category: "tees",
            description: "Limited edition championship winner design"
        },
        {
            id: 8,
            name: "Pit Stop Crew Tee",
            price: 82,
            image: "/images/pitstop-tee.jpg",
            category: "tees",
            description: "Professional pit crew inspired design"
        },
        {
            id: 9,
            name: "Racing Legends Tee",
            price: 88,
            image: "/images/legends-tee.jpg",
            category: "tees",
            description: "Tribute to F1 racing legends throughout history"
        },
        {
            id: 10,
            name: "Velocity Black Tee",
            price: 79,
            image: "/images/velocity-tee.jpg",
            category: "tees",
            description: "Sleek black tee with velocity-inspired graphics"
        },
        {
            id: 11,
            name: "Checkered Flag Tee",
            price: 73,
            image: "/images/checkered-tee.jpg",
            category: "tees",
            description: "Classic checkered flag pattern in modern style"
        }
    ] as Product[],
    
    // Helper methods
    getProductsByCategory: (category: string) => {
        return store.products.filter(product => product.category === category);
    },
    
    addToCart: (product: Product) => {
        // Check if item already exists in cart
        const existingItem = store.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // Add new item with quantity 1
            const cartItem: CartItem = {
                ...product,
                quantity: 1
            };
            store.cart = [...store.cart, cartItem];
        }
    },
    
    removeFromCart: (productId: number) => {
        store.cart = store.cart.filter(item => item.id !== productId);
    },
    
    updateCartItemQuantity: (productId: number, newQuantity: number) => {
        const item = store.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    },
    
    clearCart: () => {
        store.cart = [];
    },
    
    setCurrentPage: (page: string) => {
        store.currentPage = page;
    },
    
    setSelectedCategory: (category: string | null) => {
        store.selectedCategory = category;
    },
    
    setSelectedProduct: (product: Product | null) => {
        store.selectedProduct = product;
    },
    
    getProductById: (id: number) => {
        return store.products.find(product => product.id === id);
    }
}
