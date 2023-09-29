from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware  # Importa CORS middleware
import json
import llm

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Cambia esto al origen de tu aplicación cliente
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Prompt(BaseModel):
    firstName: str
    lastName: str
    gender:str
    age:int
    symptoms:str

class Features(BaseModel):
    age: int
    gender: str
    polyuria: str
    polydipsia: str
    sudden_weight_loss: str
    weakness: str
    polyphagia: str
    genital_thrush: str
    visual_blurring: str
    itching: str
    irritability: str
    delayed_healing: str
    partial_paresis: str
    muscle_stiness: str
    alopecia: str
    obesity: str

@app.post("/prompt")
async def create_prompt(prompt: Prompt):
    response = llm.get_json(prompt = prompt.symptoms,age=prompt.age,gender=prompt.gender)
    response = json.loads(response)
    return {"prompt": prompt.symptoms}

def predict(features: Features):
    return {"prediction": "positive"}