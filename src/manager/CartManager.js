import fs from "fs";


class cartManager{
    #path;
    #accumulator = 0;
    constructor(path) {
        this.#path = path;
    }
};

export default cartManager