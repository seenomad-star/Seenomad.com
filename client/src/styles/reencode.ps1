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
        Write-Host "Re-encoding $file"
        $content = Get-Content $file
        [System.IO.File]::WriteAllLines($file, $content)
    } else {
        Write-Warning "File not found: $file"
    }
}
