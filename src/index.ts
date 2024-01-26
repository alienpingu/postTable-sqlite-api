import PostTable from "./model/postTable";
import Api from "./model/api";

const table = new PostTable();
const api:Api = new Api(table);
