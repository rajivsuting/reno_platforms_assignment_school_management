# School Management System

A professional school management platform built with Next.js and MySQL, featuring a modern UI design and comprehensive data management capabilities.

## ⚠️ Important Notice

**For the best experience, please run this application locally.**

The deployed version on Vercel has limitations with image uploads due to serverless environment constraints. While the application is fully functional for viewing schools, adding/editing schools with images works best in a local development environment.

**Local Development Benefits:**

- ✅ Full image upload functionality
- ✅ Complete CRUD operations
- ✅ Better performance
- ✅ No serverless limitations

## Features

### 🏫 Add School Page (`/addSchool`)

- **React Hook Form** with comprehensive validation
- **Image upload** to `schoolImages` folder
- **Email validation** and required field validation
- **Responsive design** for all devices
- **Professional form UI** with error handling

### 📚 Show Schools Page (`/showSchools`)

- **E-commerce style** school listing
- **Search functionality** by name, address, or city
- **City filtering** with dropdown
- **Responsive grid layout** (1-4 columns based on screen size)
- **Professional card design** with hover effects

### 🛠 Technical Features

- **Next.js 15** with App Router
- **MySQL database** with proper indexing
- **Tailwind CSS** for styling
- **Lucide React** icons (no emojis)
- **Form validation** with Yup schema
- **Image upload** handling
- **API routes** for data operations
- **Responsive design** for mobile and desktop

## Database Schema

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact VARCHAR(15) NOT NULL,
    image TEXT,
    email_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd reno_platforms_assignment_school_management
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up the database**

   ```bash
   # Run the database setup script
   mysql -u root -p < database-setup.sql
   ```

4. **Configure environment variables**

   ```bash
   # Copy the example environment file
   cp env.example .env.local

   # Edit .env.local with your database credentials
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password_here
   DB_NAME=school_management
   ```

5. **Start the development server**

```bash
npm run dev
```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── addSchool/          # Add School page
│   ├── showSchools/        # Show Schools page
│   ├── api/
│   │   ├── schools/        # Schools API routes
│   │   └── upload/         # Image upload API
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout
│   └── page.js             # Home page
├── components/
│   └── Navigation.js       # Navigation component
└── lib/
    └── db.js              # Database configuration
```

## API Endpoints

### GET `/api/schools`

Fetches all schools from the database

### POST `/api/schools`

Adds a new school to the database

### POST `/api/upload`

Handles image upload to the `schoolImages` folder

## Usage

### Adding a School

1. Navigate to `/addSchool`
2. Fill in all required fields
3. Upload a school image
4. Submit the form
5. View success/error messages

### Viewing Schools

1. Navigate to `/showSchools`
2. Use search to find specific schools
3. Filter by city using the dropdown
4. View schools in a responsive grid layout

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Database Setup for Production

- Use a production MySQL database (e.g., PlanetScale, AWS RDS)
- Update environment variables with production credentials
- Ensure proper database indexing for performance

## Technologies Used

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL 8.0
- **Form Handling**: React Hook Form, Yup validation
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v4

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for the Reno Platforms assignment.

## Support

For any issues or questions, please create an issue in the repository.
