# HRIS Dashboard

A comprehensive Human Resources Information System (HRIS) dashboard built with React, TypeScript, and Tailwind CSS. This application provides a complete solution for managing employees, time-off requests, recruitment, and company settings.

## Features

### 🔐 Authentication
- Secure email/password login system
- Role-based access control (Admin, HR, Manager, Employee)
- Protected routes and admin-only sections

### 👥 Employee Management
- Complete employee directory with search and filtering
- Detailed employee profiles with contact information
- Add new employees through modal forms
- Employee status tracking (Active, On Leave, Inactive)

### 📅 Time-Off Management
- Submit time-off requests with date ranges and reasons
- Approval workflow for managers
- Calendar and list views
- Request status tracking (Pending, Approved, Rejected)

### 🎯 Recruitment Module (Admin Only)
- Job application tracking and management
- Candidate status updates (New, In Review, Accepted, Rejected)
- Application timeline and statistics
- Streamlined hiring workflow

### 📊 Dashboard & Analytics
- Key Performance Indicators (KPIs)
- Employee statistics and trends
- Recent hires and pending requests overview
- Interactive data visualizations

### ⚙️ Settings & Configuration
- Company information management
- User roles and permissions
- Notification preferences
- System configuration options

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state, Zustand for client state
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

## Design System

The application follows a professional design system inspired by modern HR platforms:

- **Colors**: Primary blue (#3F8CFF), Secondary orange (#FFB547), Neutral grays
- **Typography**: Inter font family with consistent hierarchy
- **Spacing**: 4/8/12/20/32px scale
- **Components**: Reusable UI components with consistent styling
- **Responsive**: Mobile-first design with breakpoints for all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hris-dashboard
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Login

For demonstration purposes, you can log in with any email and password combination. The system will automatically authenticate you as an admin user.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Sidebar, TopBar, AppShell)
│   ├── modals/         # Modal components
│   └── ui/             # Base UI components (Button, Card, Input, etc.)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services and data fetching
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── data/               # Mock data for development
```

## Key Features Usage

### Adding New Employees
1. Navigate to the People page
2. Click "Add Employee" button
3. Fill out the employee information form
4. Submit to add the employee to the system

### Managing Time-Off Requests
1. Go to the Time Off page
2. Click "New Request" to submit a request
3. Managers can approve/reject pending requests
4. View all requests in list or calendar format

### Recruitment Management (Admin Only)
1. Access the Recruitment page from the sidebar
2. View all job applications in the table
3. Update application status using the dropdown
4. Track recruitment metrics in the stats cards

### Notifications
- Click the bell icon in the top bar to view notifications
- Notifications include time-off requests, new hires, and system updates
- Badge indicator shows unread notification count

### Profile Management
- Click your profile avatar in the top right
- Access "My Profile" or "Sign Out" options
- Profile dropdown closes when clicking outside

## Development

### Running Tests
```bash
npm run test
# or
pnpm test
```

### Building for Production
```bash
npm run build
# or
pnpm build
```

### Linting and Formatting
```bash
npm run lint
pnpm run lint
```

## API Endpoints

The application uses a mock API service that simulates real backend endpoints:

- `GET /employees` - Fetch employees with pagination and filters
- `POST /employees` - Create new employee
- `GET /employees/:id` - Get employee details
- `GET /time-off-requests` - Fetch time-off requests
- `POST /time-off-requests` - Create new time-off request
- `GET /applications` - Fetch job applications (Admin only)
- `PATCH /applications/:id` - Update application status
- `GET /kpi-data` - Fetch dashboard KPIs
- `GET /departments` - Fetch department list

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.#   H R I S - a p p  
 