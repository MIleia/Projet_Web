import pandas as pd
import joblib
import sys
import json

arbre = pd.read_csv(sys.argv[1])
model = joblib.load(sys.argv[2])
#arbre = pd.read_csv('arbre2.csv')
#model = joblib.load('F3_RandomForestClassifier.pkl')

#=================================================Nettoyage=des=données================================================#

scaler = joblib.load('../ressources/F2/F2_Scaler.pkl')
columns_of_interest = ['longitude', 'latitude','haut_tot', 'haut_tronc', 'tronc_diam', 'fk_prec_estim']
scaled_numerical_data = scaler.transform(arbre[columns_of_interest])
scaled_numerical_df = pd.DataFrame(scaled_numerical_data, columns=columns_of_interest)

#=================================================Sélection=du==cluster================================================#

y_pred = model.predict(scaled_numerical_df)

print(f"Age prédit de l'arbre : {y_pred[0]}")

# Export sous format json
with open('../ressources/F2/Result.json', 'w') as f:
    json.dump({'age_arbre': y_pred[0]}, f)
