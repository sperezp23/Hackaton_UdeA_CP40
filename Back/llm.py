import os
import openai
import sys
sys.path.append("../..")
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

llm_model = "gpt-3.5-turbo"

chat = ChatOpenAI(temperature=0.0,model=llm_model)
print("Chatting with LLM...",chat)


template = """"Identifica las siguientes entidades en el texto: {prompt}\
    Cada una de las entidades debe estar relacionada a los siguientes datos: {data}\
        Devuelveme un diccionario con las entidades y sus datos asociados,\
            La llave de cada entidad debe ser el nombre de la entidad y el valor debe ser un numero si corresponde, \
                o un Yes o No si corresponde."""

prompt_template = ChatPromptTemplate.from_template(template)

prompt = "Persona de 25 años de edad, genero masculino, con poliuria, polidipsia, perdida de peso repentina, debilidad, polifagia, candidiasis genital, visión borrosa, picazón."

data = """age: int\
    gender: str\
    polyuria: str\
    polydipsia: str\
    sudden_weight_loss: str\
    weakness: str\
    polyphagia: str\
    genital_thrush: str\
    visual_blurring: str\
    itching: str"""

message = prompt_template.format_messages(prompt=prompt,data=data)
response = chat(message)

print("Prompt:",response.content)
