import { motion } from "framer-motion"
import { theme, styles } from "./theme"
import { store } from "./store"
import { useState } from "react"

// Main App Router Component
export const AppRouter = () => {
    const [currentPage, setCurrentPage] = useState(store.currentPage)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)

    const navigateToCategory = (categoryId: string) => {
        setSelectedCategory(categoryId)
        setSelectedProduct(null)
        setCurrentPage("category")
        store.setCurrentPage("category")
        store.setSelectedCategory(categoryId)
        store.setSelectedProduct(null)
    }

    const navigateToProduct = (product: any) => {
        setSelectedProduct(product)
        setCurrentPage("product")
        store.setCurrentPage("product")
        store.setSelectedProduct(product)
    }

    const navigateToHome = () => {
        setCurrentPage("home")
        setSelectedCategory(null)
        setSelectedProduct(null)
        store.setCurrentPage("home")
        store.setSelectedCategory(null)
        store.setSelectedProduct(null)
    }

    const navigateToCart = () => {
        setCurrentPage("cart")
        setSelectedCategory(null)
        setSelectedProduct(null)
        store.setCurrentPage("cart")
        store.setSelectedCategory(null)
        store.setSelectedProduct(null)
    }

    const navigateToLogin = () => {
        setCurrentPage("login")
        setSelectedCategory(null)
        setSelectedProduct(null)
        store.setCurrentPage("login")
        store.setSelectedCategory(null)
        store.setSelectedProduct(null)
    }

    const navigateToSignUp = () => {
        setCurrentPage("signup")
        setSelectedCategory(null)
        setSelectedProduct(null)
        store.setCurrentPage("signup")
        store.setSelectedCategory(null)
        store.setSelectedProduct(null)
    }

    const navigateToForgotPassword = () => {
        setCurrentPage("forgot-password")
        setSelectedCategory(null)
        setSelectedProduct(null)
        store.setCurrentPage("forgot-password")
        store.setSelectedCategory(null)
        store.setSelectedProduct(null)
    }

    return (
        <div style={{
            backgroundColor: theme.colors.background,
            minHeight: "100vh",
            fontFamily: theme.fonts.primary
        }}>
            <Navigation 
                onNavigateHome={navigateToHome}
                onNavigateToCart={navigateToCart}
                onNavigateToLogin={navigateToLogin}
                currentPage={currentPage}
            />
            
            {currentPage === "home" && (
                <HomePage onNavigateToCategory={navigateToCategory} />
            )}
            
            {currentPage === "category" && selectedCategory && (
                <CategoryPage 
                    category={selectedCategory}
                    onNavigateHome={navigateToHome}
                    onNavigateToProduct={navigateToProduct}
                />
            )}
            
            {currentPage === "product" && selectedProduct && (
                <ProductDetailPage 
                    product={selectedProduct}
                    onNavigateHome={navigateToHome}
                    onNavigateBack={() => {
                        if (selectedCategory) {
                            navigateToCategory(selectedCategory)
                        } else {
                            navigateToHome()
                        }
                    }}
                />
            )}

            {currentPage === "cart" && (
                <CartPage 
                    onNavigateHome={navigateToHome}
                    onNavigateToCategory={navigateToCategory}
                />
            )}

            {currentPage === "login" && (
                <LoginPage 
                    onNavigateHome={navigateToHome}
                    onNavigateToSignUp={navigateToSignUp}
                    onNavigateToForgotPassword={navigateToForgotPassword}
                />
            )}

            {currentPage === "signup" && (
                <SignUpPage 
                    onNavigateHome={navigateToHome}
                    onNavigateToLogin={navigateToLogin}
                />
            )}

            {currentPage === "forgot-password" && (
                <ForgotPasswordPage 
                    onNavigateHome={navigateToHome}
                    onNavigateToLogin={navigateToLogin}
                />
            )}
        </div>
    )
}

// Navigation Component
interface NavigationProps {
    onNavigateHome: () => void;
    onNavigateToCart: () => void;
    onNavigateToLogin: () => void;
    currentPage: string;
}

export const Navigation = ({ onNavigateHome, onNavigateToCart, onNavigateToLogin, currentPage }: NavigationProps) => {
    const navItems = [
        { label: "HOME", action: onNavigateHome },
        { label: "SHOP", action: () => {} },
        { label: "COLLECTIONS", action: () => {} },
        { label: "ABOUT", action: () => {} }
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

                {/* Login Button */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing.md
                }}>
                    <motion.button
                        onClick={onNavigateToLogin}
                        style={{
                            ...styles.button.secondary,
                            fontSize: 14,
                            padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                            borderColor: currentPage === "login" || currentPage === "signup" || currentPage === "forgot-password" 
                                ? theme.colors.primary 
                                : theme.colors.border,
                            color: currentPage === "login" || currentPage === "signup" || currentPage === "forgot-password"
                                ? theme.colors.primary 
                                : theme.colors.textSecondary
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        LOGIN
                    </motion.button>

                    {/* Cart Icon */}
                    <motion.div
                        style={{
                            position: "relative",
                            cursor: "pointer"
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNavigateToCart}
                    >
                        <div style={{
                            width: 24,
                            height: 24,
                            border: `2px solid ${currentPage === "cart" ? theme.colors.primary : theme.colors.textSecondary}`,
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
    onNavigateToProduct: (product: any) => void;
}

export const CategoryPage = ({ category, onNavigateHome, onNavigateToProduct }: CategoryPageProps) => {
    const [searchQuery, setSearchQuery] = useState("")
    const categoryProducts = store.getProductsByCategory(category)
    const categoryInfo = store.categories.find(cat => cat.id === category)
    
    // Filter products based on search query
    const filteredProducts = categoryProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    return (
        <div style={{
            minHeight: "100vh",
            padding: `${theme.spacing.xxl}px ${theme.spacing.lg}px`
        }}>
            <div style={{
                maxWidth: 1400,
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
                            fontSize: 14,
                            display: "flex",
                            alignItems: "center",
                            gap: theme.spacing.xs
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
                        maxWidth: 600,
                        marginBottom: theme.spacing.sm
                    }}>
                        {categoryInfo?.description} - Premium F1-inspired streetwear designed for speed enthusiasts.
                    </p>
                    <p style={{
                        fontSize: 14,
                        color: theme.colors.textMuted,
                        margin: 0
                    }}>
                        {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''} available
                    </p>
                </motion.div>

                {/* Search Section */}
                <motion.div
                    style={{ marginBottom: theme.spacing.xl }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div style={{
                        position: "relative",
                        maxWidth: 600,
                        margin: "0 auto"
                    }}>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: "100%",
                                padding: `${theme.spacing.md}px ${theme.spacing.xl}px ${theme.spacing.md}px ${theme.spacing.xxl}px`,
                                fontSize: 16,
                                backgroundColor: theme.colors.surface,
                                border: `2px solid ${theme.colors.border}`,
                                borderRadius: theme.borderRadius.md,
                                color: theme.colors.textPrimary,
                                outline: "none",
                                transition: "all 0.3s ease",
                                fontFamily: theme.fonts.primary
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = theme.colors.primary;
                                e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = theme.colors.border;
                                e.target.style.boxShadow = "none";
                            }}
                        />
                        {/* Search Icon */}
                        <div style={{
                            position: "absolute",
                            left: theme.spacing.lg,
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: 18,
                            color: theme.colors.textMuted
                        }}>
                            🔍
                        </div>
                        {/* Clear button */}
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                style={{
                                    position: "absolute",
                                    right: theme.spacing.lg,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    fontSize: 16,
                                    color: theme.colors.textMuted,
                                    cursor: "pointer",
                                    padding: theme.spacing.xs
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    
                    {/* Search Results Counter */}
                    {searchQuery && (
                        <motion.p
                            style={{
                                textAlign: "center",
                                fontSize: 14,
                                color: theme.colors.textSecondary,
                                marginTop: theme.spacing.md,
                                margin: `${theme.spacing.md}px auto 0`
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredProducts.length > 0 
                                ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} matching "${searchQuery}"`
                                : `No products found matching "${searchQuery}"`
                            }
                        </motion.p>
                    )}
                </motion.div>

                {/* Products Grid - 3 Column Responsive */}
                {filteredProducts.length > 0 ? (
                    <motion.div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                            gap: theme.spacing.xl,
                            justifyItems: "center"
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {filteredProducts.map((product, index) => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                index={index}
                                onNavigateToProduct={onNavigateToProduct}
                                isClickable={true}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        style={{
                            textAlign: "center",
                            padding: `${theme.spacing.xxl * 2}px ${theme.spacing.lg}px`,
                            color: theme.colors.textMuted
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {searchQuery ? (
                            <>
                                <div style={{
                                    fontSize: 64,
                                    marginBottom: theme.spacing.lg,
                                    opacity: 0.5
                                }}>
                                    🔍
                                </div>
                                <h3 style={{ 
                                    fontSize: 28, 
                                    marginBottom: theme.spacing.md,
                                    color: theme.colors.textPrimary,
                                    fontFamily: theme.fonts.heading
                                }}>
                                    No matching products found
                                </h3>
                                <p style={{
                                    fontSize: 16,
                                    marginBottom: theme.spacing.lg,
                                    maxWidth: 400,
                                    margin: `0 auto ${theme.spacing.lg}px`,
                                    lineHeight: 1.5
                                }}>
                                    We couldn't find any products matching "<span style={{ color: theme.colors.primary, fontWeight: 600 }}>{searchQuery}</span>". 
                                    Try adjusting your search terms or browse all products.
                                </p>
                                <motion.button
                                    onClick={() => setSearchQuery("")}
                                    style={{
                                        ...styles.button.secondary,
                                        fontSize: 14,
                                        padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Clear Search
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <div style={{
                                    fontSize: 64,
                                    marginBottom: theme.spacing.lg,
                                    opacity: 0.5
                                }}>
                                    📦
                                </div>
                                <h3 style={{ 
                                    fontSize: 28, 
                                    marginBottom: theme.spacing.md,
                                    color: theme.colors.textPrimary,
                                    fontFamily: theme.fonts.heading
                                }}>
                                    Coming Soon
                                </h3>
                                <p style={{
                                    fontSize: 16,
                                    maxWidth: 400,
                                    margin: "0 auto",
                                    lineHeight: 1.5
                                }}>
                                    New products will be added to this category soon. Check back later for exciting F1-inspired streetwear!
                                </p>
                            </>
                        )}
                    </motion.div>
                )}

                {/* Legacy fallback - remove this when above is working */}
                {categoryProducts.length === 0 && !searchQuery && (
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
                        <h3 style={{ fontSize: 24, marginBottom: theme.spacing.md }}>Coming Soon</h3>
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
    onNavigateToProduct?: (product: any) => void;
    isClickable?: boolean;
}

export const ProductCard = ({ product, index = 0, onNavigateToProduct, isClickable = false }: ProductCardProps) => {
    // Array of placeholder images/emojis for different tee styles
    const teeImages = ["👕", "🏎️", "🏁", "⚡", "🔥", "💨", "🎯", "⭐", "🎪"];
    const imageIndex = product.id % teeImages.length;

    return (
        <motion.div
            style={{
                ...styles.card,
                cursor: isClickable ? "pointer" : "default",
                maxWidth: 350,
                width: "100%"
            }}
            whileHover={{ 
                y: -10,
                boxShadow: isClickable ? theme.shadows.glow : theme.shadows.lg,
                scale: isClickable ? 1.02 : 1.01
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => isClickable && onNavigateToProduct && onNavigateToProduct(product)}
        >
            {/* Product Image */}
            <div style={{
                width: "100%",
                height: 280,
                backgroundColor: theme.colors.surfaceElevated,
                borderRadius: theme.borderRadius.md,
                marginBottom: theme.spacing.md,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(135deg, ${theme.colors.surfaceElevated} 0%, ${theme.colors.surface} 100%)`
            }}>
                {/* Placeholder Product Image */}
                <div style={{
                    fontSize: 64,
                    opacity: 0.8,
                    transform: `rotate(${(product.id * 7) % 30 - 15}deg)`
                }}>
                    {teeImages[imageIndex]}
                </div>
                
                {/* Racing Stripes Overlay */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: "20%",
                    width: 2,
                    height: "100%",
                    backgroundColor: theme.colors.primary,
                    opacity: 0.1
                }} />
                <div style={{
                    position: "absolute",
                    top: 0,
                    right: "25%",
                    width: 1,
                    height: "100%",
                    backgroundColor: theme.colors.secondary,
                    opacity: 0.1
                }} />
                
                {/* Price Badge */}
                <div style={{
                    position: "absolute",
                    top: theme.spacing.sm,
                    right: theme.spacing.sm,
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.textPrimary,
                    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
                    borderRadius: theme.borderRadius.sm,
                    fontSize: 12,
                    fontWeight: 600
                }}>
                    ${product.price}
                </div>
            </div>
            
            {/* Product Info */}
            <div style={{ padding: `0 ${theme.spacing.sm}px` }}>
                <h3 style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 600,
                    color: theme.colors.textPrimary,
                    marginBottom: theme.spacing.sm,
                    lineHeight: 1.3
                }}>
                    {product.name}
                </h3>

                {product.description && (
                    <p style={{
                        margin: 0,
                        fontSize: 14,
                        color: theme.colors.textSecondary,
                        marginBottom: theme.spacing.md,
                        lineHeight: 1.4,
                        height: "2.8em",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical"
                    }}>
                        {product.description}
                    </p>
                )}
                
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: theme.spacing.md
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: 24,
                        fontWeight: 700,
                        color: theme.colors.primary
                    }}>
                        ${product.price}
                    </p>
                    
                    {!isClickable && (
                        <motion.button
                            style={{
                                ...styles.button.primary,
                                fontSize: 12,
                                padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                store.addToCart(product);
                            }}
                        >
                            ADD TO CART
                        </motion.button>
                    )}
                </div>
                
                {isClickable && (
                    <motion.div
                        style={{
                            marginTop: theme.spacing.md,
                            padding: `${theme.spacing.sm}px 0`,
                            textAlign: "center",
                            borderTop: `1px solid ${theme.colors.border}`,
                            color: theme.colors.primary,
                            fontSize: 14,
                            fontWeight: 600
                        }}
                    >
                        Click to view details →
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

// Product Detail Page Component
interface ProductDetailPageProps {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
        category: string;
        description?: string;
    };
    onNavigateHome: () => void;
    onNavigateBack: () => void;
}

export const ProductDetailPage = ({ product, onNavigateHome, onNavigateBack }: ProductDetailPageProps) => {
    const [selectedSize, setSelectedSize] = useState("M")
    const [quantity, setQuantity] = useState(1)
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
    
    // Array of placeholder images/emojis for different tee styles
    const teeImages = ["👕", "🏎️", "🏁", "⚡", "🔥", "💨", "🎯", "⭐", "🎪"];
    const imageIndex = product.id % teeImages.length;

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
                        gap: theme.spacing.md
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
                        Home
                    </button>
                    <span style={{ color: theme.colors.textMuted }}>→</span>
                    <button
                        onClick={onNavigateBack}
                        style={{
                            background: "none",
                            border: "none",
                            color: theme.colors.textSecondary,
                            cursor: "pointer",
                            fontSize: 14
                        }}
                    >
                        Tees
                    </button>
                    <span style={{ color: theme.colors.textMuted }}>→</span>
                    <span style={{ color: theme.colors.primary, fontSize: 14 }}>
                        {product.name}
                    </span>
                </motion.div>

                {/* Product Detail Layout */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                    gap: theme.spacing.xxl,
                    alignItems: "start"
                }}>
                    {/* Product Image */}
                    <motion.div
                        style={{
                            position: "sticky",
                            top: theme.spacing.xxl
                        }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{
                            width: "100%",
                            height: 600,
                            backgroundColor: theme.colors.surfaceElevated,
                            borderRadius: theme.borderRadius.lg,
                            position: "relative",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: `linear-gradient(135deg, ${theme.colors.surfaceElevated} 0%, ${theme.colors.surface} 100%)`
                        }}>
                            {/* Main Product Image */}
                            <div style={{
                                fontSize: 120,
                                opacity: 0.9,
                                transform: `rotate(${(product.id * 5) % 20 - 10}deg)`
                            }}>
                                {teeImages[imageIndex]}
                            </div>
                            
                            {/* Racing Design Elements */}
                            <motion.div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: "15%",
                                    width: 3,
                                    height: "100%",
                                    backgroundColor: theme.colors.primary,
                                    opacity: 0.2
                                }}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                            <motion.div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: "20%",
                                    width: 2,
                                    height: "100%",
                                    backgroundColor: theme.colors.secondary,
                                    opacity: 0.15
                                }}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 1, delay: 0.7 }}
                            />
                        </div>
                    </motion.div>

                    {/* Product Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Product Title */}
                        <h1 style={{
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 900,
                            fontFamily: theme.fonts.heading,
                            color: theme.colors.textPrimary,
                            margin: 0,
                            marginBottom: theme.spacing.md,
                            letterSpacing: "0.02em",
                            lineHeight: 1.2
                        }}>
                            {product.name}
                        </h1>

                        {/* Price */}
                        <p style={{
                            fontSize: 32,
                            fontWeight: 700,
                            color: theme.colors.primary,
                            margin: 0,
                            marginBottom: theme.spacing.lg
                        }}>
                            ${product.price}
                        </p>

                        {/* Description */}
                        <p style={{
                            fontSize: 16,
                            color: theme.colors.textSecondary,
                            lineHeight: 1.6,
                            marginBottom: theme.spacing.xl
                        }}>
                            {product.description || "Premium F1-inspired streetwear designed for racing enthusiasts. Made with high-quality materials for comfort and style."}
                        </p>

                        {/* Size Selection */}
                        <div style={{ marginBottom: theme.spacing.xl }}>
                            <h3 style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: theme.colors.textPrimary,
                                marginBottom: theme.spacing.md
                            }}>
                                Size
                            </h3>
                            <div style={{
                                display: "flex",
                                gap: theme.spacing.sm,
                                flexWrap: "wrap"
                            }}>
                                {sizes.map((size) => (
                                    <motion.button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        style={{
                                            padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
                                            border: `2px solid ${selectedSize === size ? theme.colors.primary : theme.colors.border}`,
                                            backgroundColor: selectedSize === size ? `${theme.colors.primary}20` : "transparent",
                                            color: selectedSize === size ? theme.colors.primary : theme.colors.textSecondary,
                                            borderRadius: theme.borderRadius.sm,
                                            fontSize: 14,
                                            fontWeight: 600,
                                            cursor: "pointer",
                                            minWidth: 48
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {size}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selection */}
                        <div style={{ marginBottom: theme.spacing.xl }}>
                            <h3 style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: theme.colors.textPrimary,
                                marginBottom: theme.spacing.md
                            }}>
                                Quantity
                            </h3>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: theme.spacing.md
                            }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        border: `2px solid ${theme.colors.border}`,
                                        backgroundColor: "transparent",
                                        color: theme.colors.textPrimary,
                                        borderRadius: theme.borderRadius.sm,
                                        fontSize: 18,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    −
                                </button>
                                <span style={{
                                    fontSize: 18,
                                    fontWeight: 600,
                                    color: theme.colors.textPrimary,
                                    minWidth: 30,
                                    textAlign: "center"
                                }}>
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        border: `2px solid ${theme.colors.border}`,
                                        backgroundColor: "transparent",
                                        color: theme.colors.textPrimary,
                                        borderRadius: theme.borderRadius.sm,
                                        fontSize: 18,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <motion.button
                            style={{
                                ...styles.button.primary,
                                width: "100%",
                                fontSize: 18,
                                padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
                                marginBottom: theme.spacing.md
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                // Add to cart with selected options
                                for (let i = 0; i < quantity; i++) {
                                    store.addToCart(product);
                                }
                            }}
                        >
                            ADD TO CART - ${(product.price * quantity).toFixed(2)}
                        </motion.button>

                        {/* Product Features */}
                        <div style={{
                            padding: theme.spacing.lg,
                            backgroundColor: theme.colors.surface,
                            borderRadius: theme.borderRadius.md,
                            border: `1px solid ${theme.colors.border}`
                        }}>
                            <h4 style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: theme.colors.textPrimary,
                                marginBottom: theme.spacing.sm,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em"
                            }}>
                                F1 Racing Features
                            </h4>
                            <ul style={{
                                margin: 0,
                                paddingLeft: theme.spacing.md,
                                color: theme.colors.textSecondary,
                                fontSize: 14,
                                lineHeight: 1.6
                            }}>
                                <li>Premium racing-inspired design</li>
                                <li>100% breathable cotton blend</li>
                                <li>Moisture-wicking technology</li>
                                <li>Official F1 Streetwear collection</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

// Cart Page Component
interface CartPageProps {
    onNavigateHome: () => void;
    onNavigateToCategory: (categoryId: string) => void;
}

export const CartPage = ({ onNavigateHome, onNavigateToCategory }: CartPageProps) => {
    const [cartItems, setCartItems] = useState(store.cart)
    
    // Calculate subtotal
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    
    // Update quantity for an item
    const updateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            // Remove item if quantity is 0 or less
            store.removeFromCart(itemId)
        } else {
            // Update quantity
            store.updateCartItemQuantity(itemId, newQuantity)
        }
        setCartItems([...store.cart]) // Force re-render
    }
    
    // Remove item from cart
    const removeItem = (itemId: number) => {
        store.removeFromCart(itemId)
        setCartItems([...store.cart]) // Force re-render
    }

    return (
        <div style={{
            minHeight: "100vh",
            padding: `${theme.spacing.xxl}px ${theme.spacing.lg}px`
        }}>
            <div style={{
                maxWidth: 1000,
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
                            fontSize: 14,
                            display: "flex",
                            alignItems: "center",
                            gap: theme.spacing.xs
                        }}
                    >
                        ← Back to Home
                    </button>
                </motion.div>

                {/* Cart Header */}
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
                        SHOPPING <span style={{ color: theme.colors.primary }}>CART</span>
                    </h1>
                    <p style={{
                        fontSize: 16,
                        color: theme.colors.textSecondary,
                        margin: 0
                    }}>
                        {cartItems.length === 0 
                            ? "Your cart is empty" 
                            : `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`
                        }
                    </p>
                </motion.div>

                {cartItems.length === 0 ? (
                    /* Empty Cart State */
                    <motion.div
                        style={{
                            textAlign: "center",
                            padding: `${theme.spacing.xxl * 2}px ${theme.spacing.lg}px`,
                            color: theme.colors.textMuted
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{
                            fontSize: 80,
                            marginBottom: theme.spacing.xl,
                            opacity: 0.5
                        }}>
                            🛒
                        </div>
                        <h3 style={{ 
                            fontSize: 28, 
                            marginBottom: theme.spacing.md,
                            color: theme.colors.textPrimary,
                            fontFamily: theme.fonts.heading
                        }}>
                            Your cart is empty
                        </h3>
                        <p style={{
                            fontSize: 16,
                            marginBottom: theme.spacing.xl,
                            maxWidth: 400,
                            margin: `0 auto ${theme.spacing.xl}px`,
                            lineHeight: 1.5
                        }}>
                            Add some F1-inspired streetwear to your cart and get ready to race in style!
                        </p>
                        <motion.button
                            onClick={() => onNavigateToCategory("tees")}
                            style={{
                                ...styles.button.primary,
                                fontSize: 16,
                                padding: `${theme.spacing.md}px ${theme.spacing.xl}px`
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            SHOP TEES
                        </motion.button>
                    </motion.div>
                ) : (
                    /* Cart Items */
                    <>
                        <motion.div
                            style={{
                                marginBottom: theme.spacing.xxl
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {cartItems.map((item, index) => (
                                <CartItem
                                    key={`${item.id}-${index}`}
                                    item={item}
                                    index={index}
                                    onUpdateQuantity={updateQuantity}
                                    onRemoveItem={removeItem}
                                />
                            ))}
                        </motion.div>

                        {/* Cart Summary */}
                        <motion.div
                            style={{
                                borderTop: `2px solid ${theme.colors.border}`,
                                paddingTop: theme.spacing.xl,
                                marginTop: theme.spacing.xl
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: theme.spacing.xl,
                                padding: `${theme.spacing.lg}px 0`
                            }}>
                                <h3 style={{
                                    fontSize: 24,
                                    fontWeight: 700,
                                    color: theme.colors.textPrimary,
                                    margin: 0,
                                    fontFamily: theme.fonts.heading
                                }}>
                                    SUBTOTAL:
                                </h3>
                                <p style={{
                                    fontSize: 32,
                                    fontWeight: 900,
                                    color: theme.colors.primary,
                                    margin: 0,
                                    fontFamily: theme.fonts.heading
                                }}>
                                    ${subtotal.toFixed(2)}
                                </p>
                            </div>

                            <motion.button
                                style={{
                                    ...styles.button.primary,
                                    width: "100%",
                                    fontSize: 20,
                                    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
                                    marginBottom: theme.spacing.md
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    // Placeholder for checkout functionality
                                    alert(`Checkout functionality would process $${subtotal.toFixed(2)} worth of items!`)
                                }}
                            >
                                CHECKOUT - ${subtotal.toFixed(2)}
                            </motion.button>

                            <motion.button
                                onClick={() => onNavigateToCategory("tees")}
                                style={{
                                    ...styles.button.secondary,
                                    width: "100%",
                                    fontSize: 16,
                                    padding: `${theme.spacing.md}px ${theme.spacing.lg}px`
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                CONTINUE SHOPPING
                            </motion.button>
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    )
}

// Cart Item Component
interface CartItemProps {
    item: {
        id: number;
        name: string;
        price: number;
        image: string;
        category: string;
        description?: string;
        quantity: number;
    };
    index: number;
    onUpdateQuantity: (itemId: number, newQuantity: number) => void;
    onRemoveItem: (itemId: number) => void;
}

export const CartItem = ({ item, index, onUpdateQuantity, onRemoveItem }: CartItemProps) => {
    // Array of placeholder images/emojis for different tee styles
    const teeImages = ["👕", "🏎️", "🏁", "⚡", "🔥", "💨", "🎯", "⭐", "🎪"];
    const imageIndex = item.id % teeImages.length;

    return (
        <motion.div
            style={{
                display: "flex",
                gap: theme.spacing.lg,
                padding: theme.spacing.lg,
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                border: `1px solid ${theme.colors.border}`,
                marginBottom: theme.spacing.lg,
                alignItems: "center"
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ 
                boxShadow: theme.shadows.lg,
                borderColor: theme.colors.primary + "30"
            }}
        >
            {/* Product Image */}
            <div style={{
                width: 120,
                height: 120,
                backgroundColor: theme.colors.surfaceElevated,
                borderRadius: theme.borderRadius.md,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: `linear-gradient(135deg, ${theme.colors.surfaceElevated} 0%, ${theme.colors.surface} 100%)`
            }}>
                <div style={{
                    fontSize: 40,
                    opacity: 0.8,
                    transform: `rotate(${(item.id * 5) % 20 - 10}deg)`
                }}>
                    {teeImages[imageIndex]}
                </div>
            </div>

            {/* Product Info */}
            <div style={{
                flex: 1,
                minWidth: 0 // Allow text to wrap
            }}>
                <h3 style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 600,
                    color: theme.colors.textPrimary,
                    marginBottom: theme.spacing.xs
                }}>
                    {item.name}
                </h3>
                <p style={{
                    margin: 0,
                    fontSize: 14,
                    color: theme.colors.textSecondary,
                    marginBottom: theme.spacing.sm
                }}>
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </p>
                <p style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 700,
                    color: theme.colors.primary
                }}>
                    ${item.price}
                </p>
            </div>

            {/* Quantity Controls */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: theme.spacing.md
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing.sm,
                    backgroundColor: theme.colors.surfaceElevated,
                    borderRadius: theme.borderRadius.md,
                    padding: theme.spacing.xs
                }}>
                    <motion.button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        style={{
                            width: 32,
                            height: 32,
                            border: `1px solid ${theme.colors.border}`,
                            backgroundColor: "transparent",
                            color: theme.colors.textPrimary,
                            borderRadius: theme.borderRadius.sm,
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        whileHover={{ backgroundColor: theme.colors.surface }}
                        whileTap={{ scale: 0.95 }}
                    >
                        −
                    </motion.button>
                    <span style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: theme.colors.textPrimary,
                        minWidth: 30,
                        textAlign: "center"
                    }}>
                        {item.quantity}
                    </span>
                    <motion.button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        style={{
                            width: 32,
                            height: 32,
                            border: `1px solid ${theme.colors.border}`,
                            backgroundColor: "transparent",
                            color: theme.colors.textPrimary,
                            borderRadius: theme.borderRadius.sm,
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        whileHover={{ backgroundColor: theme.colors.surface }}
                        whileTap={{ scale: 0.95 }}
                    >
                        +
                    </motion.button>
                </div>

                {/* Total Price for this item */}
                <p style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 700,
                    color: theme.colors.primary
                }}>
                    ${(item.price * item.quantity).toFixed(2)}
                </p>
            </div>

            {/* Remove Button */}
            <motion.button
                onClick={() => onRemoveItem(item.id)}
                style={{
                    width: 40,
                    height: 40,
                    border: `1px solid ${theme.colors.border}`,
                    backgroundColor: "transparent",
                    color: theme.colors.textMuted,
                    borderRadius: theme.borderRadius.sm,
                    fontSize: 18,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                }}
                whileHover={{ 
                    backgroundColor: theme.colors.primary + "20",
                    color: theme.colors.primary,
                    borderColor: theme.colors.primary
                }}
                whileTap={{ scale: 0.95 }}
                title="Remove item"
            >
                🗑️
            </motion.button>
        </motion.div>
    )
}

// Login Page Component
interface LoginPageProps {
    onNavigateHome: () => void;
    onNavigateToSignUp: () => void;
    onNavigateToForgotPassword: () => void;
}

export const LoginPage = ({ onNavigateHome, onNavigateToSignUp, onNavigateToForgotPassword }: LoginPageProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = () => {
        setIsLoading(true)
        // Simulate login process
        setTimeout(() => {
            setIsLoading(false)
            alert(`Login successful for ${email}!`)
            onNavigateHome()
        }, 1500)
    }

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: theme.spacing.lg,
            background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface} 100%)`
        }}>
            <motion.div
                style={{
                    width: "100%",
                    maxWidth: 450,
                    backgroundColor: theme.colors.surface,
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing.xxl,
                    border: `1px solid ${theme.colors.border}`,
                    boxShadow: theme.shadows.lg
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: theme.spacing.xxl }}>
                    <motion.h1
                        style={{
                            fontSize: 32,
                            fontWeight: 900,
                            fontFamily: theme.fonts.heading,
                            color: theme.colors.textPrimary,
                            margin: 0,
                            marginBottom: theme.spacing.sm,
                            letterSpacing: "0.05em"
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        WELCOME <span style={{ color: theme.colors.primary }}>BACK</span>
                    </motion.h1>
                    <motion.p
                        style={{
                            fontSize: 16,
                            color: theme.colors.textSecondary,
                            margin: 0
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Sign in to your F1 Streetwear account
                    </motion.p>
                </div>

                {/* Login Form */}
                <motion.form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleLogin()
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* Email Field */}
                    <div style={{ marginBottom: theme.spacing.lg }}>
                        <label style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            color: theme.colors.textPrimary,
                            marginBottom: theme.spacing.sm
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: theme.spacing.md,
                                fontSize: 16,
                                backgroundColor: theme.colors.surfaceElevated,
                                border: `2px solid ${theme.colors.border}`,
                                borderRadius: theme.borderRadius.md,
                                color: theme.colors.textPrimary,
                                outline: "none",
                                transition: "all 0.3s ease",
                                fontFamily: theme.fonts.primary
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = theme.colors.primary;
                                e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = theme.colors.border;
                                e.target.style.boxShadow = "none";
                            }}
                            placeholder="your@email.com"
                        />
                    </div>

                    {/* Password Field */}
                    <div style={{ marginBottom: theme.spacing.xl }}>
                        <label style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            color: theme.colors.textPrimary,
                            marginBottom: theme.spacing.sm
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: theme.spacing.md,
                                fontSize: 16,
                                backgroundColor: theme.colors.surfaceElevated,
                                border: `2px solid ${theme.colors.border}`,
                                borderRadius: theme.borderRadius.md,
                                color: theme.colors.textPrimary,
                                outline: "none",
                                transition: "all 0.3s ease",
                                fontFamily: theme.fonts.primary
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = theme.colors.primary;
                                e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = theme.colors.border;
                                e.target.style.boxShadow = "none";
                            }}
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div style={{ 
                        textAlign: "right", 
                        marginBottom: theme.spacing.xl 
                    }}>
                        <button
                            type="button"
                            onClick={onNavigateToForgotPassword}
                            style={{
                                background: "none",
                                border: "none",
                                color: theme.colors.primary,
                                fontSize: 14,
                                cursor: "pointer",
                                textDecoration: "underline"
                            }}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            ...styles.button.primary,
                            width: "100%",
                            fontSize: 16,
                            padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
                            marginBottom: theme.spacing.lg,
                            opacity: isLoading ? 0.7 : 1
                        }}
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                    >
                        {isLoading ? "SIGNING IN..." : "SIGN IN"}
                    </motion.button>

                    {/* Sign Up Link */}
                    <div style={{ textAlign: "center" }}>
                        <p style={{
                            fontSize: 14,
                            color: theme.colors.textSecondary,
                            margin: 0
                        }}>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={onNavigateToSignUp}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: theme.colors.primary,
                                    fontSize: 14,
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    fontWeight: 600
                                }}
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </motion.form>

                {/* Back to Home */}
                <motion.div
                    style={{
                        textAlign: "center",
                        marginTop: theme.spacing.xl,
                        paddingTop: theme.spacing.lg,
                        borderTop: `1px solid ${theme.colors.border}`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <button
                        onClick={onNavigateHome}
                        style={{
                            background: "none",
                            border: "none",
                            color: theme.colors.textSecondary,
                            fontSize: 14,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: theme.spacing.xs,
                            margin: "0 auto"
                        }}
                    >
                        ← Back to Home
                    </button>
                </motion.div>
            </motion.div>
        </div>
    )
}

// Sign Up Page Component
interface SignUpPageProps {
    onNavigateHome: () => void;
    onNavigateToLogin: () => void;
}

export const SignUpPage = ({ onNavigateHome, onNavigateToLogin }: SignUpPageProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match!")
            return
        }
        
        setIsLoading(true)
        // Simulate sign up process
        setTimeout(() => {
            setIsLoading(false)
            alert(`Account created successfully for ${firstName} ${lastName}!`)
            onNavigateToLogin()
        }, 2000)
    }

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: theme.spacing.lg,
            background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface} 100%)`
        }}>
            <motion.div
                style={{
                    width: "100%",
                    maxWidth: 500,
                    backgroundColor: theme.colors.surface,
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing.xxl,
                    border: `1px solid ${theme.colors.border}`,
                    boxShadow: theme.shadows.lg
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: theme.spacing.xxl }}>
                    <motion.h1
                        style={{
                            fontSize: 32,
                            fontWeight: 900,
                            fontFamily: theme.fonts.heading,
                            color: theme.colors.textPrimary,
                            margin: 0,
                            marginBottom: theme.spacing.sm,
                            letterSpacing: "0.05em"
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        JOIN THE <span style={{ color: theme.colors.primary }}>RACE</span>
                    </motion.h1>
                    <motion.p
                        style={{
                            fontSize: 16,
                            color: theme.colors.textSecondary,
                            margin: 0
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Create your F1 Streetwear account
                    </motion.p>
                </div>

                {/* Sign Up Form */}
                <motion.form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSignUp()
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* Name Fields */}
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "1fr 1fr", 
                        gap: theme.spacing.md,
                        marginBottom: theme.spacing.lg 
                    }}>
                        <div>
                            <label style={{
                                display: "block",
                                fontSize: 14,
                                fontWeight: 600,
                                color: theme.colors.textPrimary,
                                marginBottom: theme.spacing.sm
                            }}>
                                First Name
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: theme.spacing.md,
                                    fontSize: 16,
                                    backgroundColor: theme.colors.surfaceElevated,
                                    border: `2px solid ${theme.colors.border}`,
                                    borderRadius: theme.borderRadius.md,
                                    color: theme.colors.textPrimary,
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    fontFamily: theme.fonts.primary
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = theme.colors.primary;
                                    e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = theme.colors.border;
                                    e.target.style.boxShadow = "none";
                                }}
                                placeholder="John"
                            />
                        </div>

                        <div>
                            <label style={{
                                display: "block",
                                fontSize: 14,
                                fontWeight: 600,
                                color: theme.colors.textPrimary,
                                marginBottom: theme.spacing.sm
                            }}>
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: theme.spacing.md,
                                    fontSize: 16,
                                    backgroundColor: theme.colors.surfaceElevated,
                                    border: `2px solid ${theme.colors.border}`,
                                    borderRadius: theme.borderRadius.md,
                                    color: theme.colors.textPrimary,
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    fontFamily: theme.fonts.primary
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = theme.colors.primary;
                                    e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = theme.colors.border;
                                    e.target.style.boxShadow = "none";
                                }}
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div style={{ marginBottom: theme.spacing.lg }}>
                        <label style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            color: theme.colors.textPrimary,
                            marginBottom: theme.spacing.sm
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: theme.spacing.md,
                                fontSize: 16,
                                backgroundColor: theme.colors.surfaceElevated,
                                border: `2px solid ${theme.colors.border}`,
                                borderRadius: theme.borderRadius.md,
                                color: theme.colors.textPrimary,
                                outline: "none",
                                transition: "all 0.3s ease",
                                fontFamily: theme.fonts.primary
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = theme.colors.primary;
                                e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = theme.colors.border;
                                e.target.style.boxShadow = "none";
                            }}
                            placeholder="your@email.com"
                        />
                    </div>

                    {/* Password Fields */}
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "1fr 1fr", 
                        gap: theme.spacing.md,
                        marginBottom: theme.spacing.xl 
                    }}>
                        <div>
                            <label style={{
                                display: "block",
                                fontSize: 14,
                                fontWeight: 600,
                                color: theme.colors.textPrimary,
                                marginBottom: theme.spacing.sm
                            }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: theme.spacing.md,
                                    fontSize: 16,
                                    backgroundColor: theme.colors.surfaceElevated,
                                    border: `2px solid ${theme.colors.border}`,
                                    borderRadius: theme.borderRadius.md,
                                    color: theme.colors.textPrimary,
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    fontFamily: theme.fonts.primary
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = theme.colors.primary;
                                    e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = theme.colors.border;
                                    e.target.style.boxShadow = "none";
                                }}
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label style={{
                                display: "block",
                                fontSize: 14,
                                fontWeight: 600,
                                color: theme.colors.textPrimary,
                                marginBottom: theme.spacing.sm
                            }}>
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: theme.spacing.md,
                                    fontSize: 16,
                                    backgroundColor: theme.colors.surfaceElevated,
                                    border: `2px solid ${theme.colors.border}`,
                                    borderRadius: theme.borderRadius.md,
                                    color: theme.colors.textPrimary,
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    fontFamily: theme.fonts.primary
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = theme.colors.primary;
                                    e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = theme.colors.border;
                                    e.target.style.boxShadow = "none";
                                }}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            ...styles.button.primary,
                            width: "100%",
                            fontSize: 16,
                            padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
                            marginBottom: theme.spacing.lg,
                            opacity: isLoading ? 0.7 : 1
                        }}
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                    >
                        {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                    </motion.button>

                    {/* Login Link */}
                    <div style={{ textAlign: "center" }}>
                        <p style={{
                            fontSize: 14,
                            color: theme.colors.textSecondary,
                            margin: 0
                        }}>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={onNavigateToLogin}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: theme.colors.primary,
                                    fontSize: 14,
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    fontWeight: 600
                                }}
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </motion.form>

                {/* Back to Home */}
                <motion.div
                    style={{
                        textAlign: "center",
                        marginTop: theme.spacing.xl,
                        paddingTop: theme.spacing.lg,
                        borderTop: `1px solid ${theme.colors.border}`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <button
                        onClick={onNavigateHome}
                        style={{
                            background: "none",
                            border: "none",
                            color: theme.colors.textSecondary,
                            fontSize: 14,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: theme.spacing.xs,
                            margin: "0 auto"
                        }}
                    >
                        ← Back to Home
                    </button>
                </motion.div>
            </motion.div>
        </div>
    )
}

// Forgot Password Page Component
interface ForgotPasswordPageProps {
    onNavigateHome: () => void;
    onNavigateToLogin: () => void;
}

export const ForgotPasswordPage = ({ onNavigateHome, onNavigateToLogin }: ForgotPasswordPageProps) => {
    const [step, setStep] = useState<"email" | "otp" | "reset">("email")
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [generatedOtp] = useState("123456") // Simulated OTP

    const handleSendOtp = () => {
        setIsLoading(true)
        // Simulate OTP sending
        setTimeout(() => {
            setIsLoading(false)
            setStep("otp")
            alert(`OTP sent to ${email}! Use: ${generatedOtp}`)
        }, 1500)
    }

    const handleVerifyOtp = () => {
        if (otp !== generatedOtp) {
            alert("Invalid OTP! Please try again.")
            return
        }
        setStep("reset")
    }

    const handleResetPassword = () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords don't match!")
            return
        }
        
        setIsLoading(true)
        // Simulate password reset
        setTimeout(() => {
            setIsLoading(false)
            alert("Password reset successfully!")
            onNavigateToLogin()
        }, 1500)
    }

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: theme.spacing.lg,
            background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface} 100%)`
        }}>
            <motion.div
                style={{
                    width: "100%",
                    maxWidth: 450,
                    backgroundColor: theme.colors.surface,
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing.xxl,
                    border: `1px solid ${theme.colors.border}`,
                    boxShadow: theme.shadows.lg
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: theme.spacing.xxl }}>
                    <motion.h1
                        style={{
                            fontSize: 32,
                            fontWeight: 900,
                            fontFamily: theme.fonts.heading,
                            color: theme.colors.textPrimary,
                            margin: 0,
                            marginBottom: theme.spacing.sm,
                            letterSpacing: "0.05em"
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {step === "email" && <>FORGOT <span style={{ color: theme.colors.primary }}>PASSWORD</span></>}
                        {step === "otp" && <>VERIFY <span style={{ color: theme.colors.primary }}>OTP</span></>}
                        {step === "reset" && <>RESET <span style={{ color: theme.colors.primary }}>PASSWORD</span></>}
                    </motion.h1>
                    <motion.p
                        style={{
                            fontSize: 16,
                            color: theme.colors.textSecondary,
                            margin: 0
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {step === "email" && "Enter your email to receive an OTP"}
                        {step === "otp" && `Enter the OTP sent to ${email}`}
                        {step === "reset" && "Create your new password"}
                    </motion.p>
                </div>

                {/* Step Progress */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: theme.spacing.xl,
                    gap: theme.spacing.sm
                }}>
                    {["email", "otp", "reset"].map((stepName) => (
                        <div
                            key={stepName}
                            style={{
                                width: 40,
                                height: 4,
                                backgroundColor: step === stepName || 
                                    (step === "otp" && stepName === "email") || 
                                    (step === "reset" && (stepName === "email" || stepName === "otp"))
                                    ? theme.colors.primary 
                                    : theme.colors.border,
                                borderRadius: 2,
                                transition: "all 0.3s ease"
                            }}
                        />
                    ))}
                </div>

                {/* Step 1: Email */}
                {step === "email" && (
                    <motion.form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSendOtp()
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div style={{ marginBottom: theme.spacing.xl }}>
                            <label style={{
                                display: "block",
                                fontSize: 14,
                                fontWeight: 600,
                                color: theme.colors.textPrimary,
                                marginBottom: theme.spacing.sm
                            }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: theme.spacing.md,
                                    fontSize: 16,
                                    backgroundColor: theme.colors.surfaceElevated,
                                    border: `2px solid ${theme.colors.border}`,
                                    borderRadius: theme.borderRadius.md,
                                    color: theme.colors.textPrimary,
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    fontFamily: theme.fonts.primary
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = theme.colors.primary;
                                    e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = theme.colors.border;
                                    e.target.style.boxShadow = "none";
                                }}
                                placeholder="your@email.com"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                ...styles.button.primary,
                                width: "100%",
                                fontSize: 16,
                                padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
                                marginBottom: theme.spacing.lg,
                                opacity: isLoading ? 0.7 : 1
                            }}
                            whileHover={!isLoading ? { scale: 1.02 } : {}}
                            whileTap={!isLoading ? { scale: 0.98 } : {}}
                        >
                            {isLoading ? "SENDING OTP..." : "SEND OTP"}
                        </motion.button>
                    </motion.form>
                )}

                {/* Step 2: OTP Verification */}
                {step === "otp" && (
                    <motion.form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleVerifyOtp()
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div style={{ marginBottom: theme.spacing.xl }}>
                            <label style={{
                                display: "block",
                                fontSize: 14,
                                fontWeight: 600,
                                color: theme.colors.textPrimary,
                                marginBottom: theme.spacing.sm
                            }}>
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                maxLength={6}
                                style={{
                                    width: "100%",
                                    padding: theme.spacing.md,
                                    fontSize: 24,
                                    backgroundColor: theme.colors.surfaceElevated,
                                    border: `2px solid ${theme.colors.border}`,
                                    borderRadius: theme.borderRadius.md,
                                    color: theme.colors.textPrimary,
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    fontFamily: theme.fonts.primary,
                                    textAlign: "center",
                                    letterSpacing: "0.5em"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = theme.colors.primary;
                                    e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = theme.colors.border;
                                    e.target.style.boxShadow = "none";
                                }}
                                placeholder="123456"
                            />
                            <p style={{
                                fontSize: 12,
                                color: theme.colors.textMuted,
                                margin: `${theme.spacing.sm}px 0 0`,
                                textAlign: "center"
                            }}>
                                Check your email for the 6-digit code
                            </p>
                        </div>

                        <motion.button
                            type="submit"
                            style={{
                                ...styles.button.primary,
                                width: "100%",
                                fontSize: 16,
                                padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
                                marginBottom: theme.spacing.md
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            VERIFY OTP
                        </motion.button>

                        <button
                            type="button"
                            onClick={() => setStep("email")}
                            style={{
                                ...styles.button.secondary,
                                width: "100%",
                                fontSize: 14,
                                padding: `${theme.spacing.sm}px ${theme.spacing.md}px`
                            }}
                        >
                            RESEND OTP
                        </button>
                    </motion.form>
                )}

                {/* Step 3: Password Reset */}
                {step === "reset" && (
                    <motion.form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleResetPassword()
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div style={{ marginBottom: theme.spacing.lg }}>
                            <label style={{
                                display: "block",
                                fontSize: 14,
                                fontWeight: 600,
                                color: theme.colors.textPrimary,
                                marginBottom: theme.spacing.sm
                            }}>
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: theme.spacing.md,
                                    fontSize: 16,
                                    backgroundColor: theme.colors.surfaceElevated,
                                    border: `2px solid ${theme.colors.border}`,
                                    borderRadius: theme.borderRadius.md,
                                    color: theme.colors.textPrimary,
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    fontFamily: theme.fonts.primary
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = theme.colors.primary;
                                    e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = theme.colors.border;
                                    e.target.style.boxShadow = "none";
                                }}
                                placeholder="••••••••"
                            />
                        </div>

                        <div style={{ marginBottom: theme.spacing.xl }}>
                            <label style={{
                                display: "block",
                                fontSize: 14,
                                fontWeight: 600,
                                color: theme.colors.textPrimary,
                                marginBottom: theme.spacing.sm
                            }}>
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: theme.spacing.md,
                                    fontSize: 16,
                                    backgroundColor: theme.colors.surfaceElevated,
                                    border: `2px solid ${theme.colors.border}`,
                                    borderRadius: theme.borderRadius.md,
                                    color: theme.colors.textPrimary,
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    fontFamily: theme.fonts.primary
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = theme.colors.primary;
                                    e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = theme.colors.border;
                                    e.target.style.boxShadow = "none";
                                }}
                                placeholder="••••••••"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                ...styles.button.primary,
                                width: "100%",
                                fontSize: 16,
                                padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
                                marginBottom: theme.spacing.lg,
                                opacity: isLoading ? 0.7 : 1
                            }}
                            whileHover={!isLoading ? { scale: 1.02 } : {}}
                            whileTap={!isLoading ? { scale: 0.98 } : {}}
                        >
                            {isLoading ? "RESETTING..." : "RESET PASSWORD"}
                        </motion.button>
                    </motion.form>
                )}

                {/* Navigation Links */}
                <div style={{ textAlign: "center" }}>
                    <p style={{
                        fontSize: 14,
                        color: theme.colors.textSecondary,
                        margin: 0,
                        marginBottom: theme.spacing.md
                    }}>
                        Remember your password?{" "}
                        <button
                            type="button"
                            onClick={onNavigateToLogin}
                            style={{
                                background: "none",
                                border: "none",
                                color: theme.colors.primary,
                                fontSize: 14,
                                cursor: "pointer",
                                textDecoration: "underline",
                                fontWeight: 600
                            }}
                        >
                            Sign In
                        </button>
                    </p>
                </div>

                {/* Back to Home */}
                <motion.div
                    style={{
                        textAlign: "center",
                        marginTop: theme.spacing.lg,
                        paddingTop: theme.spacing.lg,
                        borderTop: `1px solid ${theme.colors.border}`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <button
                        onClick={onNavigateHome}
                        style={{
                            background: "none",
                            border: "none",
                            color: theme.colors.textSecondary,
                            fontSize: 14,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: theme.spacing.xs,
                            margin: "0 auto"
                        }}
                    >
                        ← Back to Home
                    </button>
                </motion.div>
            </motion.div>
        </div>
    )
}
