MusicBrainz testet.


Jag strukturerade denna applikation i 3 primära mappar. Jag har routes mappen där jag gör min routing. Just nu har den bara 1 fil med bara en
rutt. När rutten anropas med rätt ID-format (Om formatet inte är korrekt kommer användaren att få tillbaka ett meddelande om att ID-formatet 
är fel). I controllers-mappen är det där applikationen hanterar alla steg för att skicka tillbaka rätt begäran.
Jag använder id:t taget från url:n och anropar MusicBrainz-funktionen med ID:t som parameter. ID:t används för att anropa musicbrainz api.
Jag har felbehandlat att om ID inte finns får du ett felmeddelande tillbaka. I MusicBrainzApi-filen har jag ett tomt artistobjekt som
Jag fyller i med korrekta uppgifter från response. Jag använder wikidata ID i artistobjektet för att hämta data från wikidata api i ordning
för att få beskrivningen av artisten. Det första steget i wikidata-funktionen är att kontrollera om det finns ett wikidata-ID.
Om det inte är det, körs hämtningen aldrig för att spara tid. Samma sak när man hämtar omslagsbilden för album.
Funktionen fortsätter endast förutsatt att det finns albumobjekt inuti arrayen. Jag kollar detta med längdfunktionen.
När filtrering och ingen matchning finns är standardlängden för arrayen 0. Detta är ett snabbt och enkelt sätt att hantera fel
för att förhindra att applikationen kraschar när applikationen försöker göra metoder på odefinierade objekt. Om det finns album men nej
Omslagsbilder hittas får du ett meddelande som säger att det inte finns några omslagsbilder istället för att applikationen returnerar ett fel.
Omslagskonstfunktionen är den sista på listan så när den är klar returneras objektet tillbaka till kontrollfilen och skickar det till
klient i form av ett json-objekt. Jag har använt chai och mocka för att testa. Testet består av att hämta med rätt id,
fel format id, icke-existerande id och korrekt id där artisten inte har album/beskrivningar.


MusicBrainzApi kan vara ganska långsam ibland så min lösning var att göra så få calls som möjligt. Som t.ex. när wikiID inte fanns eller om albums
hade en 0 length. Vissa stora artiser med många albums gick ganska långsamt i början. Ibland upp till 15 sekunder. Men jag försökte optimisera 
appen så mycket jag kan och snittar nu mellan 3 till 6 sekunder.