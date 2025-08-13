# Configuration de l'envoi d'emails - Formulaire Tekiyo

## 🚀 Installation et Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les informations suivantes :

```bash
# Configuration email pour le formulaire Tekiyo
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=development
```

### 2. Configuration Gmail (Recommandé)

#### Option A: Mot de passe d'application (Sécurisé)
1. Allez sur [myaccount.google.com](https://myaccount.google.com)
2. Sécurité → Connexion à Google → Mots de passe d'application
3. Générez un mot de passe pour "Mail"
4. Utilisez ce mot de passe dans `EMAIL_PASS`

#### Option B: Autoriser l'accès moins sécurisé (Non recommandé)
1. Activez l'authentification à 2 facteurs
2. Autorisez l'accès moins sécurisé dans les paramètres

### 3. Configuration alternative (Autres fournisseurs)

Si vous n'utilisez pas Gmail, modifiez le fichier `lib/email.ts` :

```typescript
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true pour 465, false pour autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

Et ajoutez dans `.env.local` :
```bash
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-email@your-provider.com
SMTP_PASS=your-password
```

## 📧 Test de l'envoi

1. Lancez le serveur de développement : `pnpm dev`
2. Remplissez le formulaire
3. Vérifiez que l'email arrive sur `contact@tekiyo.fr`

## 🔒 Sécurité

- **Ne commitez jamais** votre fichier `.env.local`
- Utilisez des mots de passe d'application pour Gmail
- En production, utilisez des variables d'environnement sécurisées

## 🚨 Dépannage

### Erreur "Invalid login"
- Vérifiez vos identifiants
- Assurez-vous d'utiliser un mot de passe d'application pour Gmail

### Erreur "Connection timeout"
- Vérifiez votre connexion internet
- Vérifiez les paramètres SMTP

### Email non reçu
- Vérifiez les spams
- Vérifiez que `contact@tekiyo.fr` est correctement configuré

## 📱 Production

En production, utilisez des services comme :
- **SendGrid** (gratuit jusqu'à 100 emails/jour)
- **Mailgun** (gratuit jusqu'à 5000 emails/mois)
- **AWS SES** (très économique)

Ces services sont plus fiables que Gmail pour la production.
