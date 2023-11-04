import pandas as pd
from sklearn.decomposition import PCA
from pydantic import BaseModel
import numpy as np
from joblib import load


class Features(BaseModel):
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


def predict(features: Features):

    data = pd.DataFrame(features)

    X = np.array(data)
    # X_train = np.load('X_train.npy')
    # pca_model = PCA(n_components=15)
    # pca_model.fit(X_train)
    # X_pca = pca_model.transform(X)
    model = load('XGBoost_pred.joblib')
    y_pred = model.predict(X)

    return y_pred[0]
