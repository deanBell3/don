const knex= require('knex')({
    client:'pg',
    connection:{
        host:'localhost',
        user:'ubuntu',
        password:'dean',
        database:'off'
    }
});

module.exports= knex;