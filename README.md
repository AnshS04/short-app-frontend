# URL Shortener Frontend

This project is a frontend service built with **React**.

## Features

- **URL Shortening**: Create short URLs for long links.
- **Top Shortcodes**: Display the top 100 most accessed URLs.
- **URL Redirection**: Redirect to the original URL based on the shortcode.

## Getting Started

### Frontend Setup

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/AnshS04/short-app-frontend.git
   ```

2. Navigate to the project folder:
   ```bash
   cd short-app-frontend
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. **Proxy Setup**:  
   The proxy has been set in the `package.json` to route API requests to the backend server running on port `3000`. This allows the frontend to seamlessly communicate with the backend during development.

   ```json
   "proxy": "http://localhost:3000"
   ```

5. Start the frontend development server:
   ```bash
   npm start
   ```

### Backend Setup

1. **CORS Setup**:  
   CORS (Cross-Origin Resource Sharing) has been configured in the backend to allow API requests from the frontend application.
   
2. Make sure your backend is running on `http://localhost:3000`.

## How to Use

1. Enter a long URL into the input field and click "Shorten."
2. You'll receive a shortened URL which you can use for redirection.
3. Use the top 100 section to track the most accessed URLs.
