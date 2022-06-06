import digitsOnly from "./digitsOnly";

const positiveNumber = value => digitsOnly(value) && value > 0;
export default positiveNumber;
