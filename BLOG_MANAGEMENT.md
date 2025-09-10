# NEAR Blog Management Guide

## Overview

The NEAR blog system is a static, multilingual blog with category filtering capabilities. Articles are managed through HTML structure and JavaScript translations, providing a clean separation between content and presentation.

## System Architecture

### Core Components
- **`blog.html`** - Main blog page with article HTML structure
- **`js/i18n.js`** - Translation system for Spanish/English content
- **`js/blog.js`** - Category filtering and interactive functionality
- **`css/blog.css`** - Blog-specific styling and layout

### Features
- ✅ **Category Filtering** - 5 categories with dynamic filtering
- ✅ **Multilingual Support** - Full Spanish/English translations
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Newsletter Signup** - Email collection functionality
- ✅ **Icon-based Placeholders** - Font Awesome icons for visual appeal

---

## How to Add New Articles

### Step 1: HTML Structure

Open `blog.html` and locate the posts grid section (around line 136). Add your new article using this template:

```html
<article class="blog-post" data-category="CATEGORY_NAME">
    <div class="post-image">
        <div class="post-placeholder">
            <i class="fas fa-ICON_NAME"></i>
        </div>
        <div class="post-category" data-translate="blog.categories.CATEGORY_NAME">Category Display Name</div>
    </div>
    <div class="post-content">
        <div class="post-meta">
            <span class="post-date">March 20, 2024</span>
            <span class="read-time">5 min read</span>
        </div>
        <h3 data-translate="blog.postX.title">Article Title</h3>
        <p data-translate="blog.postX.excerpt">Article excerpt description...</p>
        <div class="post-footer">
            <div class="post-author">
                <span>NEAR Team</span>
            </div>
            <a href="#" class="read-more" data-translate="blog.read-more">Read More</a>
        </div>
    </div>
</article>
```

### Step 2: Add Translations

Open `js/i18n.js` and add translations in both language sections:

#### Spanish Section (es:)
Add after the existing blog posts (around line 150):
```javascript
'blog.postX.title': 'Título del Artículo en Español',
'blog.postX.excerpt': 'Descripción del artículo en español que aparecerá como extracto...',
```

#### English Section (en:)
Add after the existing blog posts (around line 295):
```javascript
'blog.postX.title': 'Article Title in English',
'blog.postX.excerpt': 'Article description in English that will appear as excerpt...',
```

**Important**: Replace `X` with the next sequential number (e.g., if the last post is `post6`, use `post7`).

---

## Available Categories

Choose from these predefined categories:

| Category | `data-category` Value | Icon Class | Best For |
|----------|----------------------|------------|----------|
| **Sustainability** | `sustainability` | `fa-leaf`, `fa-globe-europe`, `fa-seedling` | Environmental topics, CO₂ reduction |
| **Technology** | `technology` | `fa-microchip`, `fa-robot`, `fa-mobile-alt` | AI, automation, software |
| **Industry Insights** | `industry` | `fa-chart-line`, `fa-industry`, `fa-chart-bar` | Market analysis, trends |
| **Success Stories** | `success` | `fa-trophy`, `fa-star`, `fa-medal` | Case studies, achievements |

### Adding New Categories

If you need a new category:

1. **Add category button** in `blog.html` (around line 128):
```html
<button class="category-btn" data-category="new-category" data-translate="blog.categories.new-category">New Category</button>
```

2. **Add translations** in `js/i18n.js`:
```javascript
// Spanish section
'blog.categories.new-category': 'Nueva Categoría',

// English section
'blog.categories.new-category': 'New Category',
```

---

## Complete Example: Adding a New Article

Let's add an article about "Blockchain in Logistics":

### 1. Add HTML Structure
```html
<article class="blog-post" data-category="technology">
    <div class="post-image">
        <div class="post-placeholder">
            <i class="fas fa-link"></i>
        </div>
        <div class="post-category" data-translate="blog.categories.technology">Technology</div>
    </div>
    <div class="post-content">
        <div class="post-meta">
            <span class="post-date">April 5, 2024</span>
            <span class="read-time">7 min read</span>
        </div>
        <h3 data-translate="blog.post7.title">Blockchain in Logistics</h3>
        <p data-translate="blog.post7.excerpt">How blockchain technology is revolutionizing supply chain transparency...</p>
        <div class="post-footer">
            <div class="post-author">
                <span>NEAR Team</span>
            </div>
            <a href="#" class="read-more" data-translate="blog.read-more">Read More</a>
        </div>
    </div>
</article>
```

### 2. Add Spanish Translations
```javascript
// In Spanish section (es:)
'blog.post7.title': 'Blockchain en Logística',
'blog.post7.excerpt': 'Cómo la tecnología blockchain está revolucionando la transparencia de la cadena de suministro y mejorando la trazabilidad en el transporte.',
```

### 3. Add English Translations
```javascript
// In English section (en:)
'blog.post7.title': 'Blockchain in Logistics',
'blog.post7.excerpt': 'How blockchain technology is revolutionizing supply chain transparency and improving traceability in transportation operations.',
```

---

## Featured Articles

To make an article featured (larger display), add the `featured` class:

```html
<article class="blog-post featured" data-category="sustainability">
    <!-- Article content -->
</article>
```

**Note**: Only one featured article should be displayed at a time for optimal design.

---

## Using Real Images (Optional)

The current system uses icon placeholders, but you can add real images:

### 1. Add Image to Assets
Save your image in the `assets/` folder (e.g., `assets/blockchain-article.jpg`).

### 2. Update HTML Structure
Replace the placeholder section:
```html
<div class="post-image">
    <img src="assets/blockchain-article.jpg" alt="Blockchain in logistics visualization">
    <div class="post-category" data-translate="blog.categories.technology">Technology</div>
</div>
```

### 3. Optimize Images
- **Recommended size**: 400x250px
- **Format**: JPG or WebP for photos, SVG for illustrations
- **File size**: Keep under 100KB for fast loading

---

## Content Guidelines

### Article Titles
- **Length**: 5-8 words maximum
- **Style**: Clear, descriptive, action-oriented
- **SEO**: Include relevant keywords naturally

### Article Excerpts
- **Length**: 15-25 words
- **Purpose**: Summarize the main benefit or insight
- **Tone**: Professional but accessible

### Publication Dates
- Use consistent format: "Month DD, YYYY"
- Keep chronological order (newest first)
- Update read time based on content length

### Read Time Calculation
- **Rule of thumb**: 200 words per minute
- **Typical ranges**: 
  - Short posts: 2-3 min
  - Medium posts: 4-6 min
  - Long posts: 7-10 min

---

## Blog Functionality

### Category Filtering
- **Automatic**: Works immediately when you add proper `data-category`
- **JavaScript**: Handled by `js/blog.js`
- **Animation**: Smooth fade in/out transitions

### Language Switching
- **Automatic**: Works with existing i18n system
- **Real-time**: Updates immediately when user switches language
- **Persistent**: Language choice saved in localStorage

### Newsletter Signup
- **Current**: Shows notification messages
- **Integration**: Ready for email service APIs (Mailchimp, ConvertKit, etc.)
- **Location**: Update `js/blog.js` line 34 for email service integration

---

## File Structure

```
blog/
├── blog.html              # Main blog page
├── css/
│   └── blog.css           # Blog-specific styles
├── js/
│   ├── blog.js           # Blog functionality
│   └── i18n.js           # Translation system
└── assets/               # Images and media
    └── [article-images]  # Optional article images
```

---

## Testing Your Changes

### Before Publishing
1. **Validate HTML**: Ensure proper closing tags and structure
2. **Check Translations**: Verify both Spanish and English text
3. **Test Categories**: Confirm filtering works correctly
4. **Mobile Test**: Check responsive behavior
5. **Language Switch**: Test both language versions

### Common Issues
- **Missing Translations**: Article won't display text
- **Wrong Category**: Won't filter properly
- **Broken HTML**: Can break page layout
- **Large Images**: Can slow page loading

---

## Maintenance Tips

### Regular Updates
- **Keep dates current**: Update publication dates for relevance
- **Review content**: Ensure information stays accurate
- **Monitor categories**: Don't create too many categories
- **Image optimization**: Compress images regularly

### Content Strategy
- **Mix categories**: Balance different topic types
- **Update frequency**: Aim for 1-2 articles per month
- **Seasonal relevance**: Time articles with industry events
- **Call-to-actions**: Include links to NEAR platform when relevant

---

## Troubleshooting

### Article Not Appearing
1. Check HTML syntax in `blog.html`
2. Verify translation keys match in `js/i18n.js`
3. Ensure proper `data-category` attribute
4. Clear browser cache and reload

### Category Filter Not Working
1. Confirm `data-category` value matches button
2. Check JavaScript console for errors
3. Verify `js/blog.js` is loading properly

### Translations Missing
1. Check translation key spelling matches HTML
2. Ensure translations exist in both `es:` and `en:` sections
3. Verify i18n system is working on page

---

## Advanced Customization

### Custom Styling
Edit `css/blog.css` to customize:
- Colors and typography
- Layout and spacing
- Animation effects
- Category button styles

### Additional Features
The blog system can be extended with:
- Article search functionality
- Social media sharing
- Comment systems
- RSS feed generation
- Reading progress indicators

---

*This guide covers the complete workflow for managing the NEAR blog system. For technical support or advanced customizations, refer to the main project documentation.*