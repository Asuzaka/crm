export default class CustomError extends Error {
   public statusCode: number;
   public status: "fail"| "error";
   public isOperational : boolean;

   constructor(msg:string, statusCode: number){
     super(msg)
     this.statusCode = statusCode;
     this.status = String(statusCode).startsWith("4") ? "fail" : "error";
     this.isOperational = true

     Error.captureStackTrace(this, this.constructor)
   }
}
