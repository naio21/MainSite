# IIS Server Setup Guide
## Windows Server with IIS 10 - WatchSR Application

This guide is for Windows Server administrators who need to deploy and configure the WatchSR Vue.js application on IIS 10.

---

## Prerequisites

### Required Components
- Windows Server 2016 or later
- IIS 10 (included with Windows Server 2016+)
- URL Rewrite Module for IIS 10
- Internet browser for testing

### Optional but Recommended
- SSL Certificate (for HTTPS)
- Administrative access to IIS Manager

---

## Installation Steps

### Step 1: Install URL Rewrite Module

The URL Rewrite Module is **required** for Vue Router single-page application (SPA) routing to work.

**Installation:**

1. Download from Microsoft: [URL Rewrite for IIS](https://www.iis.net/downloads/microsoft/url-rewrite)
2. Run the installer
3. Follow the installation wizard
4. Restart IIS after installation:
   ```powershell
   iisreset
   ```

**Verify Installation:**
1. Open IIS Manager
2. Click on the server name in the tree view
3. Look for "URL Rewrite" in the main features list
4. If present, installation was successful ✅

---

### Step 2: Create Folder Structure

Create the application folder on the server:

```powershell
# Create main application folder
New-Item -ItemType Directory -Path "C:\inetpub\wwwroot\watchsr" -Force

# Set appropriate permissions (IUSR account needs read access)
$Path = "C:\inetpub\wwwroot\watchsr"
$Acl = Get-Acl $Path
$AccessRule = New-Object System.Security.AccessControl.FileSystemAccessRule(
    "IIS AppPool\DefaultAppPool", 
    "ReadAndExecute", 
    "ContainerInherit,ObjectInherit",
    "None", 
    "Allow"
)
$Acl.AddAccessRule($AccessRule)
Set-Acl -Path $Path -AclObject $Acl
```

---

### Step 3: Deploy Application Files

1. **Transfer the zip file** (`watchsr-deployment.zip`) to the server
2. **Extract to the application folder:**
   ```powershell
   $ZipPath = "C:\path\to\watchsr-deployment.zip"
   $ExtractPath = "C:\inetpub\wwwroot\watchsr"
   
   Expand-Archive -Path $ZipPath -DestinationPath $ExtractPath -Force
   ```

3. **Verify web.config is present:**
   ```powershell
   Test-Path "C:\inetpub\wwwroot\watchsr\web.config"
   ```

---

### Step 4: Create IIS Website

#### Using IIS Manager (GUI)

1. Open **IIS Manager**
2. In the left panel, expand your server name
3. Right-click on **Sites** → **Add Website**
4. Fill in the following information:

   | Field | Value |
   |-------|-------|
   | Site name | `WatchSR` |
   | Physical path | `C:\inetpub\wwwroot\watchsr` |
   | Binding type | `http` or `https` |
   | IP address | All Unassigned |
   | Port | `80` (http) or `443` (https) |
   | Host name | `watchsr.yourdomain.com` (or leave blank) |

5. Click **OK**

#### Using PowerShell

```powershell
# Create new IIS website
New-IISSite -Name "WatchSR" `
    -PhysicalPath "C:\inetpub\wwwroot\watchsr" `
    -BindingInformation "*:80:" `
    -Protocol http

# For HTTPS (if certificate available)
New-IISSite -Name "WatchSR-HTTPS" `
    -PhysicalPath "C:\inetpub\wwwroot\watchsr" `
    -BindingInformation "*:443:watchsr.yourdomain.com" `
    -Protocol https `
    -CertificateThumbprint "YOUR_CERT_THUMBPRINT"
```

---

### Step 5: Configure Application Pool

1. In IIS Manager, expand **Application Pools**
2. Find the app pool for your WatchSR site
3. Right-click → **Basic Settings**
4. Ensure the following:
   - **.NET CLR version:** `No Managed Code` (static files only)
   - **Managed pipeline mode:** `Integrated` (recommended)

---

### Step 6: Verify URL Rewrite Rules

1. In IIS Manager, click on your WatchSR site
2. Double-click **URL Rewrite**
3. Verify that rules are in place:
   - You should see the Vue Router rule
   - If not visible, the `web.config` file may not be deployed

**If rules don't appear:**
- Ensure `web.config` is in `C:\inetpub\wwwroot\watchsr\`
- Restart IIS: `iisreset`
- Refresh IIS Manager

---

## Testing the Deployment

### Test 1: Basic Access

1. Open a browser on the server (or another machine)
2. Navigate to: `http://localhost/` (if bound to port 80)
3. You should see the WatchSR home page

✅ **Success:** Home page displays correctly

❌ **Failure:** 
- Check that files were extracted to the correct folder
- Verify the website binding in IIS

---

### Test 2: Authentication Flow

1. On the home page, click **"Saiba Mais"**
2. You should be redirected to the Auth page (`/auth`)
3. This verifies Vue Router is working correctly

✅ **Success:** Auth page displays

❌ **Failure:**
- Verify URL Rewrite module is installed
- Check that `web.config` is present in the application folder
- Restart IIS: `iisreset`

---

### Test 3: API Connectivity

1. On the Auth page, enter test credentials
2. Click "Login"
3. Watch the browser Network tab (F12) for API calls

✅ **Success:** Request is sent to the API
   - Check Network tab → find "login" request
   - Verify response status is 200 or 401 (authentication error is OK)
   - If getting 503 or timeout, API server is unreachable

❌ **Failure:**
- API server may not be running or accessible
- Check API URL in the deployment (see Configuration section below)

---

## Configuration

### Changing the API Endpoint

The application communicates with the .NET API at: `https://localhost:7132`

**To change this endpoint:**

**Option 1: Modify web.config (NOT recommended - requires code change)**
The API endpoint is hardcoded in the deployed code. To change it:
1. Get the source code back from the developer
2. Modify `src/service/api.js`
3. Rebuild and redeploy

**Option 2: Environment-based Configuration (Future Enhancement)**
Ask the developer to:
1. Implement `.env.production` support in Vite
2. Set API URL via environment variable

---

### SSL/HTTPS Configuration

For production deployment with HTTPS:

1. **Obtain SSL Certificate**
   - Self-signed: `New-SelfSignedCertificate -CertStoreLocation Cert:\LocalMachine\My`
   - Commercial: Purchase from a trusted CA

2. **Import to IIS**
   - IIS Manager → Select server → Server Certificates
   - Click "Import" and select certificate file
   - Note the thumbprint

3. **Add HTTPS Binding**
   - In IIS Manager, select your WatchSR site
   - Right-click → Edit Bindings
   - Add binding: Type=HTTPS, Port=443, Certificate=Your Certificate

4. **Update Application Code**
   - Ensure API calls use HTTPS: `https://api.yourdomain.com`

---

## Maintenance

### Restarting the Application

**Via IIS Manager:**
1. Right-click the WatchSR site
2. Click "Restart"

**Via PowerShell:**
```powershell
# Restart application pool
Restart-WebAppPool -Name "WatchSR"

# Or restart entire IIS
iisreset
```

### Updating the Application

When a new version is deployed:

1. Stop the site: `Stop-IISSite -Name "WatchSR"`
2. Delete old files: `Remove-Item "C:\inetpub\wwwroot\watchsr\*" -Recurse -Force`
3. Extract new zip file to the folder
4. Start the site: `Start-IISSite -Name "WatchSR"`

---

## Troubleshooting

### Issue: 404 errors when refreshing pages

**Cause:** URL Rewrite module not working or not installed

**Solution:**
1. Verify URL Rewrite module is installed
2. Check that `web.config` exists in the application folder
3. Ensure URL Rewrite rules appear in IIS Manager
4. Restart IIS: `iisreset`

### Issue: Resources not loading (CSS, JS broken)

**Cause:** File permissions or path issues

**Solution:**
1. Verify all files were extracted from zip
2. Check file permissions: `icacls C:\inetpub\wwwroot\watchsr /grant "IIS AppPool\DefaultAppPool":F`
3. Check browser console (F12) for specific failed requests

### Issue: API calls getting 503 errors

**Cause:** API server is unreachable

**Solution:**
1. Verify .NET API is running on the configured server
2. Test connectivity: `Test-NetConnection -ComputerName "api-server" -Port 7132`
3. Check Windows Firewall rules
4. Verify API server is accessible from IIS server

### Issue: Slow page loads

**Cause:** Missing compression in web.config or large assets

**Solution:**
1. Verify compression is enabled in `web.config`
2. Restart IIS: `iisreset /restart`
3. Check network tab in browser (F12) for asset size

---

## Performance Optimization

### Enable Compression

Compression is already configured in `web.config`. If not working:

1. Verify Dynamic Compression is installed
2. Verify Static Compression is enabled
3. Restart IIS

### Configure Caching

Static assets (JS, CSS) are cached for 365 days by `web.config`. This is safe because filenames change on every build.

To adjust:
1. Edit `web.config`
2. Change `cacheControlMaxAge` value
3. Restart IIS

---

## Support & Escalation

If issues cannot be resolved:

1. **Check IIS Logs:** `C:\inetpub\logs\LogFiles\W3SVC1\`
2. **Check Application Event Log:** Event Viewer → Windows Logs → Application
3. **Enable Failed Request Tracing:** IIS Manager → Site → Failed Request Tracing Rules
4. **Contact the development team** with:
   - Server name and OS version
   - IIS version and installed modules
   - Error messages from logs
   - Browser console errors (F12)

---

**Last Updated:** March 2026
**Application:** WatchSR - Vue.js Frontend
**Server:** Windows Server with IIS 10
