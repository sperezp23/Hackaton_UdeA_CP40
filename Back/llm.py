import os
import openai
import sys
sys.path.append("../..")
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

def get_json(prompt:str,gender:str,age:str):
    openai.api_key = os.getenv("OPENAI_API_KEY")

    llm_model = "gpt-3.5-turbo"

    chat = ChatOpenAI(temperature=0.0,model=llm_model)
    print("Chatting with LLM...",chat)


    template = """"Identifica las siguientes entidades en el texto: {prompt}\
        Cada una de las entidades debe estar relacionada a los siguientes datos: {data}\
        El paciente es {gender} y tiene {age} años.\
            Devuelveme un diccionario con las entidades y sus datos asociados,\
                La llave de cada entidad debe ser el nombre de la entidad y el valor debe ser\
                    un Yes o No si corresponde. En caso de que sea género debes poner Male o Female.\
                    Siempre debes devolverme un JSON con las respuestas. En caso contrario, poner los datos por defecto: 0, No, Male.
                    """

    prompt_template = ChatPromptTemplate.from_template(template)

    

    data = """age: int\
        gender: str\
        polyuria: str\
        polydipsia: str\
        sudden_weight_loss: str\
        weakness: str\
        polyphagia: str\
        genital_thrush: str\
        visual_blurring: str\
        itching: str\
        irritability: str\
        delayed_healing: str\
        partial_paresis: str\
        muscle_stiness: str\
        alopecia: str\
        obesity: str\
        """

    message = prompt_template.format_messages(prompt=prompt,data=data,gender=gender,age=age)
    response = chat(message)

    print("Prompt:",type(response.content))
    print(response.content)
    return response.content
