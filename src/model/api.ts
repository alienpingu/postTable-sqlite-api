import express, { Request, Response } from 'express';
import PostTable from './postTable';
const app = express();
app.use(express.json());

class Api {
    port:number = 3000;
    table: PostTable;
    
    constructor(table: PostTable) {
        this.table = table; 

        this.serveIndex();
        this.getPosts()
        this.insertPost();
        this.deletePost();
        
        app.listen(this.port, () => {
            console.log(`🔵 Example app listening on port ${this.port}`);
        });
    }

    serveIndex = () => app.get('/', (req: Request, res: Response) => res.send('Hello World!'));
    getPosts = async () => app.get('/posts', (req: Request, res: Response) => this.table.select().then(postRows => res.send(postRows)));
    insertPost = async () => {
        app.post('/insert', (req: Request, res: Response) => {
            if (req.body.username && req.body.content) {
                this.table.insert(req.body.username, req.body.content).then(bool => res.send(bool))
            } else {
                res.status(501).send('Username or content is missing');
            }
        });
    }
    deletePost = async () => {
        app.post('/delete', (req: Request, res: Response) => {
            if (req.body.id) {
                this.table.delete(req.body.id).then(bool => res.send(bool))
            } else {
                res.status(501).send('Post id is missing');
            }
        })
    }
}

export default Api;