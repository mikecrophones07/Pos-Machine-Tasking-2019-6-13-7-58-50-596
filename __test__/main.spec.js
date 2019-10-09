const main = require('../main');

it ('should check barcode is valid', () => {
    const barcodes = ['0001', '0003', '0005', '0003'];
    expect(main.isValidBarcode(barcodes)).toBe(true);
});

it ('should check barcode is not valid', () => {
    const barcodes = ['0001', '0003', '0005', '0013'];
    expect(main.isValidBarcode(barcodes)).toBe(false);
});

it ('should get product information', () => {
    const barcodes = ['0001', '0003', '0005', '0003'];
    const expected = [
        {"id": "0001", "name" : "Coca Cola", "price": 3},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
        {"id": "0005", "name" : "Dr Pepper", "price": 7},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    ]
    expect(main.getAllProductInformation(barcodes)).toMatchObject(expected);
});

it ('should return null if barcode is not present in product information', () => {
    const barcodes = ['03007', '0303', '0505', '0503'];
    const expected = []
    expect(main.getAllProductInformation(barcodes)).toMatchObject(expected);
});

it ('should summarize product total', () => {
    const barcodes = ['0001', '0003', '0005', '0003'];
    const expected = [
        {"id": "0001", "name" : "Coca Cola", "price": 3, "quantity": 1},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5, "quantity": 2},
        {"id": "0005", "name" : "Dr Pepper","price": 7, "quantity": 1},
    ]
    expect(main.getProductItemTotal(barcodes)).toMatchObject(expected);
});

it ('should print Recipet', () => {
    const barcodes = ['0001', '0003', '0005', '0003'];
    const expected =
    '------------------------------------------------------------\n' +
    'Coca Cola                       3          1\n' +
    'Pepsi-Cola                      5          2\n' +
    'Dr Pepper                       7          1\n' +
    '------------------------------------------------------------\n' +
    'Price: 20';
    expect(main.printReceipt(barcodes)).toBe(expected);
});