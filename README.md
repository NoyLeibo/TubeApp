# **React Native Video App**
This React Native application allows users to search and view video details, switch between light and dark themes, and navigate through different screens using React Navigation.

## **Features**

**Responsive UI:** The app has a top section showing the app's name and a main area where you can scroll through small pictures and names of videos.

**YouTube API:** The app gets video information from YouTube when you provide a special access code (API key).

**Watching Videos:** Users can see details about videos and watch them right inside the app.

**Smart Loading:** The app only loads videos when needed and manages information wisely to work faster.

**Handling Problems:** The app can deal with issues when fetching data from YouTube and tells users nicely if there's nothing to show.

## **Prerequisites**
**Before you can run the app, you will need:**

Node.js is installed on your computer.

A Google Developer account for accessing the YouTube Data API.

An API key to authenticate API requests.

## Getting Started

### To run TubeView locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/NoyLeibo/TubeApp
2. **Navigate to the Project Directory:**
      ```bash
      cd TubeApp
3. **Install Dependencies:**
      ```bash
      npm i
4. **API Key Configuration::**
   Obtain an API key by following the instructions on Google Developer Console.
   Edit config.json file in the root directory and add your API key
      ```bash
      {
     "google_api_key": "YOUR_API_KEY"
      }
6. **Run the Application:**
      ```bash
      npx expo start
7. **Scan the qr code and open the app with Expo Go**
