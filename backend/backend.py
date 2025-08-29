# backend.py
import random
import spacy
import nltk
from nltk.corpus import wordnet
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from deep_translator import GoogleTranslator

# Download WordNet resources
nltk.download('wordnet')
nltk.download('omw-1.4')

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Translator: English -> Tamil
translator = GoogleTranslator(source="en", target="ta")

app = FastAPI()

# Allow CORS (so React can call API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev: change to ["http://localhost:3000"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Paragraph(BaseModel):
    text: str

# WordNet distractors
def get_distractors_wordnet(answer):
    distractors = []
    synsets = wordnet.synsets(answer)
    if synsets:
        for lemma in synsets[0].lemmas():
            if lemma.name().lower() != answer.lower():
                distractors.append(lemma.name().replace("_", " "))
    return list(set(distractors))[:5]

# MCQ Generator with Tamil translations
def generate_mcqs(text):
    questions = []
    # Split paragraph into sentences ending with "."
    lines = [line.strip() for line in text.split("\n") if line.strip().endswith(".")]

    for line in lines:
        doc = nlp(line)
        answer = None
        # Pick first proper noun or noun
        for token in doc:
            if token.pos_ in ["PROPN", "NOUN"]:
                answer = token.text
                break
        if not answer:
            continue

        # Question text with blank
        question_text = line.replace(answer, "_____", 1)

        # Generate distractors
        distractors = get_distractors_wordnet(answer)
        if len(distractors) < 3:
            distractors += random.sample(
                ["India", "China", "USA", "Germany", "London", "Paris"],
                3 - len(distractors),
            )

        options = [answer] + distractors[:3]
        random.shuffle(options)

        # Translate question, options, and answer to Tamil
        tamil_q = translator.translate(question_text)
        tamil_opts = [translator.translate(opt) for opt in options]
        tamil_ans = translator.translate(answer)

        # Prepare MCQ object
        mcq = {
            "question_en": question_text,
            "question_ta": tamil_q,
            "options": [
                {"en": opt, "ta": tamil_opts[i]} for i, opt in enumerate(options)
            ],
            "answer": {"en": answer, "ta": tamil_ans}
        }
        questions.append(mcq)
    return questions

# FastAPI endpoint
@app.post("/generate_mcqs")
async def generate(paragraph: Paragraph):
    mcqs = generate_mcqs(paragraph.text)
    return {"mcqs": mcqs}
