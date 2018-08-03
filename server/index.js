const server = require('./app');

app.listen(process.env.PORT || 8080, () => {
    console.log('listening at http://localhost:' + (process.env.PORT || 8080));
  });
