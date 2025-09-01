# Deployment Guide

## Local Development Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up MySQL database**

   ```bash
   # Create database and tables
   mysql -u root -p < database-setup.sql
   ```

3. **Configure environment variables**

   ```bash
   cp env.example .env.local
   # Edit .env.local with your database credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Vercel Deployment

### Step 1: Prepare Your Repository

1. Push your code to GitHub
2. Ensure all files are committed
3. Make sure `.env.local` is in `.gitignore`

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Environment Variables

In Vercel dashboard, add these environment variables:

```
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=school_management
```

### Step 4: Database Setup

1. Set up a production MySQL database (PlanetScale, AWS RDS, etc.)
2. Run the database setup script:
   ```sql
   -- Copy and run the contents of database-setup.sql
   ```

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your app will be live at `https://your-project.vercel.app`

## Alternative Deployment Options

### Netlify

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

### Railway

1. Connect GitHub repository
2. Add MySQL service
3. Set environment variables
4. Deploy automatically

## Production Considerations

### Database

- Use a production MySQL database
- Enable SSL connections
- Set up proper backups
- Configure connection pooling

### Environment Variables

- Never commit `.env.local` to Git
- Use Vercel's environment variable system
- Rotate secrets regularly

### Performance

- Enable Next.js optimizations
- Use CDN for images
- Implement caching strategies
- Monitor performance metrics

### Security

- Validate all inputs
- Use HTTPS in production
- Implement rate limiting
- Regular security updates

## Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Check environment variables
   - Verify database credentials
   - Ensure database is accessible

2. **Build Failures**

   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs

3. **Image Upload Issues**
   - Check file permissions
   - Verify upload directory exists
   - Review file size limits

### Support

- Check Vercel documentation
- Review Next.js deployment guide
- Contact support if needed
