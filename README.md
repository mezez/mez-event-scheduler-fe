# faircorp-fe-mez

This project is the implementation of a frontend application for scheduling events on a calendar.

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

## Implemented Features:

- **Booking**

  - You can only book for slots starting from the next day from current date
  - Click on Build, enter email address and click save booking to reserve a slot.
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
