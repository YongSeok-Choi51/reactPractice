import mysql from "mysql2/promise";

export abstract class PionRepository {

    _connection: mysql.Connection;

    constructor() {
        this.initConnection();

    }

    async initConnection() {
        this._connection = await mysql.createConnection({
            host: "localhost",
            user: 'root',
            password: '',
            database: 'pixar'
        });
    };

    abstract createTemplate(query?: any): any;
    abstract readTemplate(query?: any): any;
    abstract updateTemplate(query?: any): any;

}