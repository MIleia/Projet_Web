import pandas as pd
import psycopg2
import hashlib

# Connexion à la BDD
conn = psycopg2.connect(
    host="localhost",
    database="projet_web",
    user="postgres",
    password="postgres",
    options='-c client_encoding=UTF8'
)
cursor = conn.cursor()

# Insertion de l'admin
mdp = "admin"

mdp_hash = hashlib.sha256(mdp.encode()).hexdigest()
cursor.execute("""INSERT INTO Users (mail, nom, prenom, mdp) VALUES ('admin@admin', 'admin', 'admin', %s);""", (mdp_hash,))

# Insertion des arbres
arbres = pd.read_csv('ressources/Data_Arbre.csv', encoding='utf-8')

for index, row in arbres.iterrows():
    cursor.execute("""INSERT INTO Arbre (longitude, latitude, haut_tot, haut_tronc, tronc_diam, fk_arb_etat, fk_stadedev, fk_situation, fk_port, fk_pied, fk_revetement, remarquable, age_estim, fk_prec_estim, fk_nomtech, mail)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'admin@admin');""", 
        (row['longitude'], row['latitude'], row['haut_tot'], row['haut_tronc'], row['tronc_diam'], row['fk_arb_etat'], row['fk_stadedev'], row['fk_situation'], row['fk_port'], row['fk_pied'], row['fk_revetement'], row['remarquable'], row['age_estim'], row['fk_prec_estim'], row['fk_nomtech']))

conn.commit()
cursor.close()
conn.close()


