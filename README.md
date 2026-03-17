# AI Document Summarizer 🚀

A modern, full-stack web application that leverages Agentic AI to automatically extract key insights and generate high-quality summaries from uploaded text documents.

![DocuSummary AI](https://img.shields.io/badge/Status-Active-success)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![TypeScript](https://img.shields.io/badge/Frontend-TypeScript-3178C6?logo=typescript)
![HuggingFace](https://img.shields.io/badge/AI_Model-HuggingFace-FFD21E?logo=huggingface)

## 📌 Features
- **Modern UI:** A sleek, dark-themed glassmorphism interface built with Vanilla HTML/CSS and TypeScript.
- **Drag & Drop:** Easy file upload functionality for `.txt` documents.
- **Powerful AI Backend:** Utilizes the open-source `google/flan-t5-small` model via Hugging Face Transformers.
- **Fast API:** Lightning-fast backend processing powered by Python's FastAPI framework.
- **Interactive API Docs:** Built-in Swagger UI for testing and exploring the backend endpoints.

---

## 🛠️ Tech Stack
**Frontend:**
*   HTML5 / CSS3 (Custom Glassmorphism Design)
*   TypeScript
*   Vite (Build Tool)

**Backend:**
*   Python 3
*   FastAPI
*   Uvicorn (ASGI Server)
*   python-multipart (Handling File Uploads)

**AI & Machine Learning:**
*   Hugging Face `transformers` pipeline
*   `google/flan-t5-small` language model

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
Make sure you have both **Node.js** (for the frontend) and **Python** (for the backend) installed on your machine.

### 1. Setting up the Backend (FastAPI + AI Model)
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the required Python dependencies:
   ```bash
   pip install fastapi uvicorn transformers torch python-multipart
   ```
   *(Note: Installing the PyTorch and Transformers libraries might take a few minutes depending on your internet connection).*
3. Start the FastAPI server:
   ```bash
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
4. The backend should now be running! You can view the interactive API documentation (Swagger UI) by navigating to `http://localhost:8000/docs` in your browser.

### 2. Setting up the Frontend (Vite + TypeScript)
1. Open a *new* terminal window/tab and navigate to the `frontend/frontend` directory:
   ```bash
   cd frontend/frontend
   ```
2. Install the Node modules:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`. You should see the fully styled DocuSummary AI interface!

---

## 💡 How It Works
1. Launch both the frontend and backend servers.
2. Open the frontend URL (`http://localhost:5173`).
3. Drag and drop a `.txt` file into the designated upload zone.
4. Click **"Generate Summary"**.
5. The frontend sends the file to the FastAPI backend. The backend reads the text and passes it to the initialized Hugging Face `flan-t5` model.
6. The AI model processes the text and generates a concise summary.
7. The backend returns the summary string to the frontend, which is then dynamically displayed on the screen!

---

## 👨‍💻 Author
Created by **[Tanish Rana]** during a 6-month Agentic AI Internship.

Main Aim to enhance the skills of Agentic Ai tools and development