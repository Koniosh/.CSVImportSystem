# CSV Import System:
### Task Overview
This project involves creating a frontend UI that allows users to import data from a CSV file, save it in a suitable format (database, JSON, or any other), and display the data on the screen. The data includes two types:
1.Employee Data
ID (UUID)
Name (Text)
Number (Text)
Address (Text)

2.Product Data
ID (UUID)
Name (Text)
Flavour (Text)
Size (Small, Medium, Large)

### * Import Data from CSV:
. The imported data should be saved in a database, JSON file, or any other suitable format.
. Use CSV files to load data for employees and products:

### Product CSV: Product CSV Link
### Employee CSV: Employee CSV Link

2.Show the Data on UI:
. Create a responsive, user-friendly UI to display the Employee Data and Product Data on separate 
  pages.
. Ensure that the UI works well across different screen sizes (mobile, tablet, and desktop).

3.Filter Products by Size:

. On the Home Page, add buttons that redirect users to the filter pages for viewing products by size (Small, Medium, Large).
. Create a Product Filter Page where users can filter products by size and view the relevant data.

# Backend:

### webdevtask/backend/
### models/Employee.js: Contains the schema for Employee data.
### models/Product.js: Contains the schema for Product data.
### .env: Environment variables for database connection and other secrets.
### config.js: Configuration settings for the server.
### controller.js: Logic to handle requests and interactions with the database.
### routes.js: Defines the API routes.
### server.js: Main file to start the backend server.

# Frontend:

### webdevtask/frontend/csv-import-ui/src/
### components/EmployeeData.jsx: Displays the Employee Data.
### components/Home.jsx: The landing page with buttons to navigate to the product filter page and  other sections.
### components/ImportCSV.jsx: Handles the CSV file upload and parsing.
### components/ProductData.jsx: Displays the Product Data.
### components/ProductFilter.jsx: Filters and displays products by size (Small, Medium, Large).





