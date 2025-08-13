# 🚀 Configuration Vercel pour le Formulaire Tekiyo

## 📧 Variables d'environnement requises

Pour que l'envoi d'emails fonctionne en production, vous devez configurer ces variables sur Vercel :

### 1. Via l'interface Vercel (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous et sélectionnez votre projet `form`
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez ces variables :

```
EMAIL_USER = tekiyocorp@gmail.com
EMAIL_PASS = askz jbgf embk qutg
```

### 2. Via la CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Ajouter les variables d'environnement
vercel env add EMAIL_USER
vercel env add EMAIL_PASS

# Redéployer
vercel --prod
```

### 3. Via le fichier .env.local (Développement local)

```bash
# Créer le fichier .env.local
echo "EMAIL_USER=tekiyocorp@gmail.com" > .env.local
echo "EMAIL_PASS=askz jbgf embk qutg" >> .env.local
```

## 🔧 Vérification

Après configuration, testez l'API :

```bash
curl -X POST https://form-ochre-mu.vercel.app/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{"formData":{"contact_info":{"fullName":"Test"}}}'
```

## 🚨 Dépannage

### Erreur 500 - Configuration manquante
- Vérifiez que `EMAIL_USER` et `EMAIL_PASS` sont configurés sur Vercel
- Redéployez après avoir ajouté les variables

### Erreur d'authentification Gmail
- Vérifiez que le mot de passe d'application est correct
- Assurez-vous que l'authentification à 2 facteurs est activée sur Gmail

## 📱 Support

Pour toute question, consultez la documentation Vercel ou contactez l'équipe Tekiyo.
