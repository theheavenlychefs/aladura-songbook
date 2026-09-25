# Aladura Songbook Handoff

## Current scope

This prototype focuses on the production foundation, Home, Hymn Reader, Lyrics browser, full-screen Settings, full-screen History, and an Audio catalog surface.

## Implemented

- Home screen with logo, search, language filters, hymn of the day, continue reading, and recent hymns.
- Search across hymn number, title, metadata, and lyric text.
- Language filtering for English and Yoruba.
- Hymn Reader with language switching, metadata, chorus formatting, favourites, sharing, previous/next hymn gestures, and a hymn-level audio popup.
- Full-screen Settings with local profile, default language, reading preferences, library counts, history entry, clear recents, and About.
- Full-screen History using local recent hymn state.
- Audio screen using the `audio` file references in `data/hymns_final.json`.
- Local hymn-of-the-day metrics scaffold in `data/hymn_day_metrics.json`.

## Deliberately not invented

- Real user accounts and profile sync.
- Theme system beyond the current light UI.
- Feedback/contact workflow.
- Actual audio playback assets. The hymnal data references files such as `hymn-001-en.mp3`, but MP3/M4A files are not bundled in this handoff.
- Unique final art for every hymn. The app currently uses a deterministic image assignment from the available bundled image pool.

## Entry points

- App: `index.html`
- Main logic: `app.js`
- Styles: `styles.css`
- Hymn data: `data/hymns_final.json`
- Metrics scaffold: `data/hymn_day_metrics.json`

## Local preview

Run a static server from this folder, then open the local URL:

```powershell
npx serve . -l 5193
```

The current Codex preview has been tested at:

```text
http://127.0.0.1:5193/?v=settings-screen-audio-1
```

## Suggested next decisions

- Decide where real audio files will live and how they map to the existing `audio` filenames.
- Decide whether profile remains local-only or becomes account-backed.
- Decide the final Settings sections before adding more controls.
- Replace the temporary deterministic hymn art system with approved per-hymn artwork.
- Convert this static prototype into the target app framework when the product direction is locked.
