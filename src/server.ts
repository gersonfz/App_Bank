import app from "./app";
import { connectDB } from "./db/db.config";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
})