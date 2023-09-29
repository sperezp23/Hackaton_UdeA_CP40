import pandas as pd
from sklearn.decomposition import PCA
from pydantic import BaseModel
import numpy as np
from joblib import load

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

def predict(features:Features):
    
    data = pd.DataFrame(features, index=[0])
    data.replace({'Male':0,
                     'Female':1,
                      'Yes':1,
                     'No':0,
                     'Negative':0,
                     'Positive':1
                     }, inplace=True)
    
    X = np.array(data)
    X_train = np.load('X_train.npy')
    pca_model = PCA(n_components=15)
    pca_model.fit(X_train)
    X_pca = pca_model.transform(X)
    model = load('Adaboost_pred.joblib')
    y_pred = model.predict(X_pca)
    
    return y_pred[0]
    