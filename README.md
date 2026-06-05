# Trading Journal

Full-stack swing trading journal. React + TypeScript + Tailwind (frontend), Spring Boot + PostgreSQL (backend).

## Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS v4, Vite, Recharts, React Router, Axios
- **Backend**: Java 17, Spring Boot 3.3, Spring Data JPA, Lombok
- **Database**: PostgreSQL

## Setup

### 1. PostgreSQL

```sql
CREATE DATABASE trading_journal;
```

Muokkaa `backend/src/main/resources/application.properties` jos salasana/käyttäjä eri.

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run
# tai: mvn spring-boot:run
# Käynnistyy: http://localhost:8080
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
# Käynnistyy: http://localhost:5173
```

## API Endpoints

| Method | Path | Kuvaus |
|--------|------|--------|
| GET | /api/trades | Kaikki treidit |
| GET | /api/trades/stats | Tilastot (win rate, P&L jne.) |
| GET | /api/trades/:id | Yksittäinen treidi |
| POST | /api/trades | Uusi treidi (multipart/form-data) |
| PUT | /api/trades/:id | Päivitä treidi |
| DELETE | /api/trades/:id | Poista treidi |

## Ominaisuudet

-  Treidin lisäys (ticker, long/short, entry/exit, shares, päivämäärät)
-  Muistiinpanot + setup tag
-  Automaattinen P&L -laskenta (myös SHORT)
-  Dashboard: win rate, total P&L, profit factor, P&L-käyrä
-  Trade lista taulukossa
-  Trade detail näkymä jossa voi tehdä muutoksia sekä lisätä erilliseen kohtaan miten kävi ja miksi kuten mitä parannettavaa
-  Chart screenshot -liite (tulossa)

## Seuraavat askeleet

- [ ] Filtteröinti (päivämäärä, ticker, setup)
- [ ] CSV export
- [ ] Screenshot toiminnan vieminen loppuun
