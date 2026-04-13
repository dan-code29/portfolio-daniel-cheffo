# 📤 Instructions pour GitHub

Votre portfolio est maintenant un repository Git local ! Voici comment le pousser sur GitHub :

## Étape 1️⃣ : Créer un nouveau repository sur GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur `+` (coin haut droit) → `New repository`
3. Remplissez les informations :
   - **Repository name** : `portfolio-daniel-cheffo` (ou un autre nom)
   - **Description** : `Professional portfolio showcasing expertise in networking, electrical systems, security, and automation`
   - **Visibility** : Public (pour que les recruteurs puissent voir)
   - **NE COCHEZ PAS** "Initialize this repository with a README" (on l'a déjà)
4. Cliquez `Create repository`

## Étape 2️⃣ : Connecter le repository local à GitHub

Après la création, GitHub vous affiche les commandes. Exécutez dans le terminal :

```bash
cd "c:\Users\daniel cheffo\Documents\developpement web\portfolio with deepseek"

# Renommer la branche en 'main' (optionnel, pour convention moderne)
git branch -M main

# Ajouter l'URL du repository distant
git remote add origin https://github.com/VOTRE_USERNAME/portfolio-daniel-cheffo.git

# Pousser le code
git push -u origin main
```

⚠️ **Remplacez `VOTRE_USERNAME`** par votre username GitHub

## Étape 3️⃣ : Configuration SSH (recommandé)

Pour éviter de rentrer votre mot de passe à chaque fois :

### Sur Windows :
```bash
# 1. Générer clé SSH
ssh-keygen -t ed25519 -C "dancheffo29@gmail.com"

# 2. Accepter les valeurs par défaut (appuyez Enter 3 fois)

# 3. Copier la clé publique
type %userprofile%\.ssh\id_ed25519.pub
```

### Ajouter la clé à GitHub :
1. Allez sur GitHub → Settings (coin haut droit)
2. SSH and GPG keys (gauche)
3. New SSH key
4. Coller la clé et Save

### Ensuite, utiliser SSH au lieu de HTTPS :
```bash
git remote set-url origin git@github.com:VOTRE_USERNAME/portfolio-daniel-cheffo.git
```

## Étape 4️⃣ : Vérifier la connexion

```bash
git remote -v
```

Vous devriez voir :
```
origin  git@github.com:VOTRE_USERNAME/portfolio-daniel-cheffo.git (fetch)
origin  git@github.com:VOTRE_USERNAME/portfolio-daniel-cheffo.git (push)
```

## 📝 Commandes Git utiles pour l'avenir

```bash
# Voir l'état des fichiers
git status

# Ajouter des fichiers modifiés
git add .

# Faire un commit
git commit -m "Votre message"

# Pousser vers GitHub
git push

# Voir l'historique
git log --oneline

# Créer une branche
git checkout -b feature/nouveau-feature
```

## 🎯 Structure pour les commits futurs

Exemples de bons messages de commit :
```
git commit -m "feat: Add electric fence section to electrical expertise"
git commit -m "fix: Correct carousel pagination in hobby details"
git commit -m "docs: Update README with new features"
git commit -m "style: Improve mobile responsiveness"
git commit -m "perf: Optimize canvas rendering for mobile"
```

## 🔗 Liens utiles

- [GitHub Docs - Adding locally hosted code](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)
- [GitHub SSH Key Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Git Cheatsheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)

## ✅ Après avoir poussé le code

Une fois sur GitHub, vous pouvez :
- Partager le lien du repository dans votre CV
- Activer GitHub Pages pour le déployer en ligne (Settings → Pages)
- Laisser des contributions en open-source
- Collaborer avec d'autres développeurs

---

**Besoin d'aide ?** 💬
- GitHub Support : https://support.github.com
- Stack Overflow : https://stackoverflow.com/questions/tagged/git
