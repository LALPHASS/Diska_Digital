# Diska Digital, refonte du 14 octobre 2026

Le propriétaire de l’agence a confié la direction artistique et la refonte complète du site local. Le projet conserve Next.js, React, TypeScript et les coordonnées fournies dans le dépôt. Aucun déploiement externe ne fait partie de cette refonte.

## Direction

Ivoire, encre et bleu électrique, avec des accents abricot et lavande. Typographie Space Grotesk et contraste avec une italique serif. Composition éditoriale, grands titres, rythme entre sections et sculpture originale rendue en Three.js. Le logo existant est conservé.

Le parcours présente la promesse, des explorations visuelles, les quatre expertises, le studio, la méthode et le contact. Les explorations sont explicitement des concepts, sans attribution à des clients. Les témoignages et statistiques de démonstration sont remplacés par le manifeste de l’agence.

Le formulaire prépare un e-mail et propose un lien vers la messagerie après validation. Il ne prétend pas envoyer un message sans service configuré. WhatsApp utilise le numéro existant au format international sans signe plus dans le lien.

## Références consultées sur Dribbble

Les références servent à étudier la hiérarchie et la composition, aucun visuel n’est copié dans le site.

* [Tekano Studio, Minimal Creative Agency Website](https://dribbble.com/shots/27377033-Minimal-Creative-Agency-Website)
* [Naim Siam, Studio 09](https://dribbble.com/shots/27669926-Studio-09-Creative-Agency-Website-Design-Brutalism-website)
* [Bverselabs, Creative Agency Website UI/UX Design](https://dribbble.com/shots/27646064-Creative-Agency-Website-UI-UX-Design)

## Critères de vérification

Navigation et menu au clavier, fermeture par Échap, aucune coupure de texte ou barre de défilement horizontale à 320, 390, 768 et 1440 pixels. Aperçus ouvrant une description réelle, accordéon des expertises, validation du formulaire et génération du lien mailto. Préférence de mouvement réduit respectée, sculpture chargée séparément et suspendue hors écran. Vérification TypeScript, compilation de production et inspection dans le navigateur.

## Vérification effectuée

TypeScript et compilation de production réussis. Les polices sont servies localement avec leur licence OFL pour supprimer le téléchargement Google Fonts pendant la compilation. Le build a été vérifié hors du sandbox Windows, qui bloque la communication entre les processus de Turbopack.

Contrôles dans le navigateur à 320, 390, 768, 1024 et 1440 pixels : aucune largeur de page supérieure au viewport, aucun titre ou paragraphe hors du cadre. Ouverture des concepts et fermeture par Échap, navigation par ancres, accordéons, focus et fermeture du menu mobile, validation des quatre champs et vérification du lien mailto encodé. Aucune donnée de test n’a été envoyée à un service externe.

## Affinage du mouvement, 15 octobre 2026

Le propriétaire souhaite enrichir l’expérience actuelle après une recherche sur Awwwards, en conservant l’identité qu’il apprécie. Références directement consultées : [Neutomni](https://www.awwwards.com/sites/neutomni), Site of the Day du 13 octobre 2026, et [Huy Phan Vol.2](https://www.awwwards.com/sites/huy-phan-vol-2), Site of the Day du 14 octobre 2026. Le studio Neutomni a été observé sur son site, notamment son introduction typographique et son articulation des expertises et projets.

Les adaptations originales portent sur l’entrée du titre par masques, un léger décalage de la sculpture au défilement, le ruban des expertises avec commande de pause, les boutons à réaction douce et les aperçus avec profondeur et libellé suivant la souris. Le manifeste se colore pendant la lecture. La navigation indique la section courante, un trait mesure l’avancement et le menu mobile se dévoile avec des liens décalés dans le temps. Les dialogues et accordéons conservent leur comportement natif.

Le défilement reste natif. Aucun chargement bloquant ni nouvelle dépendance. Les animations de pointeur sont réservées à la souris ; le ruban se suspend hors écran et dans un onglet masqué. La préférence de mouvement réduit désactive les entrées, le parallaxe, les réactions de pointeur et la rotation, et présente les expertises sous forme statique.

Vérification de cet affinage : compilation et TypeScript réussis, pas de débordement à 320, 390, 768, 1024 ou 1440 pixels. Pause et reprise du ruban, suspension hors écran, section active, progression de lecture, coloration progressive du manifeste, ouverture des concepts, Échap et conservation du focus dans le menu mobile contrôlés dans le navigateur.
