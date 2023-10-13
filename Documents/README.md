# tasks
Pour ranger toutes nos idées concernant le site, ainsi que nos objectifs ^^


Organisation:
* ideas : liste des idées pour l'interface et le fonctionnement du site
* tasks : liste des tâches - pour avoir une vraie liste claire dans laquelle on mettra les idées que l'on retiendra. On pourra aussi se répartir les tâches dans ce fichier
* links : vidéos, images, sites internet... tout ce qui pourra nous être utile dans la conception du site !



Commandes pour enlever les erreurs dûes aux modules :

Place-toi dans ton dossier pour le projet sur le terminal (avec cd) et fais bien attention à ce que la commande npm start ne soit pas lancée.

SOIT :
  Tu as déjà le dossier node_modules :
  * rm -r node_modules (on désinstalle pour mieux réinstaller avec tous les updates)
  * npm install -g npm-check-updates
  * ncu -u
  * npm update
  * npm start
  => après cette suite de commandes je n'ai plus eu de problèmes !
  
SOIT :
  Tu n'as pas le dossier node_modules auquel cas il suffit de faire toutes les commandes du dessus sauf la première.
