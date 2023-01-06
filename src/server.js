import app from "./app.js";

const port = process.env.PORT;
app.listen(port, () => console.log(`server up and running on port ${port}`));