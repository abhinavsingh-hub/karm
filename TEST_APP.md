# Quick Test Checklist

## To Test the App:

1. **Start Dev Server:**
   ```bash
   npm run dev
   ```

2. **Open Browser:**
   - Should open at `http://localhost:5173`
   - Check browser console for errors (F12)

3. **Test Landing Page:**
   - Should see "For Humanity" heading
   - Moving dots in background
   - Sign Up / Sign In buttons visible
   - About section scrolls when clicking "About" in navbar

4. **Test Sign Up:**
   - Click "Join Karm" or "Sign Up"
   - Fill form
   - Submit
   - Should redirect to /home

5. **Test Navigation:**
   - All navbar links should work
   - Home, Connections, Campaigns, etc.

## Common Issues:

- **Blank Page**: Check browser console for errors
- **Routes not working**: Ensure using HashRouter for static hosting
- **Auth not working**: Clear localStorage and try again
- **Styling broken**: Check if CSS variables are loading

