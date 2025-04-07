#!/bin/bash

# Exit on error
set -e

# Collect static files
python manage.py collectstatic --noinput

# Render static HTML files
python manage.py distill-local --output-dir dist

# Push to GitHub Pages
cd dist
git init
git remote add origin https://github.com/thomasx-0/mysite.git
git checkout -b gh-pages
git add .
git commit -m "Deploy static site"
git push -f origin gh-pages

echo "Deployment complete! Your site is live on GitHub Pages."
