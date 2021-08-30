git add .
set /p commit=Enter your Commit: 
git commit -m "%commit%"
git push

ng build --prod --base-href="/MusG-Kanban/"