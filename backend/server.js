const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
mongoose.connect(uri, clientOptions);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/categories");
const companyRouter = require("./routes/company");
const customerRouter = require("./routes/customer");
const productRouter = require("./routes/product");
const rolesRouter = require("./routes/roles");
const SupplierRouter = require("./routes/suppliers");
const userRouter = require("./routes/user");
const warehouseRouter = require("./routes/warehouse");
const adressRouter = require("./routes/address");
const stockRouter = require("./routes/stock");
const stockCardRouter = require("./routes/stockCard");

app.use("/auth", authRouter);
app.use("/roles", rolesRouter);
app.use("/category", categoryRouter);
app.use("/company", companyRouter);
app.use("/customer", customerRouter);
app.use("/product", productRouter);
app.use("/suppliers", SupplierRouter);
// app.use('/user', userRouter);
app.use("/warehouse", warehouseRouter);
app.use("/address", adressRouter);
app.use("/stock", stockRouter);
app.use("/stockCard", stockCardRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
