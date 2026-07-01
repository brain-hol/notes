# Overriding .desktop files

From Chris:

- Take any .desktop file (e.g. from /usr/share/applications, etc) and copy it to ~/.local/share/applications. Keep the same filename.
- Modify the .desktop file in ~/.local/share/applications as needed
- Gnome does not show duplicate entries in the launcher menu for the application
- I did this for Microsoft Edge on Linux. It doesn't support the ozone override in edge://flags so I had to override the .desktop file
- The custom .desktop files do not get overridden on application updates

Sent in tandem with [Ozone Platform Hint](./ozone-platform-hint).
