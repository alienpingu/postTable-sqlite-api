import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import PostTable from './postTable';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'pug');
const path = require('path');
app.set('views', path.join(__dirname, '../views'));

class Api {
    port:number = 3000;
    table: PostTable;
    
    constructor(table: PostTable) {
        this.table = table; 

        this.getIndex();
        this.geteSubmit();
        this.getPosts();
        this.insertPost();
        this.deletePost();
        
        app.listen(this.port, () => {
            console.log(`🔵 Example app listening on port ${this.port}`);
        });
    }

    getIndex = () => app.get('/', (req: Request, res: Response) => {
        this.table.select().then(postRows => {
            res.render('home', {
                title: 'Board',
                isError: false,
                isNoPost: postRows.length === 0,
                posts: postRows 
              });
        }).catch(err => {
            res.render('home', {
                title: 'Board',
                isError: true,
            });
        })
    });

    geteSubmit = () => app.get('/submit', (req: Request, res: Response) => {
        res.render('submit', {
            title: 'Submit post',
          });
    });

    getPosts = async () => app.get('/posts', (req: Request, res: Response) => this.table.select().then(postRows => res.send(postRows)));
    insertPost = async () => {
        app.post('/insert', (req: Request, res: Response) => {
            if (req.body.username && req.body.content) {
                this.table.insert(req.body.username, req.body.content).then((bool) => (bool) ? res.status(200).redirect('/') : res.status(501).send('Server error'))
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