import React from "react"
import { motion } from "framer-motion"
import { theme, styles } from "./theme"

// Navigation Component
export const Navigation = () => {
    const navItems = [
        { label: "HOME", href: "#home" },
        { label: "SHOP", href: "#shop" },
        { label: "COLLECTIONS", href: "#collections" },
        { label: "ABOUT", href: "#about" },
        { label: "CONTACT", href: "#contact" }
    ]

    return (
        <motion.nav 
            style={styles.navigation}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: `0 ${theme.spacing.lg}px`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{
                        fontSize: 28,
                        fontWeight: 900,
                        fontFamily: theme.fonts.heading,
                        color: theme.colors.textPrimary,
                        letterSpacing: "0.1em"
                    }}
                >
                    F1 <span style={{ color: theme.colors.primary }}>STREETWEAR</span>
                </motion.div>

                {/* Navigation Links */}
                <div style={{
                    display: "flex",
                    gap: theme.spacing.xl,
                    alignItems: "center"
                }}>
                    {navItems.map((item, index) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            style={{
                                color: theme.colors.textSecondary,
                                textDecoration: "none",
                                fontSize: 14,
                                fontWeight: 600,
                                letterSpacing: "0.05em",
                                position: "relative",
                                padding: `${theme.spacing.sm}px 0`
                            }}
                            whileHover={{ 
                                color: theme.colors.primary,
                                scale: 1.1
                            }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.4,
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                        >
                            {item.label}
                            <motion.div
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: 2,
                                    backgroundColor: theme.colors.primary,
                                    scaleX: 0,
                                    originX: 0
                                }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                    ))}
                </div>

                {/* Cart Icon */}
                <motion.div
                    style={{
                        position: "relative",
                        cursor: "pointer"
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div style={{
                        width: 24,
                        height: 24,
                        border: `2px solid ${theme.colors.textSecondary}`,
                        borderRadius: theme.borderRadius.sm,
                        position: "relative"
                    }}>
                        <div style={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            width: 20,
                            height: 20,
                            backgroundColor: theme.colors.primary,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            fontWeight: 600,
                            color: theme.colors.textPrimary
                        }}>
                            0
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    )
}

// Hero Section Component
export const HeroSection = () => {
    return (
        <section style={{
            minHeight: "90vh",
            backgroundColor: theme.colors.background,
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Background Pattern */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface} 100%)`,
                opacity: 0.8
            }} />
            
            {/* Racing stripes */}
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "20%",
                    width: 4,
                    height: "100%",
                    backgroundColor: theme.colors.primary,
                    opacity: 0.3
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    right: "30%",
                    width: 2,
                    height: "100%",
                    backgroundColor: theme.colors.secondary,
                    opacity: 0.2
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
            />

            <div style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: `0 ${theme.spacing.lg}px`,
                position: "relative",
                zIndex: 2
            }}>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h1
                        style={{
                            fontSize: "clamp(3rem, 8vw, 6rem)",
                            fontWeight: 900,
                            fontFamily: theme.fonts.heading,
                            color: theme.colors.textPrimary,
                            margin: 0,
                            lineHeight: 1.1,
                            letterSpacing: "0.02em"
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        SPEED
                        <br />
                        <span style={{ color: theme.colors.primary }}>STYLE</span>
                        <br />
                        STREET
                    </motion.h1>

                    <motion.p
                        style={{
                            fontSize: 18,
                            color: theme.colors.textSecondary,
                            margin: `${theme.spacing.lg}px 0 ${theme.spacing.xl}px 0`,
                            maxWidth: 500,
                            lineHeight: 1.6
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Where Formula 1 meets street fashion. 
                        Premium racing-inspired apparel for the modern speed enthusiast.
                    </motion.p>

                    <motion.div
                        style={{
                            display: "flex",
                            gap: theme.spacing.md,
                            flexWrap: "wrap"
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <motion.button
                            style={styles.button.primary}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            SHOP COLLECTION
                        </motion.button>
                        
                        <motion.button
                            style={styles.button.secondary}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            WATCH LOOKBOOK
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

// Product Card Component
export const ProductCard = ({ product }: { product: any }) => {
    return (
        <motion.div
            style={styles.card}
            whileHover={{ 
                y: -10,
                boxShadow: theme.shadows.lg
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div style={{
                width: "100%",
                height: 300,
                backgroundColor: theme.colors.surfaceElevated,
                borderRadius: theme.borderRadius.md,
                marginBottom: theme.spacing.md,
                position: "relative",
                overflow: "hidden"
            }}>
                {/* Placeholder for product image */}
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: theme.colors.textMuted,
                    fontSize: 48
                }}>
                    📷
                </div>
            </div>
            
            <h3 style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 600,
                color: theme.colors.textPrimary,
                marginBottom: theme.spacing.sm
            }}>
                {product.name}
            </h3>
            
            <p style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 700,
                color: theme.colors.primary,
                marginBottom: theme.spacing.md
            }}>
                ${product.price}
            </p>
            
            <motion.button
                style={{
                    ...styles.button.primary,
                    width: "100%",
                    fontSize: 14
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                ADD TO CART
            </motion.button>
        </motion.div>
    )
}
