# 🤖 Smart AI Career Advisor

An intelligent AI based career guidance assistant that allows users to either upload their resume or type a skill to get personalized career suggestions powered by the **AI APIs - Cerebras LLM AI API**. The application features a sleek dark-mode UI built with **React + TailwindCSS** and includes an ** **Node Express.js backend with PDF parsing support** **.

It is built  for students and professionals seeking smart, AI-powered career direction.

---

## 🚀 Features

- 📤 Upload Resume (PDF)
- 🔍 Extract text and analyze with AI
- 🧠 Skill-based Career Advice
- ✨ Dark mode UI
- 📱 Fully responsive frontend
- ⚡ Real-time API communication with Cerebras
- 🔙 Back-to-menu navigation
- 🌐 Deployed-ready structure (Vercel/Render supported)

---

## 📸 Screenshots

### 🏠 Menu Page  
Dark-themed landing screen with two clear options.
<img width="940" height="555" alt="image" src="https://github.com/user-attachments/assets/8a6f8052-844b-4935-9361-2f1bd8bbe18c" />

### 📄 Resume Upload  
Upload a resume and get AI-generated job role suggestions.
<img width="940" height="505" alt="image" src="https://github.com/user-attachments/assets/e3171c95-0fc8-4536-a145-c011ba517408" />
<img width="940" height="649" alt="image" src="https://github.com/user-attachments/assets/71b74c05-e6b8-4773-8721-82335830380c" />
<img width="940" height="917" alt="image" src="https://github.com/user-attachments/assets/7d068097-87f6-4161-81c1-681f445077a3" />

### 🛠️ Skill-Based Advice  
Type a skill and receive AI-generated relevant career path guidance.

<img width="940" height="716" alt="image" src="https://github.com/user-attachments/assets/774b6d3b-7d66-4b49-8875-b6d6dfdbfe4d" />
<img width="940" height="896" alt="image" src="https://github.com/user-attachments/assets/2f21429b-8562-4069-9c1b-57d859e64fb2" />


---

## 🧰 Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React, Tailwind CSS, React Router DOM |
| Backend    | Express.js, Multer, pdfjs-dist       |
| AI Model   | AI APIs - Cerebras LLM API                     |
| Deployment | Vercel (Frontend), Render (Backend)  |

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

- Node.js 18+
- npm or yarn
- (Optional) Vercel & Render accounts for deployment

---

## 🧠 Backend Setup (Express)

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/ai-career-advisor.git
cd ai-career-advisor/backend

# 2. Install dependencies
npm install

# 3. Add your Cerebras API key
# Create a .env file and add:
CEREBRAS_API_KEY=your_cerebras_api_key

# 4. Start the server
node server.js

🌐 Frontend Setup (React + Tailwind)
# 1. Move to the frontend directory
cd ../frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm start

🧠 Architecture

1️⃣ Upload Resume
User uploads a .pdf file.

Backend parses the file using pdfjs-dist.

Extracted text is sent to the Cerebras AI API for career analysis.

2️⃣ Skill-based Query
User enters a skill (e.g., “JavaScript”).

API returns career path suggestions based on the input.

🧪 Example Use Case
Upload a resume in PDF format.

Get AI-generated suggestions like:

“Based on your profile, consider roles like Data Analyst or Backend Engineer.”

Or enter a skill like "Cybersecurity".

Receive tailored guidance like:

"Consider becoming a SOC Analyst, Penetration Tester, or Security Consultant."

📁 Folder Structure
ai-career-advisor/
├── backend/              # Node Express API + pdf parsing
│   └── server.js
├── frontend/             # React frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── tailwind.config.js
├── README.md
└── .env


🌍 Deployment Notes
Frontend: Deploy easily on Vercel using the frontend folder.

Backend: Use Render or Railway to host the Node.js server.

Add proper CORS settings in Express for cross-origin requests.

🤝 Contributing
Pull requests welcome! For major changes, please open an issue first to discuss what you would like to change.

📜 License
MIT License

