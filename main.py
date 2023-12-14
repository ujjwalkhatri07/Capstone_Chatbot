from fastapi import FastAPI
from transformers import pipeline
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from bot_context import get_context

qa = pipeline("question-answering", model="my_saved_model_new")


class Item(BaseModel):
    context: str
    question: str


class QuestionItem(BaseModel):
    question: str


origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return "Welcome to question answering project"


@app.post("/question-answering-with-context")
async def generate_quesetion_with_context(item: Item):
    response = qa(context=item.context, question=item.question)
    return {"message": response['answer']}


@app.post("/question-answering")
async def generate_quesetion_with_context(item: QuestionItem):
    context = get_context(item.question)
    response = qa(context=context, question=item.question)
    return {"message": response['answer']}
