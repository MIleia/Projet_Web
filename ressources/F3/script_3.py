import pandas as pd
import pickle
import sys
import json
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import OrdinalEncoder

arbre = pd.read_csv(sys.argv[1])
with open(sys.argv[2],'rb') as f:
    model = pickle.load(f)
#arbre = pd.read_csv('arbre3.csv')
#model = joblib.load('F3_RandomForestClassifier.pkl')

#=================================================Nettoyage=des=données================================================#

for col in arbre.columns:
    if((arbre[col]).dtypes == 'object'):
        with open("../ressources/F3/F3_Enc_"+col+".pkl",'rb') as f:
            Enc = pickle.load(f)
        arbre[col] = Enc.transform(arbre[[col]])

with open('../ressources/F3/F3_Scaler.pkl','rb') as f:
    scaler = pickle.load(f)
columns_of_interest = ['longitude', 'latitude','fk_port', 'fk_pied', 'fk_revetement', 'fk_situation', 'age_estim']
scaled_numerical_data = scaler.transform(arbre[columns_of_interest])
scaled_numerical_df = pd.DataFrame(scaled_numerical_data, columns=columns_of_interest)

#=================================================Sélection=du==cluster================================================#

y_pred = model.predict(scaled_numerical_df)

print(f"Etat de l'arbre (essouché=1) : {y_pred[0]}")

# Export sous format json
with open('../ressources/F3/Result.json', 'w') as f:
    json.dump({'essouche': int(y_pred[0])}, f)