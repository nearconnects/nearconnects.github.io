# NEAR - Never Empty Again on Return

## Overview

NEAR is a logistics optimization platform that aims to reduce empty cargo trips and CO₂ emissions by connecting transporters with clients. The platform focuses on making return trips profitable by allowing drivers to pick up additional deliveries that align with their routes. This static website showcases the NEAR concept through multiple pages including the main landing page, blog, insights dashboard, and "how it works" explanations. The project includes a comprehensive data analysis component built with Streamlit that visualizes survey data from drivers and customers to understand market needs and behavior patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built as a static website using vanilla HTML, CSS, and JavaScript with no framework dependencies. The architecture follows a multi-page structure with:

- **Main Landing Page** (`index.html`) - Hero section, impact metrics, and company information
- **Blog Section** (`blog.html`) - Content marketing and industry insights  
- **How It Works** (`how-it-works.html`) - Educational content explaining the platform
- **Data Insights Dashboard** (`insights/index.html`) - Interactive data visualization

### Styling and Visual Design
CSS architecture uses a modular approach with:
- **Base Styles** (`css/styles.css`) - CSS variables, reset styles, and global components
- **Page-Specific Styles** - Dedicated CSS files for each major section
- **Design System** - Consistent color palette, typography (Poppins font), and spacing using CSS custom properties
- **Responsive Design** - Mobile-first approach with breakpoints for tablet and desktop

### JavaScript Architecture
The JavaScript follows a component-based approach with separate modules for different functionalities:
- **Main Functionality** (`js/main.js`) - Core navigation, mobile menu, and page interactions
- **Animation System** (`js/animations.js`) - Scroll-triggered animations and visual effects
- **Internationalization** (`js/i18n.js`) - Multi-language support (Spanish/English)
- **Form Validation** (`js/form-validation.js`) - Client-side validation for contact forms
- **Chart Visualization** (`js/charts.js`) - Data visualization using Chart.js library

### Data Visualization Component
The insights dashboard uses a client-side data processing approach:
- **CSV Data Parsing** - Uses PapaParse library to process survey data
- **Interactive Charts** - Chart.js for creating responsive data visualizations
- **Real-time Animations** - GSAP library for smooth chart animations and transitions
- **Tab-based Navigation** - Organized insights into driver analytics and customer preferences

### Static Asset Management
Assets are organized into logical directories:
- `/css/` - All stylesheet files with modular organization
- `/js/` - JavaScript modules with clear separation of concerns
- `/assets/` - Images, icons, and other static resources
- `/insights/` - Self-contained data dashboard with its own assets

## External Dependencies

### Frontend Libraries
- **Font Awesome 6.4.0** - Icon library for UI elements and visual indicators
- **Google Fonts (Poppins)** - Primary typography for consistent brand appearance
- **Chart.js** - JavaScript charting library for data visualization
- **PapaParse 5.4.1** - CSV parsing library for processing survey data
- **GSAP (GreenSock)** - Animation library for smooth transitions and effects

### Data Analysis Stack (Streamlit Application)
- **Streamlit** - Python web framework for creating the admin dashboard
- **Pandas** - Data manipulation and analysis
- **Plotly/Plotly Express** - Interactive plotting library for advanced visualizations
- **SQLAlchemy** - Database ORM for data persistence (prepared for future database integration)
- **NumPy** - Numerical computing for statistical analysis

### Development Tools
- **Browser-native APIs** - Intersection Observer for scroll animations, Fetch API for data loading
- **CSS Custom Properties** - For maintainable theming and design consistency
- **ES6+ JavaScript** - Modern JavaScript features with backward compatibility considerations

### Data Sources
- **Survey Data** - CSV files containing driver and customer survey responses
- **JSON Configuration** - Database exports and configuration files for the Streamlit application
- **Static Content** - Blog posts, case studies, and marketing content stored as static HTML

The architecture is designed to be easily deployable as a static site while providing rich interactivity through client-side JavaScript. The Streamlit component can be deployed separately as a data analysis tool for administrators and stakeholders.