import React from "react"
import { Navigation, HeroSection, ProductCard } from "./code/components"
import { theme } from "./code/theme"

// Sample products data
const featuredProducts = [
    {
        id: 1,
        name: "F1 Racing Jacket",
        price: 299,
        image: "/images/jacket.jpg",
        category: "outerwear"
    },
    {
        id: 2,
        name: "Speed Demon Hoodie", 
        price: 149,
        image: "/images/hoodie.jpg",
        category: "hoodies"
    },
    {
        id: 3,
        name: "Circuit Tee",
        price: 79,
        image: "/images/tee.jpg",
        category: "tshirts"
    },
    {
        id: 4,
        name: "Podium Cap",
        price: 59,
        image: "/images/cap.jpg", 
        category: "accessories"
    }
]

// Main App Component
export default function App() {
    return (
        <div style={{
            backgroundColor: theme.colors.background,
            minHeight: "100vh",
            fontFamily: theme.fonts.primary
        }}>
            {/* Navigation */}
            <Navigation />
            
            {/* Hero Section */}
            <HeroSection />
            
            {/* Featured Products Section */}
            <section style={{
                padding: `${theme.spacing.xxl * 2}px ${theme.spacing.lg}px`,
                backgroundColor: theme.colors.background
            }}>
                <div style={{
                    maxWidth: 1200,
                    margin: "0 auto"
                }}>
                    <h2 style={{
                        fontSize: "clamp(2rem, 5vw, 3rem)",
                        fontWeight: 900,
                        fontFamily: theme.fonts.heading,
                        color: theme.colors.textPrimary,
                        textAlign: "center",
                        marginBottom: theme.spacing.xxl,
                        letterSpacing: "0.05em"
                    }}>
                        FEATURED <span style={{ color: theme.colors.primary }}>COLLECTION</span>
                    </h2>
                    
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: theme.spacing.lg,
                        marginBottom: theme.spacing.xxl
                    }}>
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    
                    <div style={{
                        textAlign: "center"
                    }}>
                        <button style={{
                            backgroundColor: "transparent",
                            color: theme.colors.textPrimary,
                            padding: `${theme.spacing.md}px ${theme.spacing.xl}px`,
                            borderRadius: theme.borderRadius.md,
                            border: `2px solid ${theme.colors.primary}`,
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}>
                            VIEW ALL PRODUCTS
                        </button>
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <footer style={{
                backgroundColor: theme.colors.surface,
                borderTop: `1px solid ${theme.colors.border}`,
                padding: `${theme.spacing.xxl}px ${theme.spacing.lg}px`,
                textAlign: "center"
            }}>
                <div style={{
                    maxWidth: 1200,
                    margin: "0 auto"
                }}>
                    <div style={{
                        fontSize: 24,
                        fontWeight: 900,
                        fontFamily: theme.fonts.heading,
                        color: theme.colors.textPrimary,
                        marginBottom: theme.spacing.lg,
                        letterSpacing: "0.1em"
                    }}>
                        F1 <span style={{ color: theme.colors.primary }}>STREETWEAR</span>
                    </div>
                    
                    <p style={{
                        color: theme.colors.textMuted,
                        margin: 0,
                        fontSize: 14
                    }}>
                        © 2025 F1 Streetwear. All rights reserved. Built with Framer.
                    </p>
                </div>
            </footer>
        </div>
    )
}
