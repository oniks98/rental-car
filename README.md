# RentalCar Frontend

**Find your perfect rental car**
Reliable and budget-friendly rentals for any journey.

## 📝 Project Description

This project is the **frontend part** of a web application for the company **"RentalCar"**, which specializes in car rentals. The application includes several key pages such as the homepage, a catalog of cars, a detailed page for each car including a rental form, and a favorites page where users can view and manage their saved cars.

The app integrates with a prebuilt backend API. Documentation is available here: [https://car-rental-api.goit.global/api-docs/](https://car-rental-api.goit.global/api-docs/)

## 🚀 Technologies Used

- **Vite** bundler
- **React** framework
- **Redux** for state management
- **React Router** for routing
- **Axios** for HTTP requests
- **CSS Modules**, **MUI**

## 📄 Pages Overview

1. **Homepage** – includes a promotional banner and a call to action.
2. **Catalog Page** – displays available vehicles with filter options:

   - Brand
   - Price
   - Mileage (`from`/`to`)
   - Favorite functionality with persistence across page reloads.

3. **Car Details Page** – provides detailed info, images, and a rental form.
4. **Favorites Page** – displays a list of vehicles the user has marked as favorites. Users can remove cars from the list or navigate to their detailed view.

## 🧭 Routing

- `/` – Homepage
- `/catalog` – Car catalog
- `/catalog/:id` – Car detail page
- `/favorites` – Favorites page

## 🧠 State Management

- Global state with Redux:

  - List of vehicles
  - Active filters
  - Favorites

- Previous search results should be cleared before sending new filter queries to ensure data accuracy.

## ⚙️ Functional Requirements

- **Navigation:** Button on the homepage leads to the catalog.
- **Filtering:** All filters must be handled on the backend.
- **Favorites:**

  - Cars can be added to favorites from the catalog.
  - The `/favorites` page displays all saved cars.
  - Users can remove cars from favorites or click "Read more" to see details.
  - The list of favorites persists after a page refresh.

- **Mileage formatting:** Should display with a space (e.g., `5 000 km` instead of `5000 km`).
- **Pagination:** "Load More" button loads additional vehicles based on selected filters (backend-driven).
- **Booking form:** Located on the car detail page; successful submission shows a success notification.

## 🎨 Design

- Based on a provided design [mockup](https://www.figma.com/design/A25LdVK3gZOPJaedrkTwWQ/Rental-Car?node-id=0-1&p=f&t=2ge05DE9pP1aySL7-0)
- Responsive design

## 🌐 Deployment

The project is deployed using [Vercel](https://vercel.com) .

## 👤 Author

Developed by Shpuryk Yurii
