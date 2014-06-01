# Live-Bus

***

## But

L’objectif du projet LACL1A est d’améliorer l’expérience de transport des personnes. Pour ce faire, on conçoit un dispositif embarqué qui doit équiper les véhicules pour les intégrer à l’internet des objets. Une fois installé et connecté, le dispositif permet aux usagers de profiter des services exposés localement par connexion sans file directe ou bien accéder à un sous ensemble de ces services par internet. Les services évoluent avec le temps selon la stratégie du gérant du parc de transport et du matériel installé sur le véhicule.

Les services identifiés qui sont prévues pour la première release sont :

·         connexion à internet pour une durée déterminée en fonction du titre de transport

·         géolocalisation temps réel des véhicules sur une carte

·         notification une fois que le prochain véhicule est à proximité

·         demandes de contrôle (arrêt, ouverture des portes, …)

Le dispositif contient un périphérique d’affichage qui en deux modèles : Un premier sous forme d’écran en papier électronique adapté pour être installé à proximité de l’usager. Le deuxième est sous forme d’un deux écrans vidéographiques installés au centre du plafond. Le fonctionnement des écrans est cadré par les fonctionnalités suivantes qui sont prévus pour la release 2 :

·         choix du contenu à diffuser sur un périphérique d’affichage parmi une liste préétablie

·         Framework d’interaction avec les contenues

·         synchronisation distante du contenu

·         gestion des campagnes d’affichage

·         intégration avec les systèmes des régies publicitaire et éditeurs de contenu.

Les services sont offerts gratuitement aux usagers, ils sont financés par les annonceurs intéressés pour diffuser leurs contenus dans l’espace affichage du dispositif. En plus des contenus vidéo, les contenus  publicitaires interactifs (concours, jeux, questionnaires) peuvent être diffusé sur le dispositif. Le Framework d’interaction permet de produire des contenus interactifs extensible au smartphone de l’usager, afin d’améliorer l’expérience de navigation dans les contenus.

## Stack

* Persistence store: [MongoDB](http://www.mongodb.org/) hébergé sur [MongoLab](https://mongolab.com/)
* Backend: [Node.js](http://nodejs.org/)
* Presentation [AngularJS](http://www.angularjs.org/) on the client
* CSS basées sur [Bootstrap de Twitter](http://getbootstrap.com/)

### Build

Il s'agit d'un projet complet avec un système de construction axée sur AngularJS applications et étroitement intégré avec les autres outils couramment utilisés dans la communauté AngularJS :
* Alimenté par [ Grunt.js ] ( http://gruntjs.com/ )
* Test écrit en utilisant la syntaxe [ Jasmine ] ( http://jasmine.github.io/ )
* Essai sont exécutées par [ Karma Test Runner ] ( http://karma-runner.github.io/0.8/index.html ) ( intégrée à la construction Grunt.js )
* [ Bootstrap de Twitter ] ( http://getbootstrap.com/ ) avec le traitement des modèles moins intégrés dans la construction
* [ Travis -CI ] ( https://travis-ci.org/ ) intégration

## Installation

### Plate-forme et des outils

Vous devez installer Node.js et puis les outils de développement. Node.js est livré avec un gestionnaire de paquets appelé [ npm ] ( http://npmjs.org ) pour l'installation d'applications et librairies nodejs.
* [Installer node.js ] ( http://nodejs.org/download/ ) ( nécessite la version node.js > = 0.8.4 )
* Installez - Grunt CLI et Karma en tant que modules globeaux.

### Build client et serveur
    ```
    cd server
    npm install
    cd ..
    cd client
    npm install
    grunt build
    cd ..
    ```
## Course à pied
### Démarrer le serveur
* Exécutez le serveur

    `` `
    cd server
    node server.js
    cd ..
    `` `
* Accédez à l'application à [ http://localhost:3000 ]
* Se connecter avec l'utilisateur admin définie dans `server/lib/initDB.js` .
