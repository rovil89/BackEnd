import path from "path";
import { fileURLToPath } from "url";

// debemos crear nuestra propia variable __dirname a traves del metido si usamos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;