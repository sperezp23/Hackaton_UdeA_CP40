from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

class Prompt(BaseModel):
    prompt: str



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

@app.put("/prompt")
async def prompt(prompt: Prompt):
    return {"prompt": prompt.prompt}

@app.put("/predict")
async def predict(features: Features):
    return {"prediction": "positive"}