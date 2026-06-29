# 📖 Project Instructions & Technical Overview

This document provides a comprehensive breakdown of the files in this repository and their working principles.

---

## 📂 Core Structure

### 1. 🌐 `index.html`
- **Principle**: The primary entry point of the application. It uses **Semantic HTML5** (header, main, footer) to ensure SEO optimization and accessibility (A11y).
- **Features**:
  - Implements **Meta Tags** for search engines and social sharing (OG, Twitter Cards).
  - Integrates the **EmailJS SDK** for contact form functionality.
  - Contains placeholders for dynamically loaded data.

### 2. 🎨 `css/style.css`
- **Principle**: A modern, responsive design system built with **Vanilla CSS**.
- **Features**:
  - Uses **CSS Variables** (`:root`) for easy theme management and color customization.
  - Implements **Glassmorphism** effects using `backdrop-filter`.
  - Employs **Flexbox** and **CSS Grid** for a "mobile-first" responsive layout.
  - Includes smooth transitions and hover animations for interactive elements.

### 3. ⚡ `js/script.js`
- **Principle**: The "brain" of the portfolio, handling all logic and interactivity using modern ES6+ JavaScript.
- **Features**:
  - **Data Fetching**: Uses `async/await` to load projects and skills from JSON files.
  - **Intersection Observer**: Tracks user scroll position to highlight active navigation links.
  - **Theme Management**: Persists theme (dark/light) and accent color preferences in `localStorage`.
  - **EmailJS Integration**: Handles contact form submission with loading states and user feedback.

---

## 📊 Data Management

### 4. 🛠️ `data/skills.json`
- **Principle**: A lightweight JSON database containing a list of technical skills.
- **Working**: The JavaScript iterates through this list to generate the "Technical Skills" section dynamically.

### 5. 🚀 `data/projects.json`
- **Principle**: A structured JSON file containing project details (Name, Image, Live Link, GitHub Link).
- **Working**: Allows for easy updates to the project portfolio without touching the HTML markup.

---

## 🖼️ Assets

### 6. 📁 `assets/`
- **Principle**: Stores static resources.
- **Subdirectories**:
  - `images/`: Thumbnails for projects and profile photos.
  - `resume/`: PDF version of the professional resume.

---

## 🛠️ Development Workflow

1.  **Modify Content**: To add new projects or skills, update the respective `.json` files in the `data/` folder.
2.  **Adjust Design**: Modify `--primary` or `--bg` variables in `style.css`.
3.  **Deploy**: Simply push to the `main` branch. The site is optimized for one-click deployment on Vercel, Netlify, or GitHub Pages.
