# HTML & CSS Generator Chatbot

A full-stack web application that uses a GenAI-powered chatbot to generate clean, responsive HTML and CSS for landing pages. The app provides a real-time preview of the generated code and supports authentication, making it a powerful tool for developers and designers to create MVPs quickly.

---

## Objective

Develop a chatbot application that generates well-structured HTML and CSS code within a single file and provides a live preview. The core use case is to facilitate rapid MVP creation for landing pages.

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, ShadcnUI
- **Authentication**: NextAuth.js (Email/Password)
- **Database**: PostgreSQL (NeonDB)
- **ORM**: Prisma
- **GenAI API**: OpenRouter
- **Hosting**: Vercel

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/anilmaurya61/chatbot-html-css-builder.git
cd chatbot-html-css-builder
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Create Environment Variables
Create a .env file in the root:

```
DATABASE_URL=your_postgresql_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
OPENROUTER_API_KEY=your_openai_key
```
You can use Supabase or NeonDB for PostgreSQL.

### 4. Set Up Prisma
```
npx prisma generate
```
### 5. Run the Development Server
```
npm run dev
```
The app will be available at: http://localhost:3000


# Deployment
The application is deployed on Vercel:

Live URL: https://chatbot-html-css-builder.vercel.app