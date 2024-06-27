# Projet WEB
## Description
Ce site permet d'ajouter et de visualiser des arbres grâce à des requêtes ajax (GET & POST) qui communiquent avec une base de donnée postgresql. Il y a aussi des prédictions autour des arbres sont faites avec des scripts pythons.

## Création du site
### Installation des modules nécéssaires :
```bash
sudo apt update
sudo apt upgrade

sudo apt-get install postgresql
sudo apt-get install apache2
sudo apt-get install php
sudo apt-get install php-pgsql
sudo apt-get install php libapache2-mod-php

sudo apt-get install python3
sudo apt-get install pip
pip install pandas
pip install scikit-learn
pip install -U scikit-learn==0.21.3
pip install psycopg2-binary
pip install bcrypt
pip install sys
```

### Initialisation du site :
Copier le projet ( `Projet_Web` ) dans le dossier `/var/www/html`.

Modifier la redirection du serveur :
```bash
sudo nano /etc/apache2/sites-available/000-default.conf
```
```apache
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/Projet_Web
        DirectoryIndex connection.html
```
Modifier les droits des fichiers :
```bash
sudo chmod -R 777 /var/www/html/Projet_Web/
```
Créer la base de donnée et les tables :
```bash
sudo service postgresql start
sudo -u postgres psql
sudo serv
```
```postgresql
CREATE DATABASE projet_web;
\connect projet_web
\i /var/www/html/Projet_Web/sql/projet.sql
```
Modifier le mot de passe de postgres dans le fichier `/var/www/html/Projet_Web/lib/config.php`.

Lancer le serveur :
```bash
sudo systemctl start apache2
```

## Utilisation du site
Après connection au serveur, vous êtes automatiquement rediriger vers une page de connection.
Vous avez la possibilité de se connecté avec une adresse mail existante ou de créer un compte sinon. Après connection ou inscription vous êtes redirigé vers une page d'accueil, d'où il est possible d'accèder à une page d'insertion des arbres ou de visualisation.
Sur la page d'ajout des arbres, vous pourrez remplir un formulaire pour ajouter un arbre où même ajouter l'entièreté des arbres du fichier Data_Arbre.csv. Et sur la page de visualisation des arbres, vous pourrez visualiser tous les arbres (avec des critères sélectionnables) sur un tableau et sur une carte. À partir de ce dernier, vous pourrez prédire les clusters des arbres sélectionnés, ou même prédire l'âge ou le déracinement d'un arbre spécifique.