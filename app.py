from flask import Flask, render_template, request, redirect, url_for, flash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
print(os.urandom(24).hex())

# Load environment variables from .env
load_dotenv()

# Environment config for Email
# Corrected: Now matching MAIL_USERNAME and MAIL_PASSWORD from your .env
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacts.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Corrected: Load SECRET_KEY from .env
app.secret_key = os.getenv("SECRET_KEY", "a_default_secret_key_if_not_set") # Provide a fallback for safety

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Contact model
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    service = db.Column(db.String(120))
    message = db.Column(db.Text, nullable=False)

@app.route('/')
def home():
    # Assuming 'index.html' is your welcome page now with the jumbotron
    return render_template('index.html')

@app.route('/services')
def services():
    services_data = [
        {
            'title': 'Residential Construction',
            'description': 'Custom homes, additions, and residential renovations with attention to detail and quality craftsmanship.',
            'features': ['Custom Home Building', 'Home Additions', 'Kitchen & Bath Remodeling', 'Deck & Patio Construction']
        },
        {
            'title': 'Commercial Construction',
            'description': 'Expertise in commercial projects including office buildings, retail spaces, and industrial facilities.',
            'features': ['Office Building Construction', 'Retail Space Development', 'Industrial Facility Construction', 'Renovation & Fit-Out']
        },
        {
            'title': 'Project Management',
            'description': 'Comprehensive project management services to ensure timely and on-budget project delivery.',
            'features': ['Project Planning', 'Budget Management', 'Quality Control', 'Safety Management']
        },
        {
            'title': 'Renovation & Remodeling',
            'description': 'Transform your space with our renovation and remodeling services tailored to your needs.',
            'features': ['Home Renovations', 'Commercial Remodeling', 'Interior Design Services', 'Sustainable Building Practices']
        }
    ]
    return render_template('services.html', services=services_data)

@app.route('/projects')
def projects():
    projects_data = [
          {
            'title': 'House and mansions (Ravine town)',
            'category': 'Residential',
            'description': 'Modern 2-bedroom self-contained under consruction 60% to completion.',
            'image': 'https://i.pinimg.com/736x/51/f1/54/51f1541b49359193393661a2f6393e59.jpg'
        },
        {
            'title': 'Office building ',
            'category': 'Commercial',
            'description': 'State-of-the-art office building with modern amenities.',
            'image': 'https://i.pinimg.com/736x/b8/ac/0e/b8ac0ebb5365a2d6da9e007b8188af94.jpg'
        },
        {
            'title': 'Retail space (Eldama Ravine)',
            'category': 'Commercial',
            'description': 'Spacious retail space designed for high foot traffic.',
            'image': 'https://i.pinimg.com/736x/18/69/97/186997223f584eba4d79e7f5edf1f48b.jpg'
        },
        {
            'title': 'Residential complex',
            'category': 'Residential',
            'description': 'Luxury residential complex with modern architecture.',
            'image': 'https://www.bomayangu.go.ke/assets/content-thumb-11-cd274461.png'
        }

    ]
    return render_template('projects.html', projects=projects_data)

@app.route('/about') # Assuming this corresponds to 'about_us' in your footer
def about():
    team_data = [
        {
            'name': 'Gilbert Kiplenge',
            'position': 'CEO & Director',
            'experience': '5+ years',
            'description': 'Visionary leader with extensive experience in construction management and business development.'
        },
        {
            'name': 'mathew lagat',
            'position': 'Project Manager',
            'experience': '7+ years',
            'description': 'Expert in project planning and execution, ensuring projects are delivered on time and within budget.'
        },
        {
            'name': 'Vincent Tomno',
            'position': 'support',
            'experience': '5+ years',
            'description': 'oversees customer service operation ensuring client satisfaction ,acts as voice of customer.'
        },
        {
            'name': 'mr chepkochei',
            'position': 'SNR Civil Engineer',
            'experience': '10+ years',
            'description': 'Skilled civil engineer with a focus on structural integrity and safety in construction projects.'
        }
    ]
    return render_template('about.html', team=team_data)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        service = request.form.get('service')
        message = request.form.get('message')

        # Basic server-side validation (optional but good practice)
        if not name or not email or not message:
            flash('Name, Email, and Message are required fields.', 'danger')
            return redirect(url_for('contact'))

        # Save to DB
        try:
            new_contact = Contact(name=name, email=email, phone=phone, service=service, message=message)
            db.session.add(new_contact)
            db.session.commit()
        except Exception as e:
            db.session.rollback() # Rollback on error
            flash(f'Error saving contact to database: {str(e)}', 'error')
            return redirect(url_for('contact'))


        # Email to admin
        admin_msg = MIMEMultipart()
        admin_msg['From'] = MAIL_USERNAME # Use the correct env var name
        admin_msg['To'] = MAIL_USERNAME   # Send admin email to your company's email
        admin_msg['Subject'] = f'New Contact Form Submission from {name}'
        admin_body = f"""
Name: {name}
Email: {email}
Phone: {phone}
Service: {service}
Message: {message}
"""
        admin_msg.attach(MIMEText(admin_body, 'plain'))

        # Auto-response to user
        user_msg = MIMEMultipart()
        user_msg['From'] = MAIL_USERNAME
        user_msg['To'] = email # Send auto-response to the client's email
        user_msg['Subject'] = 'We have received your message'
        user_body = f"""Dear {name},

Thank you for contacting us. We’ve received your message and will get back to you shortly.

Best regards,
Novastruct Team
"""
        user_msg.attach(MIMEText(user_body, 'plain'))

        try:
            # Check if email credentials are available
            if not MAIL_USERNAME or not MAIL_PASSWORD:
                raise ValueError("Email credentials (MAIL_USERNAME or MAIL_PASSWORD) are not set in environment variables.")

            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.starttls()
                server.login(MAIL_USERNAME, MAIL_PASSWORD) # Use the correct env var names
                server.send_message(admin_msg)
                server.send_message(user_msg)
            flash('Thank you! Your message has been sent and saved.', 'success')
        except Exception as e:
            flash(f'Error sending email: {str(e)}. Please check your email settings or try again later.', 'error')
            # You might want to log the full error here for debugging: app.logger.error(e)

        return redirect(url_for('contact'))

    return render_template('contact.html')

# Placeholder routes from your base.html and previous discussions
# Add these if they don't exist in your app.py
@app.route('/tours')
def tours():
    # This might be construction projects or services in your context, adjust as needed
    return render_template('tours.html') # Or redirect to projects/services if 'tours' isn't real

@app.route('/coming_soon')
def coming_soon():
    return render_template('coming_soon.html')

@app.route('/done_tours')
def done_tours():
    return render_template('done_tours.html') # Or redirect to projects/memories if 'done_tours' isn't real

@app.route('/memories')
def memories():
    return render_template('memories.html')

# Assuming 'about_us' is the actual route name used in the footer/navbar dropdown
@app.route('/about_us')
def about_us():
    # This should probably just call the existing 'about' route
    return redirect(url_for('about'))

# Assuming 'admin_dashboard' is an existing route (e.g., Flask-Admin)
@app.route('/admin_dashboard')
def admin_dashboard():
    # You'll need to implement your admin dashboard logic here
    flash('Admin dashboard access requires authentication.', 'info')
    return redirect(url_for('login')) # Or to your actual admin login/dashboard

# Placeholder for logout, register, login if not provided
@app.route('/logout')
def logout():
    flash('You have been logged out.', 'info')
    return redirect(url_for('home')) # Or index

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login')
def login():
    return render_template('login.html')


if __name__ == '__main__':
    # Create database tables if they don't exist
    # This must be done within an app context for SQLAlchemy to work
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)