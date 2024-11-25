# VCS-Baigiamasis

VCS Ilgieji JavaScript mokymai - Baigiamasis egzaminas.

# Frontend Struktūros Paaiškinimas

Nuomos sistemos frontend dalis, sukurta naudojant React.

## Projekto Struktūra

- `/src/pages` - Pagrindiniai puslapiai:

  - Home.jsx - Pagrindinis puslapis
  - ToolDetails.jsx - Įrankio informacijos puslapis
  - Booking.jsx - Rezervacijos puslapis
  - Confirmation.jsx - Patvirtinimo puslapis
  - AdminPanel.jsx - Administratoriaus valdymo skydas
  - Login.jsx - Prisijungimo puslapis
  - Signup.jsx - Registracijos puslapis

- `/src/components` - Komponentai:

  - Header.jsx - Navigacijos juosta
  - ToolCard.jsx - Įrankio DIV'ui
  - ToolGrid.jsx - Įrankių sąrašas
  - BookingForm.jsx - Rezervacijos forma
  - ReservationList.jsx - Rezervacijų sąrašas
  - ToolForm.jsx - Įrankio pridėjimo/redagavimo forma
  - auth/LoginForm.jsx - Prisijungimo forma
  - auth/SignupForm.jsx - Registracijos forma

- `/src/hooks` - Custom hooks komponentai
- `/src/utils` - Pagalbinės funkcijos
- `/src/context` - React Context API komponentai

## Paleidimo Instrukcijos

1. Įdiekite reikalingus paketus:

```bash
npm install
```

2. Paleisti projektą:

```bash
npm run dev
```

3. Atidarykite naršyklę adresu: `vite localhost`

- Naudotos Technologijos:

  - React
  - React Router
  - Tailwind CSS
  - Vite

- Funkcionalumas

  - Įrankių peržiūra
  - Įrankių rezervacija
  - Administratoriaus valdymo skydas
  - Rezervacijų valdymas

# Backend Struktūros Paaiškinimas

## Pagrindiniai Aplankai

### `/config`

Konfigūracijos aplankas skirtas duomenų bazės prisijungimui ir kitoms sistemos konfigūracijoms. Čia saugome MongoDB prisijungimo nustatymus ir kitus svarbius parametrus.

### `/controllers`

Kontrolerių aplankas talpina visą verslo logiką. Čia aprašome funkcijas, kurios apdoroja užklausas, pvz.:

- Įrankių pridėjimas/redagavimas
- Rezervacijų valdymas
- Vartotojų valdymas

### `/models`

Modelių aplankas saugo duomenų bazės schemas. Mūsų atveju turėsime:

- Tool modelį (įrankių informacijai)
- Reservation modelį (rezervacijų duomenims)
- User modelį (vartotojų informacijai)

### `/routes`

Maršrutų aplankas apibrėžia API endpoints. Čia nurodome, kurie URL adresai į kokius kontrolerius nukreipia užklausas:

- /api/tools
- /api/reservations
- /api/users

### `/middleware`

Tarpinės programinės įrangos aplankas skirtas funkcijoms, kurios apdoroja užklausas prieš pasiekiant kontrolerius:

- Autentifikacijos tikrinimas
- Užklausų validacija
- Klaidų apdorojimas

1. Įdiekite reikalingus paketus:

```bash
npm install
```

2. ENV Failo parametrai:
   PORT=5000
   URI=mongodb_prisijungimo_adresas

3. Paleisti projektą:

```bash
npm run dev
```

4. Atidarykite naršyklę adresu: `localhostas su portu`

- Naudotos Technologijos:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Bcrypt
  - JWT
  - CORS
  - Dotenv
  - Nodemon
