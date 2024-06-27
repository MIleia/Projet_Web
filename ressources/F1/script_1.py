import pandas as pd
import numpy as np
import pickle
import sys
import json

arbre = pd.read_csv(sys.argv[1])
centroides = pd.read_csv(sys.argv[2])
#arbre = pd.read_csv('arbre')
#centroides = pd.read_csv('centroides_Kmeans_3c.csv')

#=================================================Nettoyage=des=données================================================#

for col in arbre.columns:
    if((arbre[col]).dtypes == 'object'):
        with open("../ressources/F1/F1_Enc_"+col+".pkl", 'rb') as f:
            Enc = pickle.load(f)
        arbre[col] = Enc.fit_transform(arbre[[col]])

#=================================================Sélection=du==cluster================================================#
resp = []
for i,row in arbre.iterrows():
    Y = []
    for i,row in centroides.iterrows():
        value = [row.iloc[1],row.iloc[2],row.iloc[3],row.iloc[4]]
        Y.append(np.sqrt(np.sum((arbre.values[0] - value) ** 2)))
    min = [Y[0],0]
    for i in range(len(Y)):
        if(min[0]>Y[i]):
            min[0] = Y[i]
            min[1] = i
    resp.append({'taille_arbre': min[1]})

print(resp)
#print(f"Taille prédie de l'arbre (petit=0): {min[1]}")

# Export sous format json
with open('../ressources/F1/Result.json', 'w') as f:
    json.dump(resp, f)
