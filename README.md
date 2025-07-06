# HRIS Dashboard - Standalone Frontend

A modern Human Resources Information System (HRIS) dashboard built with React and TypeScript. This is a standalone frontend application with mock data for demonstration purposes.

## Features

### 🔐 Authentication & Authorization
- Mock authentication system
- Role-based access control (Admin, Employee)
- Permission-based UI rendering
- Secure token management

### 👥 Employee Management
- Complete employee directory with mock data
- Add, edit, and view employee details
- Department and role filtering
- Advanced search functionality

### 📅 Time Off Management
- Submit time-off requests
- Approve/reject requests (Admin role)
- Real-time status updates
- Mock data persistence during session

### 🔔 Notifications
- Mock notification system
- Mark as read functionality
- Role-based notification filtering

### 📊 Dashboard & Analytics
- KPI tiles and metrics
- Recent activity feeds
- Department statistics
- Performance indicators

### 🎯 Recruitment (Admin Only)
- Job application management
- Status tracking and updates
- Candidate pipeline overview

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Query** for data fetching and caching
- **Zustand** for state management
- **React Router** for navigation
- **Lucide React** for icons
- **Date-fns** for date formatting

### Mock Data
- **Local Storage** for session persistence
- **Mock API** with realistic delays
- **Sample Data** for all entities

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd hris-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Demo Accounts

For testing purposes, use these demo accounts:

- **Admin**: `admin@example.com` / `password`
  - Full access to all features
  - Can manage employees
  - Can approve time-off requests
  - Can view recruitment applications

- **Employee**: `employee@example.com` / `password`
  - Limited access
  - Can view own profile
  - Can submit time-off requests
  - Cannot access admin features

## User Roles & Permissions

### Admin
- Full system access
- Employee management
- Recruitment management
- Time-off approvals
- All dashboard features

### Employee
- View own profile
- Submit time-off requests
- View own data only
- Limited dashboard access

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components
│   ├── modals/         # Modal components
│   └── ui/             # Base UI components
├── data/               # Mock data
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # Mock API services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Mock Data

The application uses mock data stored in `src/data/mockData.ts`. This includes:

- 50 sample employees across different departments
- Time-off requests with various statuses
- Job applications for recruitment
- KPI data and department information
- Notification samples

### State Management

- **Authentication**: Zustand store with localStorage persistence
- **API Data**: React Query for caching and synchronization
- **UI State**: Local component state and custom hooks

## Features Overview

### Dashboard
- KPI tiles showing key metrics
- Recent hires list
- Pending time-off requests
- Department statistics

### People Management
- Searchable employee directory
- Filterable by department and status
- Detailed employee profiles
- Add new employee functionality

### Time Off System
- Request submission form
- Approval workflow for managers
- Status tracking and history
- Calendar integration (UI ready)

### Recruitment
- Application pipeline management
- Status updates for candidates
- Admin-only access control

### Notifications
- Real-time notification bell
- Mark as read functionality
- Contextual notifications for actions

## Customization

### Adding New Roles
Edit `src/hooks/useAuth.ts` to add new roles and permissions:

```typescript
const rolePermissions = {
  admin: [...],
  hr: [...],
  manager: [...],
  employee: [...]
};
```

### Adding New Features
1. Create new components in appropriate folders
2. Add routes in `src/App.tsx`
3. Update navigation in `src/components/layout/Sidebar.tsx`
4. Add mock API endpoints in `src/services/api.ts`

### Styling
The application uses Tailwind CSS with a custom design system:
- Primary colors: Blue tones
- Secondary colors: Orange/yellow tones
- Neutral grays for text and backgrounds
- Custom border radius and shadows

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

3. Configure your web server to serve `index.html` for all routes (SPA routing)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Screenshots

### Admin Dashboard
- Full KPI overview
- Employee management access
- Recruitment pipeline
- Time-off approvals

### Employee View
- Personal dashboard
- Time-off request form
- Profile management
- Limited navigation

### Features
- Responsive design for all screen sizes
- Dark mode ready (theme system in place)
- Accessibility features
- Modern UI with smooth animations