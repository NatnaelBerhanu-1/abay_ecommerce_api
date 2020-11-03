const {Sequelize} = require('sequelize');
const uri = 'postgres://vbxfubnfzexrtg:b9254bb7a908d8b2a6f495744a19b84643ae76e92e8b0c1cc74a364a3fa2cff3@ec2-52-203-165-126.compute-1.amazonaws.com:5432/d7f6gktrr8gq8f';
const database = 'd7f6gktrr8gq8f';
const user = 'vbxfubnfzexrtg';
const port = '5432';
const password = 'b9254bb7a908d8b2a6f495744a19b84643ae76e92e8b0c1cc74a364a3fa2cff3';
const host = 'ec2-52-203-165-126.compute-1.amazonaws.com';
var sequelize;
if(process.env.NODE_ENV=='TEST'){
   sequelize = new Sequelize(
    uri,
    {
      dialect: "postgres",
      protocol: "postgres",
      port: port,
      host: host,
      logging: true,
      password: password,
    }
  );
}else{
  sequelize = new Sequelize('postgres://postgres:password@localhost:5432/ecommercedb');
}


try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;