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
/*
- Static vs Dynamic
  - Static... write types while you code(TS, Java, C#, C++)
  - Dynamic... at runtime(JavaScript, Python, Ruby, Perl)
- Nominal vs Structural
  - Nominal => Name of classes for types
  - Structural => (JS) more inline names only for convenience... care about shape not class name when type checking
- Duck typing
  - If it appears to be a duck... it is a duck... if we have what we need we are good to go... more like dynamic typing and errors at runtimes
- Strong vs Weak - Don't mean anything really. People use them to describe Static Typing although these words are not official
*/
// Union and Intersection Types
/*
- Union (|)... basically or ||
- Intersection (&) is more like combining types into one massive type. Must have all the things described with is kinda like an and... less used
*/
// Union Types
const flipCoin = () => {
    return Math.random() > 0.5 ? "heads" : "tails";
};
// Also smart enough... (which I prefer since it isn't as verbose)
// const flipCoin = () => {
//   return Math.random() > 0.5 ? "heads" : "tails";
// };
const outcomeFlipCoin = flipCoin();
console.log(outcomeFlipCoin);
// Why do we need to declare error vs success etc first? Because TS won't be so specific. It will expect (string, error)[] or (string, {name: string, email: string})[]... which also doesn't care about position... TS isn't always "smart"... good idea to be more explicit with tuples
const maybeGetUserInfo = () => {
    return flipCoin()
        ? ["success", { name: "Mike North", email: "mike@example.com" }]
        : ["error", new Error("The coin landed on Tails")];
};
const exDiscriminatedUnion = maybeGetUserInfo();
const [type, res] = maybeGetUserInfo();
res.name; // weird that we are guarenteed name for both an obj or error
// Narrowing with type guards
// ie
if (type === "success")
    res;
else
    res;
// ie
if (res instanceof Error)
    res;
else
    res;
// Discriminated Unions ("Tagged Union Type")
// - Also could be in a switch
if (exDiscriminatedUnion[0] === "success")
    exDiscriminatedUnion;
else
    exDiscriminatedUnion;
// Intersection Types
const ONE_WEEK = 234234; // numbers that represent 1 week
function makeWeek() {
    const start = new Date();
    const end = new Date(start.valueOf() + ONE_WEEK);
    return Object.assign(Object.assign({}, start), { end });
}
const thisWeek = makeWeek();
thisWeek;
const printContactInfo = (info) => {
    console.log(info);
};
const personMe = {
    name: "Shalanah",
    age: "None of your beeswax ok",
    email: "an email",
};
// Ok to have extra props if stored in const... but not passed in directly... normal behavior
printContactInfo(personMe);
export function maybeGetUserInfo2() {
    if (Math.random() > 0.5) {
        return ["success", { name: "Mike North", email: "mike@example.com" }];
    }
    else {
        return ["error", new Error("The coin landed on TAILS :(")];
    }
}
const newYearsEve = Object.assign(Object.assign({}, new Date()), { getReason: () => "Last day of the year" });
newYearsEve.getReason;
// Interfaces
// - More limited... can only define object types... class or objects... cannot handle unions that aren't objects or classes
// - Allows for `extends` (like things) or `implements` (unlike things... helps with class and applying an interface)
// - Are "open" unlike with type aliases can be declared in multiple places... allows to augment the interface
class LivingOrganism {
    isAlive() {
        return true;
    }
}
// `implements` allows for multiple "contracts" or multiple interfaces
// You can use implements with types... but Mike doesn't like that too much since types don't need to work with objects... he uses implements only with interfaces
class Dog extends LivingOrganism {
    constructor() {
        super(...arguments);
        this.anotherProp = 5;
    }
    bark() {
        return "woof";
    }
    eat(food) {
        console.log(food, "yum");
    }
}
// Augmenting the window w/interface
window.document;
window.something = 5;
// another opt...
window.myExtraProp; // seems to only work right here
// @ts-expect-error
window.anyPropTwo;
window.MyNamespace; // for tsx
const nestedArr = [3, [1, 2], [4, 6, 7], 8];
function isJSON(arg) { }
// POSITIVE test cases (must pass)
isJSON("hello");
isJSON([4, 8, 15, 16, 23, 42]);
isJSON({ greeting: "hello" });
isJSON(false);
isJSON(true);
isJSON(null);
isJSON({ a: { b: [2, 3, "foo"] } });
isJSON({ a: { b: [2, 3, "foo", { hey: "yes" }] } });
// NEGATIVE test cases (must fail)
// @ts-expect-error
isJSON(() => "");
// @ts-expect-error
isJSON(class {
});
// @ts-expect-error
isJSON(undefined);
// @ts-expect-error
isJSON(new BigInt(143));
// @ts-expect-error
isJSON(isJSON);
// Functions
