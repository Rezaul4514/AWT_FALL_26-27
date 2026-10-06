function processOrder() {
    return new Promise((resolve, reject) => {

        console.log("Processing order...");

        setTimeout(() => {

            const success = true;

            if (success) {
                const order = {
                    orderId: 55547,
                    customer: "Rezaul",
                    item: "Chicken Burger",
                    quantity: 1,
                    total: 270
                };

                resolve(order);

            } else {
                reject("Failed to process the order");
            }

        }, 3000);
    });
}

processOrder()
    .then((order) => {
        console.log("Order ID:", order.orderId);
        console.log("Customer:", order.customer);
        console.log("Item:", order.item);
        console.log("Quantity:", order.quantity);
        console.log("Total Amount:", order.total);
    })
    .catch((error) => {
        console.log("Error:", error);
    })
    .finally(() => {
        console.log("Order processing completed.");
    });