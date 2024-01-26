import PostTable from "./model/postTable";
import Api from "./model/api";

const table = new PostTable();
new Api(table);
