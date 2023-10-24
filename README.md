# Demo

## Live Demo

1. Web - `https://vercel.com/josh-karp/demo-commerce-app` *(Vercel)*
2. Server - `http://167.172.150.140:5000` *(DigitalOcean Droplet)*

> Note: The server does not have an SSL certificate, **Insecure content** must be set to allowed on the browser under site settings.

## Server

### Tech Stack

- **Flask** - a lightweight web framework for Python, used for building the backend of the application.
- **Flask**-SQLAlchemy - an extension for Flask that adds support for SQLAlchemy, a popular SQL toolkit and ORM.
- **Flask**-CORS - an extension for Flask that adds support for Cross-Origin Resource Sharing (CORS), which allows for secure cross-domain data transfers.
- **PyMySQL** - a pure-Python MySQL client library, used for connecting to and interacting with a MySQL database.
- **cryptography** - a library for secure communication and cryptography, used for encrypting and decrypting sensitive data.
- **python**-dotenv - a library for managing environment variables, used for storing sensitive configuration information.
- **PyJWT** - a library for JSON Web Tokens (JWTs), used for securely transmitting information between parties.
- **pytest** - a testing framework for Python, used for writing and running unit tests.
- **Docker** - a containerization platform used for bundling the application and its dependencies.

#### Docker Setup

1. Install Docker on your machine.
2. Navigate to the server folder in your terminal.
3. Build the Docker image: `docker build . -t flask-docker`
4. Run the Docker container: `docker compose up`

#### Manual Flask Setup
For development purposes, manually running flask allows for changes without having to rebuild the Docker image each time:

> Note: Python v3.8 is *required*

1. Navigate to the server folder in your terminal.
2. Create a virtual environment: `python3 -m venv venv`
3. Activate the virtual environment: `source venv/bin/activate`
4. Install the required packages: `pip install -r requirements.txt`
5. Run the Flask app: `flask run`

### Unit Tests

Docker:

1. Run the Docker container: `docker compose up`
2. Run the following command: `docker exec -it flask_app bash -c "python -m pytest -vv"`

#### Manual:

1. Activate the virtual environment: `source venv/bin/activate`
2. Run the following command: `python -m pytest -vv`

---

## Web

### Tech Stack

- **React** - a JavaScript library for building user interfaces.
- **React Router** - a library for routing in React applications.
- **React Query** - a library for managing server state in React applications.
- **Tailwind CSS** - a utility-first CSS framework for building responsive and customizable UI components.
- **Headless UI** - a set of completely unstyled, fully accessible UI components for React.
- **Heroicons** - a set of free SVG icons for use in web projects.
- **Axios** - a promise-based HTTP client for the browser and Node.js.
- **React Number Format** - a library for formatting and validating numbers in React.
- **React Hot Toast** - a library for displaying toast notifications in React.
- **clsx** - a tiny utility for constructing className strings conditionally.
- **Vite** - a build tool and development server for modern web projects.

### Vite/React Setup

1. Install Node.js and npm on your machine.
2. Navigate to the web folder in your terminal.
3. Create `.env` file with following variable: `VITE_SERVER_URL=http://localhost:5000`
4. Install the required packages: `npm install`
5. Run the development server: `npm run dev`
6. Open your browser and navigate to `http://localhost:3000`

## API

### Postman Collection

1. Click the "Run in Postman" button below, and then click the "Fork Collection" button when prompted. You will be required to create a free account with Postman.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/11083574-ac1f2fd6-05ae-4bfd-b3cf-6ac5d13048d3?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D11083574-ac1f2fd6-05ae-4bfd-b3cf-6ac5d13048d3%26entityType%3Dcollection%26workspaceId%3D6ed57b23-abb6-4a32-b5fe-06f1beb14e04#?env%5BDemo%5D=W3sia2V5IjoiZmxhc2tfdXJsIiwidmFsdWUiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCJ9XQ==)

2. The Postman collection uses Postman environment variables to simplify each API request.