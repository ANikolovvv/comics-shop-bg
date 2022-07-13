export const errorWrapeer = (ctx, type) => {
  const regex = new RegExp(/^[A-Za-z0-9]+@[A-Za-z]+\.[a-z]+$/);
  let match = ctx.email.match(regex);
  if (match === null) {
    throw new Error("Invalid email!");
  }

  if (type === "register") {
    if (ctx.password !== ctx.rePass) {
      throw new Error("Password dont match !");
    }
  }
   
};
