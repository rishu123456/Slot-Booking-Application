
## 🔧 Installation & Setup

### 1️⃣ Prerequisites
Make sure you have the following installed:
- **Node.js** (>=14.0.0) - [Download](https://nodejs.org/)
- **npm** (Comes with Node.js) or **yarn** (optional)

### 2️⃣ Clone the Repository
Open your terminal and run:
```sh
git clone https://github.com/your-username/slot-booking-app.git
cd slot-booking-app

# 📌 Slot Booking Application

A **fully responsive** and **user-friendly** Slot Booking Application built with **React.js and Tailwind CSS**. This app allows users to **create, manage, and book slots**, supporting **dark mode** for better usability.

---

## 🚀 Features

### ✅ 1. User Authentication (LocalStorage Based)
- Users have to **set a username** and register when they first access the app.
- And after that user can Login and use the functionalities of the app.
- The username is **stored in `localStorage`**, ensuring session persistence.

### ✅ 2. Slot Management
- **Create Slots:** Users can create slots with a **name, date, and time**.
- **Edit Slots:** Modify slot details including **name and timing**.
- **Delete Slots:** Remove unnecessary slots.

### ✅ 3. Booking System
- **Same user can not book their own slots if we want to check booking functionality we have to logout and register with other username and then login and can now book the available slots of other user if any user has made any slot**.
- **Users can book slots** created by other users.

### ✅ 4. Timezone Support 🌎
- Users can **select their preferred timezone**.
- Slot timings **convert and display according to the selected timezone**.

### ✅ 5. Copy Slot
- user can copy slots on specific dates if their is already any slot available on a day from which user want to copy**.

---

### ✅ 6. Profile Section
- **Users can go to their Profile Page to view or update their username.
Ensures a personalized experience**.
- ** Also user can update their profile detail in profile page**

### ✅ 7. My Booking 
- **Users can go to their My Booking page to view their all bookings**.
- **My Bookings Page** shows the slots a user has booked.

### ✅ 8. Responsive UI
- Optimized for **desktop, tablet, and mobile**.
- Uses **Tailwind CSS** for styling and responsiveness.

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS  
- **State Management:** React Context API  
- **Date Handling:** Day.js  
- **Deployment:** Vercel   

---
