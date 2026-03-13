# Vue.js Application Deployment Guide
## Windows Server + IIS 10

---

## Overview

This guide documents the complete process for building and deploying this Vue.js application (with Vite) to a Windows Server running IIS 10. The deployment is a **static file package** with no runtime dependencies required on the server.

---

## Prerequisites

### Local Machine (Development)
- Node.js 16+ installed
- npm installed
- Git (optional, for version control)

### Remote Server (Windows Server with IIS 10)
- IIS 10 installed and running
- URL Rewrite Module installed (required for SPA routing)
- Basic administrative access to IIS

---

## Step 1: Build the Application Locally

### 1.1 Prepare the build
On your local development machine:

```bash
# Navigate to project directory
cd C:\Ivan\Empresas\MEI\Site\www

# Install dependencies
npm install

# Run development server to test (optional)
npm run dev

# When ready to build, run the build command
npm run build
```

### 1.2 Build output
After running `npm run build`, a `dist/` folder is created containing:
- `index.html` - Main entry point
- `assets/` - Bundled JavaScript, CSS, and images
- All static files needed to run the application

**No additional files are needed!** Everything is self-contained.

---

## Step 2: Prepare the Deployment Package

### 2.1 Create deployment archive

After building, you have two options:

**Option A: Using PowerShell (Automated)**
```powershell
# On your local machine, in the project root
$distFolder = "C:\Ivan\Empresas\MEI\Site\www\dist"
$outputZip = "C:\Ivan\Empresas\MEI\Site\www\watchsr-deployment.zip"

# Create zip archive
Compress-Archive -Path $distFolder\* -DestinationPath $outputZip -Force

Write-Host "Deployment package created: $outputZip"
```

**Option B: Manual**
1. Open Windows Explorer
2. Navigate to `C:\Ivan\Empresas\MEI\Site\www\dist\`
3. Select all files and folders
4. Right-click → Send to → Compressed (zipped) folder
5. Name it `watchsr-deployment.zip`

### 2.2 Package contents
Your zip file should contain:
```
watchsr-deployment.zip
├── index.html
├── assets/
│   ├── bundle-xxxxx.js
│   ├── style-xxxxx.css
│   └── [other assets]
└── [any other static files]
```

---

## Step 3: Deploy to Windows Server

### 3.1 Transfer files to server

**Method A: RDP + File Copy**
1. Connect to Windows Server via Remote Desktop
2. Create deployment folder: `C:\inetpub\wwwroot\watchsr\`
3. Copy `watchsr-deployment.zip` to the server
4. Extract zip contents into the deployment folder

**Method B: Network Share**
1. Create a network share on the server
2. Copy zip file to share
3. Extract on server

**Method C: FTP/SFTP** (if available)
1. Connect to server via FTP client
2. Upload zip file
3. Extract on server

### 3.2 Folder structure on server
After extraction, your IIS folder should look like:
```
C:\inetpub\wwwroot\watchsr\
├── index.html
├── assets/
│   ├── ...
├── web.config  ← Copy this file from your project
└── [other files]
```

---

## Step 4: Configure IIS 10

### 4.1 Check prerequisites

**URL Rewrite Module** is required for Vue Router SPA routing.

To check if installed:
1. Open IIS Manager
2. Look for **URL Rewrite** in the main features list
3. If not present:
   - Download: [IIS URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite)
   - Install on the server
   - Restart IIS

### 4.2 Create Application in IIS

1. Open **IIS Manager** on Windows Server
2. Right-click on **Sites** → **Add Website**
3. Configure:
   - **Site name:** `WatchSR` (or your preferred name)
   - **Physical path:** `C:\inetpub\wwwroot\watchsr\`
   - **Binding type:** `http`
   - **IP address:** All Unassigned
   - **Port:** `80` (or your configured port)
   - **Host name:** Your domain (e.g., `watchsr.yourdomain.com`)
   - Click **OK**

### 4.3 Deploy web.config

1. Copy `web.config` from your local project to the IIS application folder
2. Path: `C:\inetpub\wwwroot\watchsr\web.config`

**web.config contents:**
This file handles:
- URL rewriting for Vue Router (SPA routing)
- Static file caching
- Compression for assets
- MIME types for all asset types

### 4.4 Configure application pool

1. In IIS Manager, expand **Application Pools**
2. Right-click the pool for your application → **Basic Settings**
3. Ensure:
   - **.NET CLR version:** No Managed Code (since we're serving static files)
   - **Managed pipeline mode:** Integrated or Classic

### 4.5 Test the deployment

1. Open a browser
2. Navigate to: `http://localhost` (or your configured domain)
3. You should see the home page ✅

**Test authentication:**
1. Click "Saiba Mais" on the home page
2. You should be redirected to `/auth` (anonymous user)
3. Log in with valid credentials
4. After login, you should be redirected to `/watchsr`

---

## Step 5: Update API Configuration

The API endpoint is configured in `src/service/api.js`:

```javascript
const API_BASE_URL = 'https://localhost:7132';
```

**Update this if your API is on a different server:**

### Updating the API endpoint after deployment

1. **If you need to change the API URL:**
   - Edit `src/service/api.js` on your local machine
   - Change `API_BASE_URL` to your production API server
   - Rebuild: `npm run build`
   - Redeploy the `dist/` folder

2. **Or use environment variables (recommended for future):**
   - Modify `vite.config.js` to support `.env` files
   - Create `.env.production` with your production API URL
   - Access via `import.meta.env.VITE_API_BASE_URL`

---

## Complete Deployment Checklist

- [ ] Run `npm install` on local machine
- [ ] Run `npm run build`
- [ ] Create `watchsr-deployment.zip` from `dist/` folder
- [ ] Transfer zip to Windows Server
- [ ] Extract to `C:\inetpub\wwwroot\watchsr\`
- [ ] Copy `web.config` to application folder
- [ ] Install URL Rewrite Module (if needed)
- [ ] Create website in IIS Manager
- [ ] Test application in browser
- [ ] Test authentication flow
- [ ] Document any API URL changes

---

## Future Deployments

Simplified process for subsequent deployments:

```bash
# 1. Local machine
npm install
npm run build

# 2. Create deployment package
Compress-Archive -Path ".\dist\*" -DestinationPath "watchsr-deployment.zip" -Force

# 3. On server: Extract and remove old dist folder
Remove-Item "C:\inetpub\wwwroot\watchsr\assets" -Recurse -Force
Remove-Item "C:\inetpub\wwwroot\watchsr\index.html" -Force

# 4. Extract new files from zip
Expand-Archive "watchsr-deployment.zip" -DestinationPath "C:\inetpub\wwwroot\watchsr\" -Force

# 5. Optional: Restart application pool (in IIS Manager or PowerShell)
Restart-WebAppPool -Name "WatchSR"
```

---

## Troubleshooting

### Issue: Page shows 404 when refreshing
**Solution:** Ensure `web.config` is in the application folder and URL Rewrite is installed.

### Issue: Cannot access API from deployed site
**Solution:** Check API URL in `src/service/api.js` - ensure it's accessible from the server.

### Issue: Authentication token not persisting
**Solution:** Check browser console (F12) for errors. Ensure localStorage is not disabled.

### Issue: Assets not loading (CSS/JS is broken)
**Solution:** Ensure all files from `dist/assets/` are copied to the server.

---

## Important Notes

1. **Static Site Only:** This application requires NO runtime environment on the server. It's purely HTML/CSS/JS.

2. **API Dependency:** The application communicates with your .NET API at `https://localhost:7132` - ensure this is accessible from the server.

3. **HTTPS (Recommended for Production):**
   - Request an SSL certificate for your domain
   - Bind HTTPS in IIS
   - Update API calls to use HTTPS

4. **Browser Caching:** The `web.config` sets 365-day cache for assets. When deploying updates, files will receive new hash names from Vite build, forcing browser updates.

---

## Support Resources

- [IIS Documentation](https://docs.microsoft.com/en-us/iis/)
- [URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite)
- [Vue Router Configuration](https://router.vuejs.org/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Last Updated:** March 2026
**Application:** WatchSR Vue.js Frontend
**Server:** Windows Server with IIS 10
