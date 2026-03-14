from transformers import pipeline


summarizer = pipeline(
    "text-generation",
    model="google/flan-t5-small"
)

def summarize_text(text: str):
    prompt = f"Summarize the following text:\n{text}"

    result = summarizer(
        prompt,
        max_length=120,
        do_sample=False
    )

    return result[0]["generated_text"]