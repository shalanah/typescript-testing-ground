// Setup inspired by FEM Course https://www.typescript-training.com/course/fundamentals-v3... but this is just my playground
// This is just me messing around... not real notes
function timeout(n) {
    return new Promise((res) => setTimeout(res, n));
}
export function addNumbers(a, b) {
    // await timeout(500);
    return a + b;
}
// Init types
let age = 6;
age = "hi";
const years = 10;
let endTime;
endTime = new Date();
console.log(addNumbers(3, 4));
let car;
const myCar = {
    make: "hey",
    model: "",
    year: 9,
    chargeVoltage: 2000,
    color: "red",
};
function printCar(car) {
    console.log(`${car.make} ${car.model} (${car.year})`);
    console.log(`${car.chargeVoltage}`);
}
console.log(printCar(myCar));
// Index signatures
// const phones = {
//   home: { country: "+1", area: "211", number: "652-4515" },
//   work: { country: "+1", area: "670", number: "752-5856" },
//   fax: { country: "+1", area: "322", number: "525-4357" },
// };
const phones = {};
if (phones.fax)
    phones.fax.area;
// Arrays
const fileExt = ["js", "ts"]; // will assume are all strings
const cars = [{ make: "Toyota", model: "Corolla", year: 2002 }]; // Now will assume same struct for rest of array objs
// Tuples
let someCar = [2002, "Toyota", "Corolla"]; // will assume everything can be a number or a string
let anotherCar = [2002, "Toyota", "Corolla"];
const [year, make, model] = anotherCar;
console.log(year);
const numPairs = [4, 3];
numPairs.push(5); // no errors... something to be aware of
// Structural vs Nominal Types
