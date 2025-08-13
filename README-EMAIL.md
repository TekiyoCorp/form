# 📧 Configuration Email - Formulaire Tekiyo

## 🎯 Vue d'ensemble

Votre formulaire de brief est maintenant configuré pour envoyer automatiquement toutes les informations vers **contact@tekiyo.fr** par email. **Aucune base de données n'est nécessaire** - tout est géré par email.

## 🚀 Installation Rapide

### 1. Créer le fichier de configuration
```bash
cp env.example .env.local
```

### 2. Configurer vos identifiants email
Éditez `.env.local` et remplacez :
```bash
EMAIL_USER=tekiyocorp@gmail.com
EMAIL_PASS=askz jbgf embk qutg
```

### 3. Lancer l'application
```bash
pnpm dev
```

## 🔧 Configuration Détaillée

### Option A: Gmail (Recommandé pour les tests)

1. **Activer l'authentification à 2 facteurs** sur votre compte Google
2. **Générer un mot de passe d'application** :
   - Allez sur [myaccount.google.com](https://myaccount.google.com)
   - Sécurité → Connexion à Google → Mots de passe d'application
   - Sélectionnez "Mail" et générez un mot de passe
3. **Utilisez ce mot de passe** dans `EMAIL_PASS`

### Option B: Autres fournisseurs

Modifiez `.env.local` selon votre fournisseur :

```bash
# Outlook
EMAIL_SERVICE=outlook
EMAIL_USER=votre-email@outlook.com
EMAIL_PASS=votre-mot-de-passe

# Yahoo
EMAIL_SERVICE=yahoo
EMAIL_USER=votre-email@yahoo.com
EMAIL_PASS=votre-mot-de-passe

# Fournisseur personnalisé
EMAIL_SERVICE=custom
SMTP_HOST=smtp.votre-fournisseur.com
SMTP_PORT=587
SMTP_USER=votre-email@votre-fournisseur.com
SMTP_PASS=votre-mot-de-passe
```

## 🧪 Test de la Configuration

### Test automatique
1. Lancez l'application : `pnpm dev`
2. Utilisez le bouton "🧪 Test Email" en bas à droite
3. Vérifiez que l'email arrive sur contact@tekiyo.fr

### Test en ligne de commande
```bash
node scripts/test-email.js
```

## 📋 Fonctionnalités

### ✅ Ce qui est inclus
- **Envoi automatique** vers contact@tekiyo.fr
- **Formatage HTML** professionnel des emails
- **Validation** des données avant envoi
- **Gestion d'erreurs** complète
- **Page de confirmation** après soumission
- **Composant de test** intégré

### 📧 Format des emails
- **Sujet** : 🎯 Nouveau Brief Projet - Formulaire Tekiyo
- **Contenu** : Toutes les réponses du formulaire formatées
- **Informations de contact** : Nom, email, entreprise, téléphone
- **Horodatage** : Date et heure de soumission

## 🔒 Sécurité

- **Variables d'environnement** pour les identifiants
- **Validation** des données côté serveur
- **Gestion d'erreurs** sans exposition d'informations sensibles
- **HTTPS** recommandé en production

## 🚨 Dépannage

### Erreur "Invalid login"
```bash
# Vérifiez vos identifiants
# Pour Gmail, utilisez un mot de passe d'application
# Activez l'authentification à 2 facteurs
```

### Erreur "Connection timeout"
```bash
# Vérifiez votre connexion internet
# Vérifiez les paramètres SMTP
# Testez avec le script de test
```

### Email non reçu
```bash
# Vérifiez les spams
# Vérifiez que contact@tekiyo.fr est correct
# Testez avec le composant de test intégré
```

## 📱 Production

### Services recommandés
- **SendGrid** : Gratuit jusqu'à 100 emails/jour
- **Mailgun** : Gratuit jusqu'à 5000 emails/mois  
- **AWS SES** : Très économique
- **Resend** : Moderne et fiable

### Configuration production
```bash
# Exemple avec SendGrid
EMAIL_SERVICE=custom
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=votre-api-key-sendgrid
```

## 📁 Structure des fichiers

```
lib/
├── email.ts          # Logique d'envoi d'emails
├── email-config.ts   # Configuration des transporteurs
└── types.ts          # Types TypeScript

app/api/
└── submit-form/
    └── route.ts      # API route pour la soumission

components/
├── ConfirmationPage.tsx  # Page de confirmation
└── TestEmail.tsx         # Composant de test

scripts/
└── test-email.js         # Script de test en ligne de commande
```

## 🎉 Utilisation

1. **Remplissez le formulaire** sur votre site
2. **Vérifiez le récapitulatif** avant envoi
3. **Cliquez sur "Envoyer"** 
4. **Recevez l'email** sur contact@tekiyo.fr
5. **Contactez le client** pour la suite

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la configuration avec `node scripts/test-email.js`
2. Consultez les logs de la console
3. Testez avec le composant de test intégré
4. Vérifiez vos variables d'environnement

---

**🎯 Votre formulaire est maintenant prêt à envoyer tous les briefs directement par email !**
