import pandas as pd
import pickle
import sys
import json

arbre = pd.read_csv(sys.argv[1])
with open(sys.argv[2],'rb') as f:
    model = pickle.load(f)
print("esd")