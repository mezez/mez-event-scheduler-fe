# Event Scheduler Frontend

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
  - Update backend api url in global settings found in main.js. Replace http://127.0.0.1:5000 with your url if applicable.

  ```sh
  app.config.globalProperties.$server_base_url = "http://127.0.0.1:5000/api/";
  ```

  - The api for this application can be found at https://github.com/mezez/mez-event-scheduler-be
  
  
  PREVIEW
  
  ![image](https://user-images.githubusercontent.com/12862246/203193995-70d30cde-7332-4f00-a7d6-b86b5d0c71dd.png)

