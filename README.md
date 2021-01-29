# OPIS PROJEKTU 

Projekt ma realizować aplikacje dla fanów filmów.

## Wymagania funkcjonalne:

- wyszukiwanie informacji o filmach
- wyszukiwanie informacji o preferencjach użytkownika (Podstawowe preferencje takie jak gatunek filmu, reżyser lub aktorzy.)
- wprowadzenie możliwości oceniania obejrzanych filmów, oraz dobieranie na tej podstawie propozycji filmów
- tworzenie rankingów na podstawie ocenionych filmów 
- aplikacja na podstawie preferencji użytkownika oraz na podstawie rankingu filmów dobiera propozycję podobnych filmów 

W późniejszym etapie rozważamy wprowadzenie dodatkowych funkcji:
- odnośnik do trailerów


## Technologie:
Java 
HTML5 + CSS3 + Javascript


## Etap2:

### Wyszukiwanie filmów
- Dodano wyświetlanie filmów wybranego gatunku. Dane są pobierane z The Movie Database (TMDb) API.

### Premiery
- Wyświetlanie premier wraz z najważniejszymi informacjami: Plakat, tytuł, data premiery, opis filmu oraz gatunki. 
Dane są pobierane z The Movie Database (TMDb) API.

### Wiadomości
- Wyświetlanie wiadomości związanych z tematyką filmów. Dane pobierane są z Contextual Web Search API.

## Etap3:

### Wyszukiwanie filmów
- Dodano wyszukiwanie filmów. Dane są pobierane z The Movie Database (TMDb) API.

## Etap4:

### Polecane filmy
- Dodano polubienie filmów. 
Użytkownik może polubić dany film, baza zbiera informację o filmie, oraz proponuję filmy na podstawie polubień.
Gdy użytkownik nie jest zalogowany otrzymuję najbliższe premiery jako polecone filmy. Dane pobierane są z The Movie Database (TMDb) API.

### Stworzenie bazy użytkowników
- Utworzenine bazy danych użytkownikó w formacie tekstowym oraz bazę danych polubionych filmów danego użytkownika.

### Stworzenie serwera
- Stworzenie serwera oraz włączenie wszytskich widoków w strkukturę serwera. Serwer powstał przy użyciu technologii Flask. 
