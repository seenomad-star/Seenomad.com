
import os

file_path = r'c:\Users\7khan\.gemini\antigravity\scratch\travel-website\src\styles\Explore.css'

new_css = """
/* Wrapper for the fixed navigation bar */
.explore-nav-wrapper {
    position: fixed;
    top: 60px;
    left: 72px;
    right: 0;
    z-index: 900;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 0.5rem 1.5rem 0.75rem 1.5rem;
    transition: all 0.3s ease;
}

/* Scrolled state for the wrapper */
.explore-nav-wrapper.scrolled {
    padding: 0.25rem 1.5rem 0.4rem 1.5rem;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* The scrollable list of buttons */
.explore-menu-top-navigation {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    scrollbar-width: none; /* Hide scrollbar for cleaner look with arrows */
    -ms-overflow-style: none;
    scroll-behavior: smooth;
    width: 100%;
    align-items: center;
    background: transparent;
    padding: 0;
    border: none;
    position: static;
}

.explore-menu-top-navigation::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome/Safari */
}

/* Navigation Arrows */
.nav-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: white;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
    z-index: 10;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.nav-arrow:hover {
    background: #f8fafc;
    color: #1e293b;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-arrow.left {
    margin-right: 0.5rem;
}

.nav-arrow.right {
    margin-left: 0.5rem;
}

/* Adjust button size when scrolled */
.explore-nav-wrapper.scrolled .explore-menu-top-navigation button {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
}
"""

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start of the block to replace
start_marker = ".explore-menu-top-navigation {"
start_idx = content.find(start_marker)

if start_idx == -1:
    print("Start marker not found!")
    exit(1)

# Find the end of the block to replace (the scrollbar hover style)
end_marker = ".explore-menu-top-navigation::-webkit-scrollbar-thumb:hover {"
end_idx_start = content.find(end_marker)

if end_idx_start == -1:
    print("End marker not found!")
    exit(1)

# Find the closing brace of that block
end_idx = content.find("}", end_idx_start) + 1

if end_idx == 0:
    print("Closing brace not found!")
    exit(1)

# Replace the content
new_content = content[:start_idx] + new_css + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully updated Explore.css")
