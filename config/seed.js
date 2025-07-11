const { ExpenseCategory } = require("../src/model");

const main = async () =>{
    const categories = [
        {name: 'Electricty'},
        {name: 'fuel'},
        {name: 'Airtime'},
        {name: 'Data'},
        {name: 'TV Subscription'},
        {name: 'Transportation'},
        {name: 'School-fees'},
        {name: 'Feeding'},
        
    ]
    await ExpenseCategory.insertMany(categories)
}

module.exports =  main