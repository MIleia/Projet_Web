Drop TABLE IF EXISTS Users;
Drop TABLE IF EXISTS Arbre;


-- Création Table User

CREATE TABLE Users(
        mail   Varchar (50) NOT NULL,
        nom    Varchar (50) NOT NULL,
        prenom Varchar (50) NOT NULL,
        mdp    Varchar (50) NOT NULL
	,CONSTRAINT User_PK PRIMARY KEY (mail)
);


-- Création Table Arbre

CREATE TABLE Arbre(
        id            serial,
        longitude     Float NOT NULL,
        latitude      Float NOT NULL,
        haut_tot      Int NOT NULL,
        haut_tronc    Int NOT NULL,
        fk_prec_estim Int NOT NULL,
        fk_port       Varchar (50) NOT NULL,
        fk_pied       Varchar (50) NOT NULL,
        fk_situation  Varchar (50) NOT NULL,
        fk_revetement Varchar (50) NOT NULL,
        age_estim     Int,
        fk_stadedev   Varchar (50) NOT NULL,
        fk_nomtech    Varchar (50) NOT NULL,
        mail          Varchar (50) NOT NULL
	,CONSTRAINT Arbre_PK PRIMARY KEY (id)

	,CONSTRAINT Arbre_User_FK FOREIGN KEY (mail) REFERENCES Users(mail)
);


