# WatchSR Application - Automated Deployment Script
# Purpose: Build and create deployment package for IIS deployment
# Usage: .\deploy.ps1

param(
    [string]$OutputPath = "C:\Ivan\Empresas\MEI\Site\_publish",
    [switch]$SkipBuild = $false
)

# Configuration
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$DistFolder = Join-Path $ProjectRoot "dist"
$WebConfigSource = Join-Path $ProjectRoot "web.config"
$OutputZip = Join-Path $OutputPath "watchsr-deployment-$(Get-Date -Format 'yyyy-MM-dd-HHmmss').zip"

# Colors for output
$success = @{ ForegroundColor = 'Green' }
$error = @{ ForegroundColor = 'Red' }
$info = @{ ForegroundColor = 'Cyan' }

Write-Host "=====================================" @info
Write-Host "WatchSR Deployment Script" @info
Write-Host "=====================================" @info
Write-Host ""

# Step 1: Validate prerequisites
Write-Host "Step 1: Validating prerequisites..." @info

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm not found. Please install Node.js and npm." @error
    exit 1
}
Write-Host "✅ npm found" @success

if (-not (Test-Path $ProjectRoot\package.json)) {
    Write-Host "❌ package.json not found in $ProjectRoot" @error
    exit 1
}
Write-Host "✅ package.json found" @success

# Step 2: Install dependencies
Write-Host ""
Write-Host "Step 2: Installing dependencies..." @info

Push-Location $ProjectRoot
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed" @error
    Pop-Location
    exit 1
}
Write-Host "✅ Dependencies installed" @success

# Step 3: Build application
if (-not $SkipBuild) {
    Write-Host ""
    Write-Host "Step 3: Building application..." @info
    
    # Remove old dist folder
    if (Test-Path $DistFolder) {
        Remove-Item -Path $DistFolder -Recurse -Force
        Write-Host "✅ Cleaned old dist folder" @success
    }
    
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed" @error
        Pop-Location
        exit 1
    }
    Write-Host "✅ Build completed successfully" @success
} else {
    Write-Host ""
    Write-Host "Step 3: Skipping build (--SkipBuild flag used)" @info
}

Pop-Location

# Step 4: Validate dist folder
Write-Host ""
Write-Host "Step 4: Validating build output..." @info

if (-not (Test-Path $DistFolder)) {
    Write-Host "❌ dist folder not found. Build may have failed." @error
    exit 1
}

if (-not (Test-Path "$DistFolder\index.html")) {
    Write-Host "❌ index.html not found in dist folder" @error
    exit 1
}
Write-Host "✅ Build output validated" @success

# Step 5: Create deployment folder
Write-Host ""
Write-Host "Step 5: Creating deployment package..." @info

if (-not (Test-Path $OutputPath)) {
    New-Item -ItemType Directory -Path $OutputPath -Force | Out-Null
    Write-Host "✅ Created output directory: $OutputPath" @success
}

# Step 6: Create temporary staging folder
$StagingFolder = Join-Path $ProjectRoot "deployment-staging"
if (Test-Path $StagingFolder) {
    Remove-Item -Path $StagingFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $StagingFolder | Out-Null

# Copy dist files
Copy-Item -Path "$DistFolder\*" -Destination $StagingFolder -Recurse -Force

# Copy web.config
if (Test-Path $WebConfigSource) {
    Copy-Item -Path $WebConfigSource -Destination $StagingFolder -Force
    Write-Host "✅ Included web.config" @success
} else {
    Write-Host "⚠️  web.config not found - you'll need to add it manually" -ForegroundColor Yellow
}

# Step 7: Create zip archive
Write-Host ""
Write-Host "Creating zip archive..." @info

$ProgressPreference = 'SilentlyContinue'
Compress-Archive -Path "$StagingFolder\*" -DestinationPath $OutputZip -Force
$ProgressPreference = 'Continue'

Write-Host "✅ Zip archive created: $OutputZip" @success

# Step 8: Cleanup
Remove-Item -Path $StagingFolder -Recurse -Force
Write-Host "✅ Cleaned up temporary files" @success

# Step 9: Display summary
Write-Host ""
Write-Host "=====================================" @success
Write-Host "Deployment package ready!" @success
Write-Host "=====================================" @success
Write-Host ""
Write-Host "Package location: $OutputZip" @info
Write-Host ""
Write-Host "Next steps:" @info
Write-Host "1. Transfer the zip file to your Windows Server"
Write-Host "2. Extract to: C:\inetpub\wwwroot\watchsr\"
Write-Host "3. Ensure web.config is in the application folder"
Write-Host "4. Restart the IIS Application Pool"
Write-Host ""
Write-Host "For detailed instructions, see: DEPLOYMENT_GUIDE.md"
Write-Host ""
