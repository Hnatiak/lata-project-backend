// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// // const swaggerUi = require("swagger-ui-express");
// // const swaggerDocument = require("./swagger.json");

// // const authRouter = require("./routes/api/auth");
// // const usersRouter = require("./routes/api/users");
// // const boardsRouter = require("./routes/api/boards");
// // const columnsRouter = require("./routes/api/columns");
// // const cardsRouter = require("./routes/api/cards");

// require("dotenv").config();

// const app = express();

// // app.use(morgan("combined"));
// // app.use(cors());
// // app.use(express.json());
// // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // app.use("/api/auth", authRouter);
// // app.use("/api/users", usersRouter);
// // app.use("/api/boards", boardsRouter);
// // app.use("/api/columns", columnsRouter);
// // app.use("/api/cards", cardsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not Found" });
// });

// app.use((error, req, res, next) => {
//   const { status = 500, message = "Server error" } = error;
//   res.status(status).json({ message });
// });

// module.exports = app;










// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// require("dotenv").config();

// const booksRouter = require('./routes/api/books')

// const app = express();

// const formatLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatLogger))
// app.use(cors())
// app.use(express.json())

// app.use('api/books', booksRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: "Not Found" });
// });

// app.use((error, req, res, next) => {
//   const { status = 500, message = "Server error" } = error;
//   res.status(status).json({ message });
// });

// module.exports = app;




const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config()

const contactsRouter = require('./routes/api/contacts')

const app = express()

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Not Found - Даного ID не існує"} = err;
  res.status(status).json({ message })
})

module.exports = app