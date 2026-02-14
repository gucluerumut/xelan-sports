# Environment Variables

This project uses environment variables for configuration. Create a `.env.local` file in the root directory with the following variables:

## Required Variables

### Firebase Configuration
```env
# Firebase Service Account (for server-side operations)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}

# Firebase Client Configuration (for client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## Optional Variables

### Analytics (Future)
```env
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### AI Features (Future)
```env
OPENAI_API_KEY=sk-...
```

### Email Notifications (Future)
```env
SENDGRID_API_KEY=SG...
```

## Development vs Production

- `.env.local` - Local development (not committed to git)
- `.env.production` - Production environment (set in Firebase/Vercel)

## Security Notes

⚠️ **Never commit `.env.local` to git**  
⚠️ **Use environment variables for all secrets**  
⚠️ **Prefix client-side variables with `NEXT_PUBLIC_`**
