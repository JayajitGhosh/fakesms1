# EduManage - School Management System

A modern, comprehensive school management system built with Next.js, Tailwind CSS, and Prisma. Designed for students, teachers, and administrators with role-based access and beautiful, responsive UI.

## 🚀 Features

### Role-Based Access
- **Students**: View grades, attendance, schedules, and announcements
- **Teachers**: Manage classes, record grades, take attendance, post announcements
- **Administrators**: Full system control, user management, analytics, and settings

### Core Features
- 📊 **Dashboard Analytics**: Real-time insights and performance metrics
- 👥 **User Management**: Comprehensive user profiles and role management
- 📚 **Class Management**: Organize classes, subjects, and student rosters
- 📈 **Grade Management**: Multi-type assessment grading system
- ✅ **Attendance Tracking**: Real-time attendance monitoring
- 📢 **Announcements**: Communication system for all users
- 📱 **Responsive Design**: Mobile-first approach with beautiful UI
- 🔐 **Secure Authentication**: NextAuth.js with role-based protection

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth.js
- **Icons**: Lucide React
- **Charts**: Recharts (for analytics)

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # Seed the database with demo data
   npx tsx scripts/seed.ts
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 👥 Demo Credentials

After seeding the database, you can use these demo accounts:

### Admin Access
- **Email**: admin@demo.com
- **Password**: password123
- **Features**: Full system control, user management, analytics

### Teacher Access
- **Email**: teacher@demo.com
- **Password**: password123
- **Features**: Class management, grading, attendance

### Student Access
- **Email**: student@demo.com
- **Password**: password123
- **Features**: View grades, attendance, announcements

## 📁 Project Structure

```
school-management-system/
├── app/                          # Next.js app directory
│   ├── admin/                    # Admin dashboard pages
│   ├── auth/                     # Authentication pages
│   ├── student/                  # Student dashboard pages
│   ├── teacher/                  # Teacher dashboard pages
│   ├── api/                      # API routes
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/                   # Reusable components
│   ├── layouts/                 # Layout components
│   └── providers/               # Context providers
├── prisma/                      # Database schema
│   └── schema.prisma           # Prisma schema
├── scripts/                     # Database scripts
│   └── seed.ts                 # Database seeding
├── public/                      # Static assets
└── package.json                 # Dependencies
```

## 🎨 Design System

The application uses a comprehensive design system built with Tailwind CSS:

### Color Palette
- **Primary**: Blue shades for main actions
- **Success**: Green shades for positive actions
- **Warning**: Orange shades for alerts
- **Danger**: Red shades for errors
- **Secondary**: Gray shades for neutral elements

### Components
- **Cards**: Consistent card layouts with shadows
- **Buttons**: Multiple button variants with hover states
- **Forms**: Styled form inputs and validation
- **Navigation**: Responsive sidebar navigation
- **Tables**: Data tables with sorting and pagination

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Commands
```bash
npx prisma studio    # Open Prisma Studio
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma db seed   # Seed database
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- **Role-based Access Control**: Different interfaces for each user type
- **Secure Authentication**: NextAuth.js with JWT tokens
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Form validation and sanitization
- **SQL Injection Protection**: Prisma ORM with parameterized queries

## 📊 Database Schema

The system uses a comprehensive database schema with the following main entities:

- **Users**: Students, teachers, and administrators
- **Classes**: Academic classes with subjects
- **Grades**: Assessment records and scores
- **Attendance**: Student attendance tracking
- **Announcements**: System-wide communications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

## 🎯 Roadmap

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with external systems
- [ ] Multi-language support
- [ ] Advanced reporting features
- [ ] Parent portal
- [ ] Payment integration

---

**Built with ❤️ using Next.js and Tailwind CSS**