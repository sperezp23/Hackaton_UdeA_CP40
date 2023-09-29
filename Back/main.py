from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware  # Importa CORS middleware
import json
import models
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



@app.post("/prompt")
async def create_prompt(prompt: Prompt):
    response = llm.get_json(prompt = prompt.symptoms,age=prompt.age,gender=prompt.gender)
    response = json.loads(response)
 
    predict = models.predict(features=response)
    if predict == 0:
        return {"prediction": "No hay riesgo de diabetes"}
    else:
        return {"prediction": "Riesgo de diabetes"}


