# Project Jerem

Serveur backend du projet Fil Rouge; Site vitrine d'un club de padel


## Deployment

To deploy this project run
(nodemon for auto refresh)

```bash
  node ./server.js
  nodemon ./server.js
```


## API Reference

#### Get all messages

```http
  GET http://localhost:3000/messages
  
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none`    | `-`      | No parameters              |


#### Save new messages

```http
  POST http://localhost:3000/messages
  
```

| Parameter  | Type            | Description                                  |
| :--------- | :-------------- | :------------------------------------------- |
| `messages` | `array<string>` | **Required**. Array containing your messages |

