# gym-node-back proyecto de prueba para visualizar mi rutina de ejercicios diarios

## Installation

```bash
$ npm install gym-node-back
```

## Usage

```js
const gymNodeBack = require('gym-node-back');
mongoose.connect('mongodb://localhost:27017/gym-node-back', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conectado a la base de datos');
});
```xs

