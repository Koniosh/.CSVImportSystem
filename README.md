# Web Development Internship Task

**Note**: Styling and hosting have not been implemented, but I am aware of how to implement both. The frontend can be styled using CSS or libraries like Bootstrap, and the project can be hosted using platforms like Vercel for the frontend and Render for the backend.

## Task Overview

The goal of this task is to create a frontend UI that allows users to import data from a CSV file, save it in a suitable format (e.g., database or JSON), and display it on the screen. The product manages two types of data:

### 1. Employee Data:
- ID (UUID)
- Name (Text)
- Number (Text)
- Address (Text)

### 2. Product Data:
- ID (UUID)
- Name (Text)
- Flavour (Text)
- Size (Small, Medium, Large)

## What You Need to Do:

### 1. Import Data from CSV:
- The uploaded CSV data should be saved in a database or JSON file.

### 2. Show the Data on UI:
- Create a user-friendly UI to display Employee Data and Product Data on separate pages.
- Ensure the UI is responsive and works well on different screen sizes (mobile, tablet, desktop).

### 3. Filter Products by Size:
- Create a separate page/UI where users can see all available products based on size (Small, Medium, Large).
- Include buttons on the homepage for easy navigation.

## Folder Structure:

WEBDEVTASK/ ├── BACKEND/ │ ├── config.js │ ├── controllers.js │ ├── middleware.js │ ├── models/ │ │ ├── Employee.js │ │ ├── Product.js │ ├── routes.js │ └── server.js ├── FRONTEND/ │ └── csv-import-ui/ │ ├── src/ │ │ ├── components/ │ │ │ ├── EmployeeData.jsx │ │ │ ├── Home.jsx │ │ │ ├── ImportCSV.jsx │ │ │ ├── ProductData.jsx │ │ │ ├── ProductFilter.jsx │ │ │ └── Welcome.jsx │ │ ├── App.jsx │ │ └── main.jsx │ └── styles.css └── README.md


## Dependencies Used:

Backend:
- **cors**: ^2.8.5
- **csv-parser**: ^3.2.0
- **dotenv**: ^16.4.7
- **express**: ^4.21.2
- **mongoose**: ^8.10.0
- **multer**: ^1.4.5-lts.1
- **uuid**: ^11.0.5

Frontend:
- React (For UI)
- React Router (For routing)
- CSS (For styling)

## How to Run the Project:

### 1. Clone the Repository:
```bash
git clone https://github.com/your-username/web-dev-task.git
cd web-dev-task
```
### 2.Backend Setup:
- Install dependencies for the backend:
- cd BACKEND
- npm install
- Create a .env file in the BACKEND directory with the following content:
- MONGO_URI=your_mongodb_connection_string
- PORT=3000
- start the backend server:
- npm start

### 3.Frontend Setup:(React + Vite- for fast rendering)
- Install dependencies for the frontend:
- cd FRONTEND/csv-import-ui
- npm install
### Now go to application :
- http://localhost:3000

### How to Use the Application:

1. Import Data:
  - Click on "📤 Import Data" to upload your CSV file.
  - The data from the CSV will be processed and stored in the database.
2. View Employee Data:
  - Click on "👨‍💼 View Employee Data" to see a list of all employee records.
3. View Product Data:
  - Click on "🛒 View Product Data" to see a list of all product records.
4. Filter Products by Size:
  - Click on "🔍 Filter Products by Size" to filter products by size (Small, Medium, Large).


### License:
- MIT License
  . This README provides clear instructions for setup, usage, and deployment of the project, making 
    it easier for others to understand and contribute.



