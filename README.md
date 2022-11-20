# faircorp-fe-mez

This project is the implementation of a frontend application for managing facilities in a smart building.

The managed entities include Building, Rooms, Heaters and Windows.

Team Members: Chimezirim Victor EKEMAM, Ignas BARAKAUSKAS and Sara Assefa ALLEMAYEHU

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Credentials of users:

- ROLE **ADMIN**
  - username: admin
  - password: password
  - [User has full access to all features]

## Implemented Features:

- **NAVIGATION**

  - Click on each entity row to view details
  - Use the Back button at the top right of the screen to return to previous screen
  - Use the Logout button to logout

- **NOTIFICATIONS**

  - Error/Validation notifications creating entities

- **BUILDING |** **ROOM |** **WINDOW |** **HEATER**

  - List
  - Create
  - Delete

- **WINDOW |** **HEATER**

  - Toggle Individual Status
  - Toggle All in Current Room

    **EXTRAS**

  - Basic Auth
  - Basic Mobile Responsiveness (Media Queries)
