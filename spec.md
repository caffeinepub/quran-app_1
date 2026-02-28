# Specification

## Summary
**Goal:** Add a Ramadan Prayer Timings screen to the Quran App displaying static prayer schedules for all 30 days of Ramadan.

**Planned changes:**
- Create a new Ramadan Prayer Timings screen listing Suhoor/Fajr, Dhuhr, Asr, Maghrib/Iftar, and Isha times for all 30 days of Ramadan with hardcoded/static data
- Display both Arabic and English prayer names for each entry
- Style the screen using the existing Islamic green and gold theme, mobile-first with smooth scrolling
- Register a new `/prayer-timings` route in App.tsx (TanStack Router)
- Add a Ramadan Prayer Timings navigation card on the Home screen alongside existing cards (Surah List, Juz Index, Tasbeeh, Settings)

**User-visible outcome:** Users can tap a new "Ramadan Prayer Timings" card on the Home screen and view a scrollable list of prayer times for each of the 30 days of Ramadan, with Arabic and English prayer names styled consistently with the rest of the app.
