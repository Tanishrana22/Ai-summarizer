from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from summarizer import summarize_text

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/summarize")
async def summarize(file: UploadFile):
    content = await file.read()
    text = content.decode("utf-8")
    summary = summarize_text(text)
    return {"summary": summary}
