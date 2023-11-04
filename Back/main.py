from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware  # Importa CORS middleware
import json
import models

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    # Cambia esto al origen de tu aplicación cliente
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Prompt(BaseModel):
    pidnum: int
    time: int
    trt: int
    age: int
    wtkg: str
    hemo: bool
    homo: bool
    drugs: bool
    karnof: int
    oprior: bool
    z30: bool
    zprior: bool
    preanti: int
    race: int
    gender: bool
    str2: bool
    strat: int
    symptom: bool
    treat: bool
    offtrt: bool
    cd40: int
    cd420: int
    cd80: int
    cd820: int
    cid: int


@app.post("/metodo")
async def create_prompt(prompt: Prompt):
    # response = llm.get_json(pidnum = prompt.pidnum
    #                         ,time=prompt.time,trt=prompt.trt,age=prompt.age,wtkg=prompt.wtkg,
    #                         hemo=prompt.hemo,homo=prompt.homo,drugs=prompt.drugs,karnof=prompt.karnof,
    #                         preanti=prompt.preanti,race=prompt.race,gender=prompt.gender,
    #                         str2=prompt.str2,strat=prompt.strat,symptom=prompt.symptom,
    #                         treat=prompt.treat,offtrt=prompt.offtrt,cd40=prompt.cd40,
    #                         cd420=prompt.cd420,cd80=prompt.cd80,cid=prompt.cid)
    # response = json.loads(response)

    predict = models.predict(prompt)
    if predict == 0:
        return {"prediction": "No hay riesgo de diabetes"}
    else:
        return {"prediction": "Riesgo de diabetes"}
