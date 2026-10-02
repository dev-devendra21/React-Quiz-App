# NxtAssess — Interactive Quiz & Assessment Platform

NxtAssess is an interactive and responsive quiz assessment platform built with **React.js**. The application provides a complete assessment flow including authentication, protected routes, API-driven questions, multiple question formats, countdown-based assessments, question navigation, score calculation, and result tracking.

The project was developed to practice and demonstrate practical React concepts including **API integration, authentication and authorization, routing, state management, dynamic rendering, conditional rendering, and responsive UI development**.

## Live Demo

https://reactquizbydev.ccbp.tech/

## Design

The application UI was implemented based on the Nxt Assess Figma design.

**Figma Design:**
https://www.figma.com/file/zrXNYeUKIuICnGbGGg0jt2/NXT-Assess

## Features

### Authentication & Authorization

* User login with credential validation
* Displays API-provided error messages for invalid credentials
* Password visibility toggle
* Redirects authenticated users to the Home page
* Prevents unauthenticated users from accessing protected routes
* Redirects authenticated users away from the Login page
* Logout functionality

### Home

* Provides an entry point to the assessment
* Start Assessment navigation
* Responsive layout for different screen sizes

### Assessment

* Fetches questions dynamically from an API
* Displays questions and their corresponding options
* Supports multiple question formats:

  * Default options
  * Image-based options
  * Single-select options
* Dynamically renders the appropriate UI based on the question type
* Tracks answered and unanswered questions
* Allows users to navigate between questions
* Preserves previously selected answers
* Allows users to change answers
* Displays the Next Question button where applicable
* Submit Assessment functionality

### Countdown Timer

* Implements a **10-minute assessment timer**
* Countdown runs throughout the assessment
* Automatically submits the assessment when the timer expires
* Tracks time taken for the assessment

### Question Navigation

* Displays question numbers for quick navigation
* Shows answered and unanswered question states
* Allows users to move directly to a specific question
* Preserves selected answers while navigating between questions

### Results

* Displays the assessment score
* Displays the time taken when the assessment is submitted manually
* Displays the score when the assessment ends due to timeout
* Provides a Reattempt option
* Resets assessment state before starting a new attempt

### Routing

Implemented client-side routing for:

* `/` — Home
* `/assessment` — Assessment
* `/results` — Results
* `/login` — Login
* `*` — Not Found

### Error & Loading States

* Displays a loader while fetching assessment questions
* Handles failed API requests
* Provides a Retry option when question fetching fails
* Includes a custom Not Found page for undefined routes

### Responsive Design

* Responsive UI for mobile, tablet, and desktop devices
* Maintains consistent functionality across different screen sizes

## Tech Stack

* **Frontend:** React.js
* **Language:** JavaScript
* **Routing:** React Router
* **API:** REST API Integration
* **State Management:** React State & Hooks
* **Styling:** CSS3
* **UI:** Responsive Design
* **Version Control:** Git, GitHub

## API Integration

### Login API

```text
POST https://apis.ccbp.in/login
```

Used for user authentication and credential validation.

### Questions API

```text
GET https://apis.ccbp.in/assess/questions
```

Used to dynamically retrieve assessment questions and their corresponding options.

## Application Flow

```text
Login
  ↓
Home
  ↓
Assessment
  ↓
Submit / Time Up
  ↓
Results
  ↓
Reattempt
  ↓
Assessment
```

Protected routes ensure that only authenticated users can access the Home, Assessment, and Results pages.

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

### Installation

Clone the repository:

```bash
git clone https://github.com/dev-devendra21/React-Quiz-App.git
```

Navigate to the project directory:

```bash
cd React-Quiz-App
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

## Project Structure

```text
src/
├── components/
│   ├── Login/
│   ├── Home/
│   ├── Assessment/
│   ├── Results/
│   ├── Header/
│   └── NotFound/
├── App.js
├── App.css
└── index.js
```

## Key React Concepts Demonstrated

This project demonstrates practical implementation of:

* React functional components
* React Hooks
* Component-based architecture
* State management
* REST API integration
* Asynchronous data fetching
* Authentication and authorization
* Protected routes
* Client-side routing
* Conditional rendering
* Dynamic rendering based on API data
* Countdown timers
* Form handling
* Error handling
* Loading states
* Responsive UI development

## Credits

This project was developed as part of the **Nxt Assess** project from the CCBP React course and was implemented to practice the React concepts covered throughout the course.

## Author

**Devendra Chandana**

GitHub:
https://github.com/dev-devendra21
