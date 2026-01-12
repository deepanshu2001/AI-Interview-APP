# 🎯 AI-Powered Interview Preparation Platform

A comprehensive full-stack application that leverages multiple AI models to provide realistic interview practice for software engineers. The platform combines DSA coding challenges, behavioral interview assessment, and real-time AI feedback to simulate authentic technical interviews.

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2+-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Java](https://img.shields.io/badge/Java-17+-orange.svg)](https://www.oracle.com/java/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🧠 DSA Coding Round
- **Dynamic Problem Generation**: LLM-powered generation of LeetCode-style problems
- **Real-time Code Evaluation**: Instant feedback on correctness, time complexity, and space complexity
- **Smart Scoring System**: 1-10 scale evaluation across multiple dimensions
- **45-Minute Timed Sessions**: Authentic interview environment with pause/resume functionality
- **Comprehensive Feedback**: Detailed analysis with optimization suggestions

### 🎤 Behavioral Interview Round
- **Voice-to-Text Transcription**: OpenAI Whisper integration for audio processing
- **Multi-Dimensional Assessment**: 5-criteria evaluation system
  - Communication Skills
  - Situational Awareness
  - Leadership Abilities
  - Teamwork Capabilities
  - Conflict Resolution
- **AI-Powered Feedback**: Detailed constructive feedback on soft skills

### 📊 Analytics & Progress Tracking
- **Interview History**: Complete record of all DSA and behavioral rounds
- **Performance Metrics**: Track improvements over time
- **Personalized Insights**: AI-generated recommendations

### 🔐 Security Features
- JWT-based authentication with refresh tokens
- Secure password encryption with BCrypt
- Protected API endpoints with Spring Security
- Session management across devices

## 🛠 Tech Stack

### Backend
- **Framework**: Spring Boot 3.2+
- **Language**: Java 17
- **AI Integration**: Spring AI
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Vite

### AI Models
- **LLaMA 3.1 (8B Instant)**: Code evaluation & problem generation via Groq API
- **Claude Sonnet 4**: Alternative evaluation model
- **OpenAI Whisper (large-v3)**: Audio transcription

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       React Frontend                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ DSA Round    │  │ Behavioral   │  │ Dashboard    │      │
│  │ Component    │  │ Component    │  │ Component    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────┬────────────────────────────────┘
                             │ REST API
┌────────────────────────────▼────────────────────────────────┐
│                    Spring Boot Backend                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Controllers Layer                        │   │
│  │  • LeetcodeProblemFetcher                            │   │
│  │  • DSAEvaluationController                           │   │
│  │  • BehaviouralEvaluationController                   │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Service Layer                            │   │
│  │  • DSAEvaluationServiceImpl                          │   │
│  │  • BehaviouralEvaluationServiceImpl                  │   │
│  │  • UserServiceImpl                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              ChatClient Beans                         │   │
│  │  • LeetcodeClient (Problem Generation)               │   │
│  │  • DSAEvaluationClient (Code Analysis)               │   │
│  │  • BehaviorEvaluationClient (Soft Skills)            │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                      External Services                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Groq API    │  │ Anthropic    │  │  OpenAI      │      │
│  │  (LLaMA 3.1) │  │ (Claude)     │  │  (Whisper)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    PostgreSQL Database                       │
│  • Users          • CodingInterviews   • CodingRatings      │
│  • BehaviorInterviews                                       │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 17+** ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **PostgreSQL 14+** ([Download](https://www.postgresql.org/download/))
- **Maven 3.8+** ([Download](https://maven.apache.org/download.cgi))
- **Git** ([Download](https://git-scm.com/downloads))

### API Keys Required
- **Groq API Key** ([Get it here](https://console.groq.com/))
- **OpenAI API Key** ([Get it here](https://platform.openai.com/api-keys))
- **Anthropic API Key** (Optional) ([Get it here](https://console.anthropic.com/))

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-interview-platform.git
cd ai-interview-platform
```

### 2. Backend Setup

```bash
cd backend

# Create PostgreSQL database
psql -U postgres
CREATE DATABASE interview_platform;
\q

# Configure application.properties
cp src/main/resources/application.properties.example src/main/resources/application.properties

# Edit application.properties with your configurations
nano src/main/resources/application.properties
```

**application.properties**:
```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/interview_platform
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Configuration
SECRET_KEY=your_base64_encoded_secret_key_min_256_bits

# AI Model Configuration
spring.ai.openai.api-key=${OPENAI_API_KEY}
spring.ai.groq.api-key=${GROQ_API_KEY}
spring.ai.anthropic.api-key=${ANTHROPIC_API_KEY}

# Server Configuration
server.port=8080
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

**Build and Run**:
```bash
# Install dependencies and build
mvn clean install

# Run the application
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your backend URL
nano .env
```

**.env**:
```env
VITE_API_URL=http://localhost:8080
```

**Run Development Server**:
```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

### 4. Generate JWT Secret Key

```bash
# Generate a secure base64-encoded key
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

Copy the output and set it as `SECRET_KEY` in `application.properties`

## ⚙️ Configuration

### Environment Variables

**Backend** (`application.properties`):
```properties
# Required
SECRET_KEY=<your-jwt-secret>
OPENAI_API_KEY=<your-openai-key>
GROQ_API_KEY=<your-groq-key>

# Optional
ANTHROPIC_API_KEY=<your-anthropic-key>
```

**Frontend** (`.env`):
```env
VITE_API_URL=http://localhost:8080
```

### Database Schema

The application will auto-create tables on first run. Main entities:

- `users`: User accounts and authentication
- `coding_interviews`: DSA interview sessions
- `coding_ratings`: Code evaluation scores and feedback
- `behavior_interviews`: Behavioral interview sessions with scores

## 🎮 Usage

### 1. Register/Login

Navigate to `http://localhost:5173` and create an account or login.

### 2. Start a DSA Round

1. Click **"Start DSA Practice"** from the dashboard
2. Click **"Start Round"** to begin the 45-minute timer
3. Read the AI-generated problem statement
4. Write your solution in the code editor
5. Click **"Submit"** when ready
6. Review detailed feedback on correctness, complexity, and optimization

### 3. Behavioral Interview

1. Click **"Behavioral Interview"** from the dashboard
2. Receive an AI-generated behavioral question
3. Click **"Start Recording"** and provide your answer (audio)
4. Submit your response
5. Receive multi-dimensional feedback on soft skills

### 4. Track Progress

View your interview history and performance metrics on the dashboard.

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### DSA Endpoints

#### Get Random Problem
```http
GET /api/dsa-problem
```

**Response**:
```json
{
  "title": "Two Sum",
  "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
  "difficulty": "EASY",
  "tags": "Array,Hash Table",
  "problemStatement": "Given an array of integers...",
  "testCases": "Input: [2,7,11,15], target = 9\nOutput: [0,1]"
}
```

#### Submit Code for Evaluation
```http
POST /api/user/dsa-evaluation
Authorization: Bearer <token>
Content-Type: application/json

{
  "usercode": "class Solution { ... }",
  "userid": 1,
  "problem": "Given an array of integers..."
}
```

**Response**:
```json
{
  "correctness": 9,
  "timeComplexity": 8,
  "spaceComplexity": 7,
  "feedback": "Your solution correctly implements..."
}
```

### Behavioral Interview Endpoints

#### Get Behavioral Question
```http
GET /api/behavioralquestion
```

**Response**:
```
"Tell me about a time when you had to make a difficult decision with incomplete information."
```

#### Submit Behavioral Response
```http
POST /api/user/behaviour
Authorization: Bearer <token>
Content-Type: multipart/form-data

question: "Tell me about a time..."
audio: <audio-file.webm>
userId: 1
```

**Response**:
```json
{
  "overallScore": 8.2,
  "communication": 9,
  "situationalAwareness": 8,
  "leadershipSkills": 8,
  "teamworkAbility": 9,
  "conflictResolution": 7,
  "overallFeedback": "You demonstrated strong communication..."
}
```

### User Stats Endpoints

#### Get Interview Counts
```http
GET /api/user/dsa-count/{userId}
GET /api/user/behavioral-count/{userId}
Authorization: Bearer <token>
```

## 📁 Project Structure

```
ai-interview-platform/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/demo/
│   │   │   │   ├── Configuration/
│   │   │   │   │   ├── ChatClientConfig.java
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   └── CorsConfig.java
│   │   │   │   ├── Controllers/
│   │   │   │   │   ├── LeetcodeProblemFetcher.java
│   │   │   │   │   ├── DSAEvaluationController.java
│   │   │   │   │   ├── BehaviouralEvaluationController.java
│   │   │   │   │   └── UserController.java
│   │   │   │   ├── Services/
│   │   │   │   │   ├── DSAEvaluationService.java
│   │   │   │   │   ├── BehaviouralEvaluationService.java
│   │   │   │   │   ├── UserService.java
│   │   │   │   │   └── JWTService.java
│   │   │   │   ├── ServiceImpl/
│   │   │   │   │   ├── DSAEvaluationServiceImpl.java
│   │   │   │   │   ├── BehaviouralEvaluationServiceImpl.java
│   │   │   │   │   ├── UserServiceImpl.java
│   │   │   │   │   ├── JWTServiceImpl.java
│   │   │   │   │   └── MyUserDetailsServiceImpl.java
│   │   │   │   ├── Entities/
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── CodingInterview.java
│   │   │   │   │   ├── CodingRating.java
│   │   │   │   │   └── BehaviorInterview.java
│   │   │   │   ├── Repositories/
│   │   │   │   │   ├── UserRepository.java
│   │   │   │   │   ├── CodingInterviewRepository.java
│   │   │   │   │   ├── CodingRatingRepository.java
│   │   │   │   │   └── BehaviorInterviewRepository.java
│   │   │   │   ├── DTOS/
│   │   │   │   │   ├── UserRequestDTO.java
│   │   │   │   │   ├── UserResponseDTO.java
│   │   │   │   │   ├── DSAEvaluationDTO.java
│   │   │   │   │   └── BehaviourEvaluationDTO.java
│   │   │   │   ├── Exceptions/
│   │   │   │   │   ├── UserNotFoundException.java
│   │   │   │   │   └── UserAlreadyExist.java
│   │   │   │   └── DemoApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── application-prod.properties
│   │   └── test/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── DSARoundPage.jsx
│   │   │   ├── BehavioralRoundPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── .gitignore
├── README.md
└── LICENSE
```

## 🔧 Troubleshooting

### Common Issues

**1. Database Connection Error**
```
Error: FATAL: password authentication failed for user "postgres"
```
**Solution**: Verify PostgreSQL credentials in `application.properties`

**2. JWT Token Error**
```
Error: JWT signature does not match locally computed signature
```
**Solution**: Ensure `SECRET_KEY` is properly base64-encoded and at least 256 bits

**3. CORS Error**
```
Error: Access to fetch at 'http://localhost:8080' from origin 'http://localhost:5173' has been blocked
```
**Solution**: Verify CORS configuration in `CorsConfig.java` allows your frontend origin

**4. Audio Upload Error**
```
Error: Maximum upload size exceeded
```
**Solution**: Increase `spring.servlet.multipart.max-file-size` in properties

**5. LLM API Rate Limit**
```
Error: Rate limit exceeded
```
**Solution**: Implement caching or upgrade your API plan

## 🚀 Production Deployment

### Docker Deployment

**Create Dockerfile** (Backend):
```dockerfile
FROM openjdk:17-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Build and Run**:
```bash
# Backend
mvn clean package
docker build -t interview-platform-backend .
docker run -p 8080:8080 interview-platform-backend

# Frontend
npm run build
docker build -t interview-platform-frontend .
docker run -p 3000:80 interview-platform-frontend
```

### Cloud Deployment Options

- **AWS**: EC2 + RDS + S3 + CloudFront
- **Google Cloud**: Cloud Run + Cloud SQL + Cloud Storage
- **Heroku**: Easy deployment with Heroku Postgres
- **Railway**: Simple full-stack deployment
- **Vercel/Netlify**: Frontend hosting (connect to separate backend)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- **Java**: Follow Oracle Java Code Conventions
- **JavaScript**: Use ESLint + Prettier
- **Commits**: Use conventional commits format

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Spring AI](https://spring.io/projects/spring-ai) for AI integration framework
- [Groq](https://groq.com/) for LLaMA model inference
- [OpenAI](https://openai.com/) for Whisper transcription
- [Anthropic](https://anthropic.com/) for Claude models
- [LeetCode](https://leetcode.com/) for inspiring the problem format

## 📧 Contact

**Your Name** - [your.email@example.com](mailto:your.email@example.com)

**Project Link**: [https://github.com/yourusername/ai-interview-platform](https://github.com/yourusername/ai-interview-platform)

---

⭐ If you found this project helpful, please give it a star!

**Built with ❤️ using Spring Boot, React, and AI**
