![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)

# 🏆 BioMap – 4th Place Winner ($70 Prize) 🎉

> Awarded **4th Place** in the **StackUp May 2025 Challenge** with a prize of **$70** for building a fully-featured scientific web application — BioMap.

---

## 🖼️ Proof of Participation & Reward

![Screenshot 1](./Screenshot%202025-06-29%20145411.png)  
![Screenshot 2](./Screenshot%202025-06-29%20145427.png)  
![Screenshot 3](./Screenshot%202025-06-29%20145445.png)  
![Screenshot 4](./Screenshot%202025-06-29%20145511.png)

---
## 🌍 BioMap - Interactive Biodiversity and Science Platform

**BioMap** is a powerful and visually engaging scientific web application designed for biodiversity enthusiasts, researchers, and learners. It brings together a suite of features powered by real-time APIs for exploring biodiversity, chemistry, space, environmental monitoring, and educational resources — all in one place.

---

## 📚 Table of Contents

- [Features](#-features)
- [Live Demo and Showcase](#-live-demo-and-video-showcase)
- [Why BioMap?](#-why-biomap)
- [Directory Structure](#-directory-structure)
- [API Integrations](#-api-integrations)
- [Getting Started](#-getting-started)
- [Authentication Workflow](#-authentication-workflow)
- [Tech Stack](#-tech-stack)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)
- [Contact](#-contact)
---

## ✨ Features

- 🗺️ **Interactive Biodiversity Map** – Explore species distributions and biodiversity hotspots globally
- ⚗️ **Chemistry Database** – Search and view detailed data on chemical compounds
- 🚀 **NASA Space Media Gallery** – Browse imagery and videos from NASA’s open data
- 🌱 **Environmental Monitoring** – Track real-time environmental data by location
- 🐾 Species Database – Explore species information, including taxonomy, conservation status, and habitats.
- 📚 **Educational Resources** – Access curated articles via Wikipedia API
- 🔐 **User Authentication** – Secure login, registration, and OTP-based email verification
- 🙍‍♂️ **User Profiles** – Manage personalized profiles and data

---

## 🌐 Live Demo and Video Showcase

**Live App**: [biomap-nitrajsinh-solankis-projects.vercel.app](https://biomap-nitrajsinh-solankis-projects.vercel.app)

🎥 Product Demo: [Watch the Demo](https://youtu.be/df_NNqL2DzA?feature=shared)  
🛠️ Setup Tutorial: [Installation Guide](https://youtu.be/gtmI89ZrGck?feature=shared)
---
---
## ❓ Why BioMap?

- 🔍 **Unified Scientific Exploration** – Discover biodiversity, chemistry, environmental data, and space imagery — all from one interface.
- 🌐 **Real-Time Data, Zero Clutter** – BioMap connects directly to public APIs like NASA, GBIF, and Wikipedia, delivering up-to-date info in a clean, intuitive UI.
- 🧪 **Educational & Research-Friendly** – Whether you're a student, teacher, or researcher, BioMap is packed with tools to learn, analyze, and explore scientific data interactively.
- 🔐 **Personalized Experience** – Create a profile, save your insights, and interact with features tailored to your interests.
- ⚙️ **Open Source & Extensible** – Developers can clone, customize, and extend it easily for their own scientific applications or classroom tools.
- 📱 **Fully Responsive** – Works beautifully on both mobile and desktop devices, making science accessible from anywhere.
 
---

## 🧭 Directory Structure

```
Directory structure:
└── biomap/                          
    ├── public/                                   // Static assets served directly by Next.js
    │   └── images/                               // Static image files used throughout the application
    └── src/
        ├── middleware.ts                         // Next.js middleware for auth protection and request handling
        ├── app/
        │   ├── globals.css                       // Global CSS styles applied to the entire application
        │   ├── layout.tsx                        // Root layout component that wraps all pages
        │   ├── page.tsx                          // Homepage component with feature showcase
        │   ├── api/
        │   │   ├── auth/
        │   │   │   ├── login/
        │   │   │   │   └── route.ts              // API endpoint for user authentication
        │   │   │   ├── register/
        │   │   │   │   └── route.ts              // API endpoint for new user registration
        │   │   │   ├── resent-otp/
        │   │   │   │   └── route.ts              // API endpoint to resend verification OTP
        │   │   │   ├── validate/
        │   │   │   │   └── route.ts              // API endpoint to validate user session
        │   │   │   └── verify-otp/
        │   │   │       └── route.ts              // API endpoint to verify OTP during registration
        │   │   ├── image-proxy/
        │   │   │   └── route.ts                  // API endpoint for proxying external images
        │   │   └── user/
        │   │       └── profile/
        │   │           └── route.ts              // API endpoint for user profile management
        │   ├── chemistry/
        │   │   └── page.tsx                      // Chemistry feature page with periodic table
        │   ├── components/
        │   │   ├── CompoundDetails.tsx           // Component for displaying chemical compound details
        │   │   ├── CompoundSearch.tsx            // Search component for chemical compounds
        │   │   ├── DashboardNavbar.tsx           // Navigation bar for the dashboard interface
        │   │   ├── EducationArticleDetails.tsx   // Component for displaying educational article content
        │   │   ├── EducationSearch.tsx           // Search component for educational resources
        │   │   ├── EnvironmentDataVisualizer.tsx // Component for visualizing environmental data
        │   │   ├── EnvironmentLocationSearch.tsx // Location search for environmental monitoring
        │   │   ├── EnvironmentMonitorHeader.tsx  // Header component for environmental monitoring section
        │   │   ├── FeatureCard.tsx               // Card component for displaying app features
        │   │   ├── Footer.tsx                    // Footer component with links and copyright
        │   │   ├── MapComponent.tsx              // Interactive biodiversity map component
        │   │   ├── MapSearch.tsx                 // Search component for the biodiversity map
        │   │   ├── MapUtils.tsx                  // Utility functions for map operations
        │   │   ├── NasaImage.tsx                 // Component for displaying NASA imagery
        │   │   ├── Navbar.tsx                    // Main navigation bar component
        │   │   ├── PeriodicTable.tsx             // Interactive periodic table of elements
        │   │   ├── ProfileForm.tsx               // Form component for editing user profile
        │   │   ├── ProfileInfo.tsx               // Component for displaying user profile information
        │   │   ├── ProfileTypes.tsx              // TypeScript type definitions for profile data
        │   │   ├── SpaceGallery.tsx              // Gallery component for space imagery
        │   │   ├── SpaceMediaDetail.tsx          // Component for detailed view of space media
        │   │   ├── SpaceSearch.tsx               // Search component for space media
        │   │   ├── SpeciesDetail.tsx             // Component for displaying species details
        │   │   ├── SpeciesList.tsx               // Component for listing species data
        │   │   ├── SpeciesSearch.tsx             // Search component for species database
        │   │   └── SpeciesTypes.tsx              // TypeScript type definitions for species data
        │   ├── dashboard/
        │   │   ├── page.tsx                      // Main dashboard page with feature overview
        │   │   ├── chemistry/
        │   │   │   └── page.tsx                  // Chemistry dashboard with compound search
        │   │   ├── education/
        │   │   │   └── page.tsx                  // Educational resources dashboard
        │   │   ├── envmonitor/
        │   │   │   └── page.tsx                  // Environmental monitoring dashboard
        │   │   ├── map/
        │   │   │   └── page.tsx                  // Biodiversity map dashboard
        │   │   ├── profile/
        │   │   │   └── page.tsx                  // User profile management dashboard
        │   │   ├── space/
        │   │   │   └── page.tsx                  // Space media gallery dashboard
        │   │   └── species/
        │   │       └── page.tsx                  // Species database dashboard
        │   ├── login/
        │   │   └── page.tsx                      // User login page with authentication form
        │   ├── register/
        │   │   └── page.tsx                      // User registration page with signup form
        │   ├── services/
        │   │   └── wikipediaService.ts           // Service for fetching data from Wikipedia API
        │   └── verify-otp/
        │       └── page.tsx                      // OTP verification page for email confirmation
        ├── lib/
        │   ├── email.ts                          // Email sending functionality for verification
        │   ├── mongodb.ts                        // MongoDB connection and database utilities
        │   └── otpStore.ts                       // OTP storage and management utilities
        └── models/
            └── User.ts                           // User data model for authentication and profiles
```
---

## 🔗 API Integrations

| Feature              | API Source                                  | Description                                                  |
|----------------------|----------------------------------------------|--------------------------------------------------------------|
| Biodiversity Map     | [GBIF API](https://www.gbif.org/developer)   | Species occurrence and taxonomy data                        |
| Chemistry Database   | [PubChem API](https://pubchem.ncbi.nlm.nih.gov/) | Compound details and molecular structures                   |
| Space Gallery        | [NASA Images API](https://api.nasa.gov/)     | Space media content                                          |
| Environmental Monitor| [OpenStreetMap Nominatim](https://nominatim.org/) | Geolocation and address resolution                           |
| Educational Content  | [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) | Article summaries and information                          |
| Species Observations | [iNaturalist API](https://api.inaturalist.org/v1/docs/) | Species data and observation records                        |

---

## 🛠 Getting Started

### ✅ Prerequisites

- **Node.js** v18+
- **MongoDB** instance (local or cloud)
- **Email service credentials** for OTP (e.g., SendGrid, Mailgun, Gmail with App Passwords)
- **JWT Secret** for token generation

---

### 🚀 Installation

1. **Clone the repository**:

```bash
# Clone the repository
git clone https://github.com/Nitrajsinh-Solanki/biomap.git

# Navigate to the project directory
cd biomap
```

2. **Install dependencies**:

```bash
# Install required npm dependencies
npm install
```

3. **Create `.env` file**:

```bash
# Create environment file
touch .env
```

4. **Configure environment variables**:

Open `.env` and add the following environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
JWT_SECRET=your_jwt_secret_key
```

- **How to get MongoDB connection string**:  
  You can get your MongoDB URI from MongoDB Atlas or your local MongoDB instance. [Watch this video for details](https://youtu.be/SMXbGrKe5gM?feature=shared).

- **How to get your Email user and email password for Nodemailer**:  
  If you are using Gmail, ensure you generate an App Password to use in your application.  
  [Watch this video for instructions](https://youtu.be/FT-AiOcw-50?feature=shared).

- **How to generate a JWT secret**:  
  Use a JWT generator like this [JWT Generator](https://www.javainuse.com/jwtgenerator) to create your secret key.

5. **Run the development server**:

```bash
# Run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore **BioMap** locally.

---

## 🔒 Authentication Workflow

- **Secure registration** with email & password
- **OTP-based email verification** during signup
- **JWT-based session management**
- Protected **dashboard routes** and API endpoints

---

## 🧪 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend/API**: Next.js API routes, MongoDB
- **Auth**: OTP + JWT
- **Styling**: TailwindCSS
- **Maps**: Leaflet, OpenStreetMap
- **Media & Science APIs**: NASA, GBIF, PubChem, Wikipedia, iNaturalist

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for full license text.

---

## 🙌 Acknowledgements

- NASA Open APIs
- GBIF Biodiversity Data
- PubChem Chemical Data
- OpenStreetMap + Nominatim
- Wikipedia API
- iNaturalist Observations

---

## 📬 Contact

- 💬 Discord: `nitrajsinhsolanki`
- 🐦 X/Twitter: [@Nitrajsinh2005](https://twitter.com/Nitrajsinh2005)

--- 
