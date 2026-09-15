# Enterprise Project Structure

This project has been migrated to a scalable, enterprise-level structure. Below is the recommended organization for future development to maintain code quality and scalability.

## Folder Structure

```
/src
  /assets           # Static assets (images, fonts, icons)
  /components       # Shared/Common UI components (Button, Modal, Card)
  /config           # Application configuration (constants, env vars)
  /context          # Global state management (AuthContext, ThemeContext)
  /features         # Feature-based modules (The core of the app)
    /Auth           # Authentication feature
    /Dashboard      # Dashboard feature
    /Wallet         # Wallet feature
    /UserHub        # User Hub feature
      /components   # Feature-specific components
      /hooks        # Feature-specific hooks
      /services     # Feature-specific API services
      /index.jsx    # Feature entry point
  /hooks            # Shared custom hooks (useOnClickOutside, useMediaQuery)
  /layouts          # Layout components (MainLayout, AuthLayout)
  /pages            # Route components (Page level integration)
  /services         # Global API services (axios setup, error handling)
  /styles           # Global styles, theme variables, mixins
  /utils            # Helper functions and utilities
  App.jsx           # Main application component
  main.jsx          # Application entry point
```

## Key Principles

1.  **Feature-First Architecture**: Code related to a specific feature (e.g., Wallet) stays within that feature's folder. This makes the codebase easier to navigate and maintain.
2.  **Shared vs. Specific**: Generic UI components go in `src/components`, while feature-specific components go in `src/features/<FeatureName>/components`.
3.  **Separation of Concerns**: Logic (hooks), UI (components), and Data (services) are separated.
4.  **Scalability**: This structure allows new features to be added without cluttering the root source folder.

## Next Steps for Refactoring

1.  Move existing `modules/*` to `features/*`.
2.  Extract shared UI elements (Sidebar, Navbar) to `components/layout`.
3.  Centralize API calls in `services/`.
4.  Implement strict linting and formatting rules (ESLint + Prettier).
