# AI-Powered Career Development Platform

A modern web application that helps users navigate their career development journey using AI-powered insights and personalized learning paths.

## Features

- AI-powered skill assessment and learning path recommendations
- Interactive challenges and projects
- Real-time feedback on skill development
- Personalized learning experience
- Accessibility features for different learning styles
- Gamification elements for engagement

## Tech Stack

- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Prisma for database management
- NextAuth.js for authentication
- Headless UI for accessible components
- Heroicons for icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Initialize the database:
   ```bash
   npx prisma db push
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── lib/             # Utility functions and configurations
├── prisma/          # Database schema and migrations
└── types/           # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
