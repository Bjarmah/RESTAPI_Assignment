import express, { Request, Response, NextFunction } from "express";
import { User, Product } from "./models";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));

app.use(express.json());
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let users: User[] = [];
let products: Product[] = [];

// Added a root route handler
app.get("/", (req: Request, res: Response) => {
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        res.json({
            message: "Welcome to the API",
            documentation_url: "https://whispering-tor-63318-814178c6cfe8.herokuapp.com/api-docs",
            endpoints: {
                "GET /users": "Retrieve all users (supports pagination, filtering, and sorting)",
                "GET /users/:id": "Retrieve a specific user",
                "POST /users": "Create a new user",
                "GET /users/:id/products": "Retrieve all products for a user",
                "POST /users/:id/products": "Create a new product for a user"
            }
        });
    }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong bruh!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });

//GET /Users/:id
app.get("/users/:id", (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});

//GET /Users
app.get("/users", (req: Request, res: Response) => {
    //Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = req.query.sortBy as keyof User || "id";
    const sortOrder = req.query.sortOrder as "desc" | "asc" || "asc";

    let filteredUsers = [...users];

    //applying sorting
    filteredUsers.sort((a, b) => {
        if (sortOrder === "asc")
            return a[sortBy] > b[sortBy] ? 1 : -1;
        else
            return a[sortBy] < b[sortBy] ? 1 : -1;
    });

    //applying pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    res.json({
        data: paginatedUsers,
        page,
        limit,
        sortBy,
        total: users.length
    });


});
//POST /Users
app.post("/users", (req: Request, res: Response) => {

    const newUser: User = {
        id: users.length + 1,
        username: req.body.name,
        email: req.body.email,
        createdAt: new Date()
    };



    users.push(newUser);
    res.status(201).json(newUser);
});

app.get("/users/:id/products", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const userProducts = products.filter((product) => product.userId === id);
    res.json(userProducts);
});

app.post("/users/:id/products", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
    }

    const newProduct: Product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        descritpion: req.body.descritpion,
        userId: id,
        createdAt: new Date()
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});




export default app;

