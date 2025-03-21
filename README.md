# QuickServe

QuickServe is an ecosystem where cafes and restaurants can onboard and access a suite of services. It provides digital menus, online ordering, payment solutions, and analytics to streamline operations and enhance customer experience.

## Features

- **Digital Menu**: Restaurants can create and manage digital menus easily.
- **Online Ordering**: Customers can place orders directly from their phones.
- **QR Code Integration**: Each table gets a unique QR code for seamless ordering.
- **Payments**: Secure and fast transactions with multiple payment gateways.
- **Order Management**: Real-time order tracking and processing.
- **Customer Analytics**: Insights and reports to optimize business performance.

## Tech Stack

- **Frontend**: Tailwind CSS, EJS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: Session Based Authentication
- **Cloud Storage**: Aiven

## Installation

### Prerequisites
- Node.js (>=16.x)
- PostgreSQL (>=14.x)
- npm or yarn

### Steps

```bash
# Clone the repository
git clone https://github.com/hiyadullu/quickserve.git
cd quickserve

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the PostgreSQL server and create the necessary database

# Start the server
npm run dev
```

## API Endpoints - Customer End

### Authentication
- `POST <restaurant_username>.quickserve.com/auth/register` - Register a new customer
- `POST <restaurant_username>.quickserve.com/auth/login` - Login to the platform

### Menu Management
- `POST <restaurant_username>.quickserve.com/menu/addtocart` - Add new menu items
- `GET <restaurant_username>.quickserve.com/menu` - Retrieve menu items

## Contributing

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a pull request

## License

MIT License
