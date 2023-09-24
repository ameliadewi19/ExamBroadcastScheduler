const wbm = require('wbm');

wbm.start({ showBrowser: true }).then(async () => {
    const contacts = [
        { phone: '+6283150955902', name: 'Amelia', age: 21 },
        { phone: '+6283150955902', name: 'Amelia', age: 21 },
        { phone: '+6285157646462', name: 'Dafa', age: 20 }
    ];
    const message = 'Hi {{name}}, your age is {{age}}';

        for (const contact of contacts) {
            await wbm.send([contact], message);
            const timeoutMillis = 5000; // Adjust the timeout duration as needed (in milliseconds)
            await new Promise(resolve => setTimeout(resolve, timeoutMillis));
        }
    await wbm.end();
}).catch(err => console.log(err));