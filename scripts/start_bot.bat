@ECHO OFF
CD ..

IF EXIST temp.txt DEL /F temp.txt
TASKLIST /NH /FI "WINDOWTITLE EQ Zack Bot" > temp.txt
SET /P titlequery=<temp.txt
IF NOT "%titlequery%" == "INFO: No tasks meet specified criteria." (GOTO HasInst)

:CreateServer
ECHO Initializing...
TITLE Zack Bot
NODE .
ECHO Restarting bot...
ECHO.
GOTO CreateServer

:HasInst
ECHO Instance already running.
ECHO Exit now to keep it alive.
ECHO.
PAUSE

TASKKILL /F /FI "WINDOWTITLE EQ Zack Bot"
PAUSE
CLS
GOTO CreateServer
