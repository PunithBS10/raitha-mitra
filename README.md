# 🌾 Raitha Mitra – Farmer’s Helper App

**Raitha Mitra** is a responsive web application aimed at empowering farmers in Karnataka by providing them with real-time information on weather, crop prices, alerts, and news. Built using modern web technologies and connected to live data APIs, this app is designed for simplicity, speed, and accessibility.

---

## 🌟 Features

### 🛰️ 1. Live Government API Integration
- **Real-time Crop Prices**: Fetched from the Government of India Open Data Platform.
- **Fallback to Google Sheet**: If API is unavailable, falls back to live Google Sheets data.
- **Filtered for Karnataka**: Only relevant state-specific data is shown.

### 🌤️ 2. Weather Integration
- **Live Weather Updates** based on the user's current location.

### 📰 3. News & Alerts
- Agricultural news updates (manual or automated in future).
- Alert notifications for farmers.

### 📱 4. Mobile & Desktop Ready
- Fully responsive design using **Tailwind CSS** and **Vite + React**.

---

## 🗂️ Project Structure
├── src/
│ ├── components/ # UI components
│ ├── pages/ # Individual pages (Home, Prices, News)
│ ├── services/ # API service handlers
│ └── main.tsx # Entry point
├── dist/ # Production build output
├── .bolt/ # Bolt AI configurations
├── vite.config.ts # Vite configuration
├── tailwind.config.js # Tailwind styling
├── index.html

---

## 🛠️ Getting Started

### 🚀 Branching Strategy
- This project uses Git Flow style branching:
- main: stable, production-ready code (used for live deployment)
- develop: integration branch for features and testing
- feature/<name>: for new features
- hotfix/<name>: for emergency bug fixes on main

### Example flow:
- bash
- Copy
- Edit
- git checkout develop
- git pull origin develop
- git checkout -b feature/mandi-search
### make changes
- git add .
- git commit -m "Added mandi search filter"
- git push -u origin feature/mandi-search

---

# 👨‍💻 Tech Stack
- Vite
- React + TypeScript
- Tailwind CSS
- Bolt AI (for prototyping)
- Government of India Open Data API
- OpenWeatherMap API
- Google Sheets (as fallback)

---

# 📌 Todo / Future Improvements
- Add user login for personalization
- Add Kannada voice assistant
- Add chatbot for question-answering
- Support for more Indian states

---

# 🙌 Credits
- Government of India – data.gov.in
- OpenWeatherMap – openweathermap.org
- Bolt AI – Rapid prototyping

