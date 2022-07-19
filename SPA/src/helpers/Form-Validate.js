export const errorWrapeer = (ctx) => {
  if (ctx.password !== ctx.rePass) {
    throw new Error("Password dont match !");
  }
};
export const matchEmail = (value) => {
  const regex = new RegExp(/^[A-Za-z0-9]+@[A-Za-z]+\.[a-z]+$/);
  let result = value.match(regex);
  console.log("rtrr", result);
  return result;
};
export const ctxValidation=(ctx)=>{
  //const { title, author, email, address, courier, number, payment } = value;
  if(ctx.title.length< 3){
     throw new Error('Title should be at least 3 characters long!');
  }
  if(ctx.author.length< 3){
   throw new Error('Author should be at least 3 characters long!');
  }
  if(ctx.address.length< 10){
     throw new Error('Address should be at least 10 characters long!');
  }
  
  let courier=ctx.courier.toLowerCase();
  let arr=['speedy','econt'];
  if(!arr.includes(courier)){
     throw new Error('Courier should Econt or Speedy!');
  }
  if(isNaN(ctx.number)|| ctx.number<1){
    throw new Error('Number must be bigger than 0!');
  }
  let match=matchEmail(ctx.email)
  if (match === null) {
    throw new Error(
      "Email must includes @ and . ()=> valid email (asd@sds.bg)"
    );
  }

}
