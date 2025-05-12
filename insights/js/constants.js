/**
 * NEAR - Never Empty Again on Return
 * Constants and Configuration File
 * --------------------------------
 * This file contains global constants and configuration settings
 * used throughout the insights dashboard.
 */

const NEAR = {
    // Data and API settings
    DATA: {
        SURVEY_FILE_PATH: './data/NearEncuesta_actualizado_utf8.csv',
        DATE_FORMAT: 'MM/DD/YYYY'
    },
    
    // Chart settings and colors
    CHARTS: {
        COLORS: {
            PRIMARY: '#0a84ff',
            SECONDARY: '#0071BB',
            ACCENT: '#33CCFF',
            CHART_BLUE: '#3B82F6',
            CHART_GREEN: '#10B981',
            CHART_INDIGO: '#1E40AF',
            CHART_PURPLE: '#7C3AED',
            CHART_ORANGE: '#F59E0B',
            CHART_RED: '#EF4444'
        },
        ANIMATION_DURATION: 1500,
        FONT_FAMILY: "'Poppins', sans-serif",
        DEFAULT_FONT_SIZE: 12,
        DEFAULT_FONT_COLOR: '#4B5563',
        TOOLTIP_BACKGROUND: 'rgba(0, 0, 0, 0.8)',
        TOOLTIP_FONT_COLOR: 'white'
    },
    
    // Animation settings
    ANIMATIONS: {
        DEFAULT_DURATION: 600,
        SCROLL_THRESHOLD: 0.2, // Percentage of element visible before triggering animation
        STAGGER_DELAY: 150     // Delay between consecutive animations
    },
    
    // UI settings
    UI: {
        MOBILE_BREAKPOINT: 768, // in pixels
        ANIMATION_CLASS: 'animate-now'
    }
};

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NEAR;
}