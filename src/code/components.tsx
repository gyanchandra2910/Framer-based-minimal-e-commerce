import { motion } from "framer-motion"
import { theme, styles } from "./theme"
import { store } from "./store"
import { useState } from "react"

// Main App Router Component
export const AppRouter = () => {
    const [currentPage, setCurrentPage] = useState(store.currentPage)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const navigateToCategory = (categoryId: string) => {
        setSelectedCategory(categoryId)
        setCurrentPage("category")
        store.setCurrentPage("category")
        store.setSelectedCategory(categoryId)
    }

    const navigateToHome = () => {
        setCurrentPage("home")
        setSelectedCategory(null)
        store.setCurrentPage("home")
        store.setSelectedCategory(null)
    }

    return (
        <div style={{
            backgroundColor: theme.colors.background,
            minHeight: "100vh",
            fontFamily: theme.fonts.primary
        }}>
            <Navigation 
                onNavigateHome={navigateToHome}
                currentPage={currentPage}
            />
            
            {currentPage === "home" && (
                <HomePage onNavigateToCategory={navigateToCategory} />
            )}
            
            {currentPage === "category" && selectedCategory && (
                <CategoryPage 
                    category={selectedCategory}
                    onNavigateHome={navigateToHome}
                />
            )}
        </div>
    )
}

// Navigation Component
interface NavigationProps {
    onNavigateHome: () => void;
    currentPage: string;
}

export const Navigation = ({ onNavigateHome, currentPage }: NavigationProps) => {
    const navItems = [
        { label: "HOME", action: onNavigateHome },
        { label: "SHOP", action: () => {} },
        { label: "COLLECTIONS", action: () => {} },
        { label: "ABOUT", action: () => {} },
        { label: "CONTACT", action: () => {} }
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
                        letterSpacing: "0.1em",
                        cursor: "pointer"
                    }}
                    onClick={onNavigateHome}
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
                        <motion.button
                            key={item.label}
                            onClick={item.action}
                            style={{
                                background: "none",
                                border: "none",
                                color: currentPage === "home" && item.label === "HOME" 
                                    ? theme.colors.primary 
                                    : theme.colors.textSecondary,
                                textDecoration: "none",
                                fontSize: 14,
                                fontWeight: 600,
                                letterSpacing: "0.05em",
                                position: "relative",
                                padding: `${theme.spacing.sm}px 0`,
                                cursor: "pointer"
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
                        </motion.button>
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
                            {store.cart.length}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    )
}

// Home Page Component
interface HomePageProps {
    onNavigateToCategory: (categoryId: string) => void;
}

export const HomePage = ({ onNavigateToCategory }: HomePageProps) => {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />
            
            {/* Categories Section */}
            <CategoriesSection onNavigateToCategory={onNavigateToCategory} />
        </>
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
                zIndex: 2,
                width: "100%"
            }}>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        textAlign: "center"
                    }}
                >
                    <motion.h1
                        style={{
                            fontSize: "clamp(3rem, 8vw, 6rem)",
                            fontWeight: 900,
                            fontFamily: theme.fonts.heading,
                            color: theme.colors.textPrimary,
                            margin: 0,
                            lineHeight: 1.1,
                            letterSpacing: "0.02em",
                            marginBottom: theme.spacing.lg
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        SPEED
                        <br />
                        <span style={{ color: theme.colors.primary }}>MEETS</span>
                        <br />
                        STYLE
                    </motion.h1>

                    <motion.p
                        style={{
                            fontSize: 18,
                            color: theme.colors.textSecondary,
                            margin: `${theme.spacing.lg}px auto ${theme.spacing.xl}px auto`,
                            maxWidth: 600,
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
                            justifyContent: "center",
                            flexWrap: "wrap"
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <motion.button
                            style={{
                                ...styles.button.primary,
                                fontSize: 18,
                                padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            VIEW ALL
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

// Categories Section Component
interface CategoriesSectionProps {
    onNavigateToCategory: (categoryId: string) => void;
}

export const CategoriesSection = ({ onNavigateToCategory }: CategoriesSectionProps) => {
    return (
        <section style={{
            padding: `${theme.spacing.xxl * 2}px ${theme.spacing.lg}px`,
            backgroundColor: theme.colors.background
        }}>
            <div style={{
                maxWidth: 1200,
                margin: "0 auto"
            }}>
                <motion.h2
                    style={{
                        fontSize: "clamp(2rem, 5vw, 3rem)",
                        fontWeight: 900,
                        fontFamily: theme.fonts.heading,
                        color: theme.colors.textPrimary,
                        textAlign: "center",
                        marginBottom: theme.spacing.xxl,
                        letterSpacing: "0.05em"
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    SHOP <span style={{ color: theme.colors.primary }}>CATEGORIES</span>
                </motion.h2>
                
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: theme.spacing.lg,
                    marginBottom: theme.spacing.xxl
                }}>
                    {store.categories.map((category, index) => (
                        <CategoryCard 
                            key={category.id}
                            category={category}
                            index={index}
                            onNavigate={onNavigateToCategory}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

// Category Card Component
interface CategoryCardProps {
    category: {
        id: string;
        name: string;
        description: string;
        image: string;
        isClickable: boolean;
    };
    index: number;
    onNavigate: (categoryId: string) => void;
}

export const CategoryCard = ({ category, index, onNavigate }: CategoryCardProps) => {
    return (
        <motion.div
            style={{
                ...styles.card,
                cursor: category.isClickable ? "pointer" : "default",
                opacity: category.isClickable ? 1 : 0.7,
                position: "relative",
                overflow: "hidden"
            }}
            whileHover={category.isClickable ? { 
                y: -10,
                boxShadow: theme.shadows.glow,
                scale: 1.02
            } : {}}
            whileTap={category.isClickable ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: category.isClickable ? 1 : 0.7, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => category.isClickable && onNavigate(category.id)}
        >
            {/* Background Effect for clickable cards */}
            {category.isClickable && (
                <motion.div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${theme.colors.primary}10, transparent)`,
                        opacity: 0
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            )}
            
            <div style={{
                width: "100%",
                height: 120,
                backgroundColor: theme.colors.surfaceElevated,
                borderRadius: theme.borderRadius.md,
                marginBottom: theme.spacing.md,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{
                    fontSize: 48,
                    filter: category.isClickable ? "none" : "grayscale(50%)"
                }}>
                    {category.image}
                </div>
                
                {category.isClickable && (
                    <motion.div
                        style={{
                            position: "absolute",
                            top: theme.spacing.sm,
                            right: theme.spacing.sm,
                            width: 8,
                            height: 8,
                            backgroundColor: theme.colors.primary,
                            borderRadius: "50%"
                        }}
                        animate={{
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                )}
            </div>
            
            <h3 style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 700,
                color: category.isClickable ? theme.colors.textPrimary : theme.colors.textMuted,
                marginBottom: theme.spacing.sm,
                textAlign: "center"
            }}>
                {category.name}
            </h3>
            
            <p style={{
                margin: 0,
                fontSize: 14,
                color: theme.colors.textSecondary,
                textAlign: "center",
                lineHeight: 1.4
            }}>
                {category.description}
            </p>
            
            {!category.isClickable && (
                <div style={{
                    position: "absolute",
                    bottom: theme.spacing.sm,
                    right: theme.spacing.sm,
                    fontSize: 10,
                    color: theme.colors.textMuted,
                    fontWeight: 500,
                    opacity: 0.6
                }}>
                    COMING SOON
                </div>
            )}
        </motion.div>
    )
}

// Category Page Component
interface CategoryPageProps {
    category: string;
    onNavigateHome: () => void;
}

export const CategoryPage = ({ category, onNavigateHome }: CategoryPageProps) => {
    const categoryProducts = store.getProductsByCategory(category)
    const categoryInfo = store.categories.find(cat => cat.id === category)

    return (
        <div style={{
            minHeight: "100vh",
            padding: `${theme.spacing.xxl}px ${theme.spacing.lg}px`
        }}>
            <div style={{
                maxWidth: 1200,
                margin: "0 auto"
            }}>
                {/* Breadcrumb */}
                <motion.div
                    style={{
                        marginBottom: theme.spacing.xl,
                        display: "flex",
                        alignItems: "center",
                        gap: theme.spacing.sm
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={onNavigateHome}
                        style={{
                            background: "none",
                            border: "none",
                            color: theme.colors.textSecondary,
                            cursor: "pointer",
                            fontSize: 14
                        }}
                    >
                        ← Back to Home
                    </button>
                </motion.div>

                {/* Category Header */}
                <motion.div
                    style={{ marginBottom: theme.spacing.xxl }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 style={{
                        fontSize: "clamp(2.5rem, 6vw, 4rem)",
                        fontWeight: 900,
                        fontFamily: theme.fonts.heading,
                        color: theme.colors.textPrimary,
                        margin: 0,
                        marginBottom: theme.spacing.md,
                        letterSpacing: "0.05em"
                    }}>
                        {categoryInfo?.name?.toUpperCase()} <span style={{ color: theme.colors.primary }}>COLLECTION</span>
                    </h1>
                    <p style={{
                        fontSize: 18,
                        color: theme.colors.textSecondary,
                        margin: 0,
                        maxWidth: 600
                    }}>
                        {categoryInfo?.description} - Premium F1-inspired streetwear designed for speed enthusiasts.
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: theme.spacing.lg
                }}>
                    {categoryProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>

                {categoryProducts.length === 0 && (
                    <motion.div
                        style={{
                            textAlign: "center",
                            padding: theme.spacing.xxl,
                            color: theme.colors.textMuted
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3>Coming Soon</h3>
                        <p>New products will be added to this category soon.</p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

// Product Card Component
interface ProductCardProps {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
        category: string;
        description?: string;
    };
    index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
    return (
        <motion.div
            style={styles.card}
            whileHover={{ 
                y: -10,
                boxShadow: theme.shadows.lg
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
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
                    👕
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

            {product.description && (
                <p style={{
                    margin: 0,
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                    marginBottom: theme.spacing.sm,
                    lineHeight: 1.4
                }}>
                    {product.description}
                </p>
            )}
            
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
                onClick={() => store.addToCart(product)}
            >
                ADD TO CART
            </motion.button>
        </motion.div>
    )
}
