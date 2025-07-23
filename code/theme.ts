// Theme configuration for F1 Streetwear
export const theme = {
    colors: {
        // F1 Racing inspired dark theme
        background: "#0A0A0A",
        surface: "#1A1A1A", 
        surfaceElevated: "#2A2A2A",
        
        // F1 Red accents
        primary: "#DC143C",
        primaryHover: "#B8122E",
        
        // Racing silver/chrome
        secondary: "#C0C0C0",
        secondaryHover: "#A8A8A8",
        
        // Text colors
        textPrimary: "#FFFFFF",
        textSecondary: "#CCCCCC",
        textMuted: "#888888",
        
        // Status colors
        success: "#00D084",
        warning: "#FFB800",
        error: "#FF4757",
        
        // Border colors
        border: "#333333",
        borderLight: "#444444"
    },
    
    fonts: {
        primary: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        heading: "Orbitron, monospace", // F1 tech-inspired font
        mono: "JetBrains Mono, monospace"
    },
    
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48
    },
    
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16
    },
    
    shadows: {
        sm: "0 2px 4px rgba(0, 0, 0, 0.3)",
        md: "0 4px 8px rgba(0, 0, 0, 0.4)",
        lg: "0 8px 16px rgba(0, 0, 0, 0.5)",
        glow: "0 0 20px rgba(220, 20, 60, 0.3)" // F1 red glow
    }
}

// Component styles
export const styles = {
    button: {
        primary: {
            backgroundColor: theme.colors.primary,
            color: theme.colors.textPrimary,
            padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
            borderRadius: theme.borderRadius.md,
            border: "none",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: theme.shadows.md,
            ":hover": {
                backgroundColor: theme.colors.primaryHover,
                boxShadow: theme.shadows.glow
            }
        },
        
        secondary: {
            backgroundColor: "transparent",
            color: theme.colors.textPrimary,
            padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
            borderRadius: theme.borderRadius.md,
            border: `2px solid ${theme.colors.border}`,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            ":hover": {
                borderColor: theme.colors.primary,
                color: theme.colors.primary
            }
        }
    },
    
    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        border: `1px solid ${theme.colors.border}`,
        boxShadow: theme.shadows.sm,
        transition: "all 0.2s ease",
        ":hover": {
            borderColor: theme.colors.borderLight,
            boxShadow: theme.shadows.md
        }
    },
    
    navigation: {
        backgroundColor: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
        padding: `${theme.spacing.md}px 0`,
        position: "sticky" as const,
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(10px)"
    }
}
