$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$partsDir = Join-Path $repoRoot 'package'
$outDir = Join-Path $repoRoot 'site'
$zipPath = Join-Path $repoRoot 'Yummy-V3.zip'

Write-Host 'Reconstructing Yummy V3 package...'
$parts = Get-ChildItem $partsDir -Filter 'part-*.b64' | Sort-Object Name
if (-not $parts) { throw 'Package chunks are missing from package/.' }
$base64 = ($parts | ForEach-Object { Get-Content $_.FullName -Raw }) -join ''
[IO.File]::WriteAllBytes($zipPath, [Convert]::FromBase64String($base64))

if (Test-Path $outDir) { Remove-Item $outDir -Recurse -Force }
New-Item -ItemType Directory -Path $outDir | Out-Null
Expand-Archive -Path $zipPath -DestinationPath $outDir -Force
Remove-Item $zipPath -Force

Write-Host 'Yummy V3 installed to:' $outDir
Write-Host 'Starting local server...'
Set-Location $outDir
Start-Process -FilePath 'cmd.exe' -ArgumentList '/c','start-yummy.bat'
Write-Host 'Open http://localhost:8080'
