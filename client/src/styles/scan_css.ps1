$files = @(
    'd:\Seenomad_V3\client\src\styles\CreatorCommunity.css',
    'd:\Seenomad_V3\client\src\features\Explore\components\DestinationDetail.css',
    'd:\Seenomad_V3\client\src\features\Explore\styles\ExploreNavbar.css',
    'd:\Seenomad_V3\client\src\features\SocialFeed\styles\SocialFeed.css',
    'd:\Seenomad_V3\client\src\styles\BusinessPartner.css',
    'd:\Seenomad_V3\client\src\styles\popular\PopularFeed.css',
    'd:\Seenomad_V3\client\src\styles\Sidebar.css',
    'd:\Seenomad_V3\client\src\styles\SocialFeed.css',
    'd:\Seenomad_V3\client\src\styles\Wallet.css'
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "--- Scanning $file ---"
        $content = Get-Content $file
        for ($i = 0; $i -lt $content.Length; $i++) {
            $line = $content[$i]
            
            # Check backdrop-filter
            if ($line -match 'backdrop-filter' -and $line -notmatch '-webkit-backdrop-filter') {
                # Check if the line before has it
                if ($i -eq 0 -or $content[$i-1] -notmatch '-webkit-backdrop-filter') {
                    Write-Host "BACKDROP ERROR at $($i+1): $line"
                }
            }
            
            # Check scrollbar-width
            if ($line -match 'scrollbar-width') {
                Write-Host "SCROLLBAR WARNING at $($i+1): $line"
                # Check for -ms- and ::-webkit-
                $hasMS = $false
                if ($i -gt 0 -and $content[$i-1] -match '-ms-overflow-style') { $hasMS = $true }
                if ($i + 1 -lt $content.Length -and $content[$i+1] -match '-ms-overflow-style') { $hasMS = $true }
                if (-not $hasMS) { Write-Host "  MISSING -ms-overflow-style" }
            }
        }
    }
}
