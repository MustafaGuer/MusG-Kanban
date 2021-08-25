git add .
set /p commit=Enter commit: 
git commit -m "%commit%"
git push

ng build --prod --base-href="/MusG-Kanban/"