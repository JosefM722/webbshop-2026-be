# Webshop 2026 - Backend API

A backend API for an e-commerce application built with the MEN stack (MongoDB, Express, Node.js).

## Features
- REST API structure
- MongoDB database integration
- Express server setup
- Environment configuration
- Health check endpoint
- Scalable backend structure

## Tech Stack
- MongoDB
- Express.js
- Node.js
- JavaScript

## Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment

```bash
cp .env.example .env
```

3. Start MongoDB locally or use MongoDB Atlas.

4. Run the server

```bash
npm run dev
npm start
```

## API Endpoints

- GET `/`
- GET `/health`

## Project Structure

```bash
src/
├── config/
├── server.js
```

## Future Improvements
- Add authentication
- Add product management
- Improve validation
- Add order functionality
