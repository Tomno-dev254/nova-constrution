
# Novastruct Construction Company Website

A professional construction company website built with Flask (Python) backend and modern HTML, CSS, and JavaScript frontend.

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Professional Color Scheme**: Navy blue, white, and gray palette
- **Modern UI/UX**: Clean, trustworthy design appealing to both individuals and businesses
- **Complete Pages**: Home, Services, Projects, About Us, and Contact
- **Interactive Elements**: Mobile menu, project filters, smooth scrolling, form validation
- **Contact Form**: Functional contact form with backend processing
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## Technology Stack

### Backend
- **Flask**: Python web framework
- **Jinja2**: Template engine
- **Werkzeug**: WSGI web application library

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: Interactive functionality
- **Google Fonts**: Inter font family

## Project Structure

```
novastruct-website/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── templates/            # HTML templates
│   ├── base.html         # Base template with navigation and footer
│   ├── index.html        # Homepage
│   ├── services.html     # Services page
│   ├── projects.html     # Projects gallery
│   ├── about.html        # About us page
│   └── contact.html      # Contact page with form
└── static/              # Static assets
    ├── css/
    │   └── style.css    # Main stylesheet
    └── js/
        └── script.js    # JavaScript functionality
```

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Installation Steps

1. **Clone or download the project files**
   ```bash
   mkdir novastruct-website
   cd novastruct-website
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000` to view the website

## Configuration

### Development Settings
- **Debug Mode**: Enabled by default in `app.py`
- **Secret Key**: Change the secret key in production
- **Port**: Runs on port 5000 by default

### Production Deployment
For production deployment, make sure to:
1. Set `debug=False` in `app.py`
2. Change the secret key to a secure random value
3. Configure a proper web server (nginx, Apache)
4. Use a WSGI server like Gunicorn

### Email Configuration (Optional)
To enable email functionality for the contact form, configure SMTP settings in `app.py`:
```python
# Add email configuration
MAIL_SERVER = 'your-smtp-server.com'
MAIL_PORT = 587
MAIL_USERNAME = 'your-email@example.com'
MAIL_PASSWORD = 'your-email-password'
```

## Customization

### Content Updates
- **Company Information**: Update contact details in `templates/base.html`
- **Services**: Modify services data in `app.py` and `templates/services.html`
- **Projects**: Update project portfolio in `app.py` and `templates/projects.html`
- **Team Information**: Edit team data in `app.py` and `templates/about.html`

### Styling Changes
- **Colors**: Modify CSS variables in `static/css/style.css`
- **Fonts**: Change font imports in `templates/base.html`
- **Layout**: Adjust CSS Grid and Flexbox properties

### Images
Replace placeholder images with actual company photos:
- Update image URLs in templates
- Add images to `static/images/` directory
- Optimize images for web (WebP format recommended)

## Features Overview

### Homepage (`/`)
- Hero section with call-to-action
- Company statistics
- Service overview cards
- Featured projects
- Why choose us section
- Contact call-to-action

### Services (`/services`)
- Detailed service descriptions
- Service features lists
- Construction process steps
- Quote request buttons

### Projects (`/projects`)
- Project gallery with filtering
- Project categories (Residential, Commercial, Renovation, Infrastructure)
- Client testimonials
- Project details overlays

### About (`/about`)
- Company history and story
- Mission, vision, and values
- Leadership team profiles
- Certifications and awards

### Contact (`/contact`)
- Contact form with validation
- Company contact information
- Service areas
- Emergency contact details

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Optimized CSS and JavaScript
- Responsive images
- Smooth scrolling
- Lazy loading animations
- Mobile-first responsive design

## Security Features

- CSRF protection (Flask built-in)
- Form validation (client and server-side)
- Secure headers
- Input sanitization

## SEO Features

- Semantic HTML structure
- Meta descriptions and titles
- OpenGraph tags ready
- Clean URL structure
- Accessibility considerations

## License

This project is created for Novastruct Construction Company. All rights reserved.

## Support

For technical support or customization requests, please contact the development team.

---

**Novastruct Construction Company**  
Building Excellence Since 1995  
📞 (555) 123-4567  
✉️ info@novastruct.com  
🌐 www.novastruct.com
