# QuickServe: Restaurant Management Solution

**QuickServe** is a powerful web-based platform that equips restaurants with essential tools like a Point of Sale (POS) system, automated customer ordering pages, and admin management dashboards. Built with modern technologies, QuickServe simplifies restaurant operations and leverages AI for actionable insights.

---

## 🚀 Project Overview

QuickServe provides an all-in-one solution for restaurants to streamline operations and enhance customer experiences. From POS systems to QR-code-enabled customer menus, it automates critical processes and scales with restaurant needs.

- **Core Features**:
  - **POS System**: Efficient order and payment processing for restaurant staff.
  - **Customer Ordering Page**: Automated, QR-code-driven menus for customer orders.
  - **Admin Dashboard**: Centralized control for restaurant onboarding and menu management.
  - **Landing Page**: Professional entry point for restaurant owners to sign up.
  - **Email Notifications**: Automated emails sent when restaurant pages go live.
  - **AI Insights (Planned)**: Analyze market trends and customer behavior for restaurant owners.

---

## 📂 Folder Structure

QuickServe is modular, with dedicated frontend and backend components:

- **Admin**: Tools for restaurant management.
  - *Frontend*: EJS-based admin dashboard.
  - *Backend*: APIs for user and menu management.
- **POS**: Point of Sale system.
  - *Frontend*: EJS-based interface for transactions.
  - *Backend*: APIs for order and inventory processing.
- **Customer**: Customer-facing ordering system.
  - *Frontend*: EJS-based responsive menu.
  - *Backend*: APIs for order and customer data handling.
- **Landing**: Public-facing signup page.
  - *Frontend*: EJS-based landing page with contact form.
  - *Backend*: APIs for form submissions and emails.

---

## 🛠️ Technologies Used

QuickServe is built with a robust, scalable tech stack:

- **Backend**:
  - **Node.js + Express**: Fast and scalable APIs.
  - **Passport.js**: Secure authentication for admin, restaurant, and customer logins.
  - **PostgreSQL**: Reliable database for restaurant and customer data.
  - **Multer**: File handling for restaurant assets (e.g., menus, images).
- **Frontend**:
  - **EJS**: Server-side rendered templates for all frontend interfaces.
- **AI Integration**:
  - **Gemini API**: Analyzes customer data for insights.
- **Email Functionality**:
  - Node.js-based email notifications.
- **Deployment**:
  - Hosted on **Render** for reliable performance.
  - Plans to migrate to **AWS** for scalability.
- **QR Code Generation**:
  - Dynamic QR codes for customer ordering pages.

---

## 📈 How It Works

QuickServe follows a clear onboarding and operational flow:

1. **Restaurant Owner Visits Landing Page**:
   - Submits a contact form with business details.
2. **Admin Team Outreach**:
   - Team contacts the owner, collects details (e.g., location, menu), and may visit the restaurant.
3. **Data Integration**:
   - Restaurant info is stored in PostgreSQL.
   - Backend generates a file structure with a QR code for the customer page.
4. **Page Deployment**:
   - Restaurant page and POS system are deployed on Render.
   - Owners receive an email when their page is live.
5. **Customer Interaction**:
   - Customers scan the QR code to access menus and place orders.
6. **Admin Management**:
   - Admins manage menus and monitor performance via the dashboard.

---

## 🌟 Future Enhancements

QuickServe is set to evolve with innovative features:

- **AI-Powered Insights**:
  - Analyze trending dishes, customer preferences, and market trends.
  - Provide restaurant owners with customer database analytics.
- **Cloud Migration**:
  - Transition to AWS for enhanced scalability.
- **Enhanced Features**:
  - Personalized customer recommendations and loyalty programs.
  - Third-party integrations for payments and inventory.

---

## 🔧 Getting Started

To run QuickServe locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/hiyadullu/quickserve.git
   ```

2. **Install Backend Dependencies**:

   - Navigate to each backend folder and install dependencies:

     ```bash
     cd quickserve/admin/backend
     npm install
     cd ../../pos/backend
     npm install
     cd ../../customer/backend
     npm install
     cd ../../landing/backend
     npm install
     ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in each backend folder with:
     - Database credentials
     - Gemini API key
     - Email service settings

4. **Run the Application**:

   - Start each backend server from its respective folder:

     ```bash
     npm start
     ```

5. **Access the Application**:

   - Landing page: `https://quickserve-xq4x.onrender.com`
   - Admin dashboard: `https://adminquickserve.onrender.com`
   - POS system: `https://quickserve-o7kp.onrender.com`
   - Customer portal: `https://quickserve-1-ezur.onrender.com/customer/:restaurantId` [try restaurantId: 23, for demo purposes]

*Note*: The frontend is built with EJS and served from the backend. No separate frontend installation is required.

---

## 🤝 Contributing

We welcome contributions to QuickServe! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## 📬 Contact

Reach out to the QuickServe team via https://quickserve-xq4x.onrender.com or email us at support@testoverseas.com.

---

**QuickServe** empowers restaurants to modernize operations and delight customers. Join us in transforming the restaurant industry! 🍽️