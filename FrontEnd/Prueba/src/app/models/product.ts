
export class Product {
    id: String | undefined; 
    title: String | undefined;
    price!: number;
    image?: String | undefined;
    descripcion?: String | undefined;
    autor?: String | undefined;
    sku?: String;
    quantity?: number;
}