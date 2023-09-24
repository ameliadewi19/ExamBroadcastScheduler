const wbm = require('wbm');

wbm.start().then(async () => {
    const contacts = [
        { phone: '+6283150955902', name: 'Amelia', age: 21 },
        { phone: '+6285157646462', name: 'Dafa', age: 20 }
    ];
    const message = 'Hi {{name}}, your age is {{age}}';
    await wbm.send(contacts, message);
    await wbm.end();
}).catch(err => console.log(err));