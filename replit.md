# Overview

NEAR (Never Empty Again on Return) is a logistics optimization platform that connects transporters with clients to reduce empty trips, cut CO₂ emissions, and improve delivery efficiency. The platform consists of a marketing website with data insights dashboard and a separate data analytics component built with Streamlit and Python.

The project aims to solve the problem that 43% of logistics routes in Spain operate empty, causing operational losses and unnecessary emissions. NEAR provides an intelligent platform to optimize return routes and connect supply with demand in real-time.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Static Website**: Pure HTML, CSS, and JavaScript without frameworks
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Animation System**: GSAP and ScrollTrigger for dynamic scroll animations and 3D card effects
- **Internationalization**: JavaScript-based i18n system supporting Spanish and English
- **Data Visualization**: Chart.js for interactive charts and graphs

## Component Structure
- **Landing Page**: Hero section, animated statistics, problem/solution cards, benefits showcase
- **How It Works Page**: Process explanation with 3D card stacks and video demos
- **Data Insights Dashboard**: Interactive charts showing survey data and logistics metrics
- **Modular JavaScript**: Separate files for animations, form validation, charts, and utilities

## Data Analytics Component
- **Framework**: Streamlit for web application interface
- **Database Integration**: SQLAlchemy ORM with support for multiple database backends
- **Data Processing**: Pandas for data manipulation and analysis
- **Visualization**: Plotly for interactive charts and statistical displays
- **Admin Dashboard**: Survey data management and analytics interface

## Design System
- **Color Palette**: Primary blue (#0a84ff), secondary colors, and neutral grays
- **Typography**: Inter/Open Sans font families with clear hierarchy
- **Icons**: Font Awesome icon library
- **Layout**: Container-based responsive grid system
- **Animations**: Intersection Observer API for scroll-triggered effects

## Data Layer
- **Survey Data**: CSV-based data storage with UTF-8 encoding
- **Database Schema**: SQLAlchemy models for survey responses with flexible field mapping
- **Data Pipeline**: Papa Parse for CSV processing and data transformation
- **Statistics Engine**: Real-time calculation of logistics metrics and KPIs

# External Dependencies

## Frontend Libraries
- **GSAP**: Animation library for scroll triggers and 3D effects
- **Chart.js**: Canvas-based charting library for data visualization
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Poppins and Inter font families

## Backend Technologies
- **Streamlit**: Python web framework for data applications
- **Pandas**: Data analysis and manipulation library
- **Plotly**: Interactive plotting library for charts and graphs
- **SQLAlchemy**: Database ORM for data persistence
- **Papa Parse**: JavaScript CSV parsing library

## Development Tools
- **Three.js**: 3D graphics library for advanced visualizations
- **IntersectionObserver API**: Native browser API for scroll-based animations
- **CSS Grid & Flexbox**: Modern layout systems for responsive design

## Data Sources
- **Survey Data**: Local CSV files with logistics survey responses
- **Placeholder Media**: External services like picsum.photos for demo content
- **Sample Videos**: External video services for demonstration purposes

## Hosting & Deployment
- **Static Hosting**: Compatible with any static file hosting service
- **Database Backend**: Configurable to work with PostgreSQL, SQLite, or other SQL databases
- **CDN Integration**: External CDN links for fonts and icon libraries