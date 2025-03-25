# My Personal Site

This is a personal website built using Django. It serves as a platform to showcase my projects, skills, and interests.

## Project Structure

```
my-personal-site
├── my_personal_site
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── personal_app
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── views.py
│   └── migrations
│       └── __init__.py
├── manage.py
├── requirements.txt
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/thomasx-0/my-personal-site.git
   cd my-personal-site
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the required packages:**
   ```
   pip install -r requirements.txt
   ```

4. **Run the migrations:**
   ```
   python manage.py migrate
   ```

5. **Start the development server:**
   ```
   python manage.py runserver
   ```

## Usage

Visit `http://127.0.0.1:8000/` in your web browser to view the site.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.