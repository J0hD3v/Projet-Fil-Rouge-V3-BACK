# Projet Fil Rouge

Serveur backend du projet Fil Rouge; Site vitrine d'un club de padel


## Deployment

To deploy this project run
(nodemon for auto refresh)

```bash
  node ./server.js
  nodemon ./server.js
```


## API Reference

#### Get all users

```http
  GET http://localhost:3000/users
  
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none`    | `-`      | No parameters              |


#### Get user by name

```http
  GET http://localhost:3000/userbyname
  
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `name`    | `string`      | **Required**. User's name  |


#### Save new messages

```http
  POST http://localhost:3000/messages
  
```

| Parameter  | Type            | Description                                  |
| :--------- | :-------------- | :------------------------------------------- |
| `messages` | `array<string>` | **Required**. Array containing your messages |


#### Get all reservations

```http
  GET http://localhost:3000/reservations
  
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none`    | `-`      | No parameters              |


#### Save new reservation

```http
  POST http://localhost:3000/reservation
  
```

| Parameter      | Type  | Description              |
| :------------- | :---- | :----------------------- |
| `idUser`       | `int` | **Required**. User's ID  |
| `idTerrain`    | `int` | **Required**. Field's ID |
| `date_horaire` | `int` | **Required**. Datetime   |