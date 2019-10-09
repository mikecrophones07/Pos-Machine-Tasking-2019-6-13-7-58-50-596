const productInformation = [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
]

function isValidBarcode (barcodes) {
    let tempBarcodes = productInformation.map(info => info.id);
    if(barcodes.every(i => tempBarcodes.includes(i))){
        return true;
    }
    return false;
}

function getAllProductInformation(barcodes){
    let productList = [];
    barcodes.forEach( barcode => {
        let productInfo = productInformation.filter(info => info.id === barcode)[0];
        if(productInfo !== undefined){
            productList.push(productInfo);
        }
    });
    return productList;
}

function getProductItemTotal(barcodes){
    let productTotal = [];
    const productInfoList = getAllProductInformation(barcodes)
    if(isValidBarcode(barcodes)){
        new Set(barcodes).forEach(barcode => {
            let quantity = productInfoList.filter(info => info.id === barcode).length;
            var productInfo = productInformation.filter(info => info.id === barcode)[0];
            productInfo.quantity = quantity;
            productTotal.push(productInfo);
        })   
    }
    return productTotal;
}


function printReceipt(barcode){
    const summarizeProduct = getProductItemTotal(barcode);
    const receiptDivider = '------------------------------------------------------------\n';
    let totalSum = 0;
    let receiptBody = '' + receiptDivider;
    summarizeProduct.forEach(product => {
        let stringLength = product.name.length;
        receiptBody += product.name;
        receiptBody += createSpaces(31 - stringLength) + product.price.toString();
        receiptBody += createSpaces(9) + product.quantity.toString() + '\n';
        totalSum += product.price * product.quantity;
    })
    receiptBody += receiptDivider;
    receiptBody += 'Price: ' + totalSum.toString();
    return receiptBody;
}

function createSpaces(spaceIndex){
    let textSpaces = '';
    for(var index = 0; index <= spaceIndex; index++){
        textSpaces += ' ';
    }
    return textSpaces;
}

module.exports = {
    isValidBarcode:isValidBarcode,
    getAllProductInformation:getAllProductInformation,
    getProductItemTotal:getProductItemTotal,
    printReceipt:printReceipt
};