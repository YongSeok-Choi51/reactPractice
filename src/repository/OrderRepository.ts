import { ResultSetHeader } from 'mysql2/promise';
import { PionRepository } from './PionRepository';


export enum PaymentType {
    Cash = "cash",
    Card = "card"
}

export interface OrderEntity {
    id: number;
    vendingMachineId: number;
    productId: number;
    amount: number;
    price: number;
}

export interface OrderDto {
    vendingMachineId: number;
    productId: number;
    amount: number;
    price: number;
}

export class OrderRepository extends PionRepository {


    async createTemplate(orderDto: OrderDto) {

        const createOrderQuery = `
            INSERT INTO 
                pixar.order (
                    vending_machine_id,
                    product_id,
                    payment_type,
                    amount,
                    total_price,
                    created_at,
                    created_by
                )
            VALUES(?, ?, ?, ?, ?, ?, ?)
        `;

        const [resultSetHeader, _] = await this._connection.query({ sql: createOrderQuery }, [
            orderDto.vendingMachineId,
            orderDto.productId,
            PaymentType.Card,
            orderDto.amount,
            orderDto.price,
            new Date(),
            1
        ]);
        return resultSetHeader && (resultSetHeader as ResultSetHeader).affectedRows > 0;
    }

    readTemplate(input?: any) {

    }

    updateTemplate(input?: any) {

    }


}