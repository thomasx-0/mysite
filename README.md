# My Personal Site

A personal website built using Django to showcase projects, skills, and interests.

---

## Project Structure

```plaintext
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

---

## Setup Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/thomasx-0/my-personal-site.git
cd my-personal-site
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Apply Migrations

```bash
python manage.py migrate
```

### 5. Start the Development Server

```bash
python manage.py runserver
```

---

## Usage

Visit the site at: [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your web browser.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
