import { ResultSetHeader } from 'mysql2/promise';
import { PionRepository } from './PionRepository';


export enum PaymentType {
    CASH = "cash",
    CARD = "card"
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

        // 결제수단, 구매자Id 정보는 임시적으로 상수로 고정, 단건판매 기준(한 잔의 음료 판매에 대한 data)
        const [resultSetHeader, _] = await this._connection.query({ sql: createOrderQuery }, [
            orderDto.vendingMachineId,
            orderDto.productId,
            PaymentType.CASH,
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