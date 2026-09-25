# Wire AuthButton into the navbar

`AuthButton` is ready at `client/src/features/Auth/AuthButton.jsx`.

## Minimal change in `CoreNav.jsx`

```jsx
import AuthButton from '../../features/Auth/AuthButton';
import { useAuthStore } from '../../store/authStore';

// inside component:
const authProfile = useAuthStore((s) => s.profile);
const authUser = useAuthStore((s) => s.user);
const displayName = authProfile?.displayName || 'Seenomad Nomad';
const displayEmail = authProfile?.email || authUser?.email || 'seenomad@gmail.com';
const displayAvatar = authProfile?.avatarUrl || userAvatar;

// next to the existing profile control:
<AuthButton className="nav-auth-btn" />
```

Replace hardcoded dropdown name / email / avatar with `displayName`, `displayEmail`, `displayAvatar`.

`AuthProvider` is already wrapping the app in `main.jsx`.
