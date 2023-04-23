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

    abstract createTemplate(input?: string | number): any;
    abstract readTemplate(input?: string | number): any;
    abstract updateTemplate(input?: string | number): any;

}