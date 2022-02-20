// Setup inspired by FEM Course https://www.typescript-training.com/course/fundamentals-v3... but this is just my playground
// This is just me messing around... not real notes

function timeout(n: number) {
  return new Promise((res) => setTimeout(res, n));
}

export function addNumbers(a: number, b: number): number {
  // await timeout(500);
  return a + b;
}

// Init types
let age: any = 6;
age = "hi";
const years = 10;
let endTime: Date;
endTime = new Date();
console.log(addNumbers(3, 4));

let car: {
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number;
};

const myCar = {
  make: "hey",
  model: "",
  year: 9,
  chargeVoltage: 2000,
  color: "red",
};

function printCar(car: {
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number;
}) {
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
const phones: {
  [k: string]:
    | {
        country: string;
        area: string;
        number: string;
      }
    | undefined; // don't want to assume that phones.fax.area exists
} = {};

if (phones.fax) phones.fax.area;

// Arrays
const fileExt = ["js", "ts"]; // will assume are all strings
const cars = [{ make: "Toyota", model: "Corolla", year: 2002 }]; // Now will assume same struct for rest of array objs

// Tuples
let someCar = [2002, "Toyota", "Corolla"]; // will assume everything can be a number or a string
let anotherCar: [number, string, string] = [2002, "Toyota", "Corolla"];
const [year, make, model] = anotherCar;
console.log(year);

const numPairs: [number, number] = [4, 3];
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
const flipCoin = (): "heads" | "tails" => {
  return Math.random() > 0.5 ? "heads" : "tails";
};
// Also smart enough... (which I prefer since it isn't as verbose)
// const flipCoin = () => {
//   return Math.random() > 0.5 ? "heads" : "tails";
// };
const outcomeFlipCoin = flipCoin();
console.log(outcomeFlipCoin);

// Why do we need to declare error vs success etc first? Because TS won't be so specific. It will expect (string, error)[] or (string, {name: string, email: string})[]... which also doesn't care about position... TS isn't always "smart"... good idea to be more explicit with tuples
const maybeGetUserInfo = ():
  | ["error", Error]
  | ["success", { name: string; email: string }] => {
  return flipCoin()
    ? ["success", { name: "Mike North", email: "mike@example.com" }]
    : ["error", new Error("The coin landed on Tails")];
};

const exDiscriminatedUnion = maybeGetUserInfo();
const [type, res] = maybeGetUserInfo();
res.name; // weird that we are guarenteed name for both an obj or error

// Narrowing with type guards
// ie
if (type === "success") res;
else res;
// ie
if (res instanceof Error) res;
else res;

// Discriminated Unions ("Tagged Union Type")
// - Also could be in a switch
if (exDiscriminatedUnion[0] === "success") exDiscriminatedUnion;
else exDiscriminatedUnion;

// Intersection Types
const ONE_WEEK = 234234; // numbers that represent 1 week
function makeWeek(): Date & { end: Date } {
  const start = new Date();
  const end = new Date(start.valueOf() + ONE_WEEK);
  return { ...start, end };
}

const thisWeek = makeWeek();
thisWeek;

// Type Aliases
// Helpful with
// - 1. Naming
// - 2. Allow for one place to define
// - 3. Import/export
// ... can only have one typ of a given name in a given scope but not in interfaces
export type UserContactInfo = {
  name: string;
  email: string;
};
const printContactInfo = (info: UserContactInfo) => {
  console.log(info);
};
const personMe = {
  name: "Shalanah",
  age: "None of your beeswax ok",
  email: "an email",
};
// Ok to have extra props if stored in const... but not passed in directly... normal behavior
printContactInfo(personMe);

type ErrorTuple = ["error", Error];
type SuccessContactTuple = ["success", { name: string; email: string }];
export function maybeGetUserInfo2(): SuccessContactTuple | ErrorTuple {
  if (Math.random() > 0.5) {
    return ["success", { name: "Mike North", email: "mike@example.com" }];
  } else {
    return ["error", new Error("The coin landed on TAILS :(")];
  }
}

// Build on types with "&" to extend
type SimpleDate = Date; // just for testing purposes here wouldn't do this
type SpecialDate = SimpleDate & { getReason(): string };
const newYearsEve: SpecialDate = {
  ...new Date(),
  getReason: () => "Last day of the year",
};
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
interface AnimalLike {
  eat(food): void;
}
interface CanBark {
  bark(): string;
}
// `implements` allows for multiple "contracts" or multiple interfaces
// You can use implements with types... but Mike doesn't like that too much since types don't need to work with objects... he uses implements only with interfaces
class Dog extends LivingOrganism implements AnimalLike, CanBark {
  bark() {
    return "woof";
  }
  eat(food) {
    console.log(food, "yum");
  }
  anotherProp = 5;
}

// Augmenting the window w/interface
window.document;
window.something = 5;
declare global {
  interface Window {
    something: number; // be explicit
    // [k: string]: any; // just expand without worrying
  }
}
// another opt...
(<any>window).myExtraProp; // seems to only work right here
// @ts-expect-error
window.anyPropTwo;
(window as any).MyNamespace; // for tsx

// Recursion
// - Nested array of numbers
type NestedNumbers = (NestedNumbers | number)[];
const nestedArr: NestedNumbers = [3, [1, 2], [4, 6, 7], 8];

// Making a JSON type
type JSONPrimative = number | string | null | boolean;
type JSONArray = JSON[];
type JSONObject = {
  [k: string]: JSON;
};
type JSON = JSONPrimative | JSONArray | JSONObject;

function isJSON(arg: JSON): void {}

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
isJSON(class {});
// @ts-expect-error
isJSON(undefined);
// @ts-expect-error
isJSON(new BigInt(143));
// @ts-expect-error
isJSON(isJSON);

// Functions
interface TwoNumberCalcInterface {
  (a: number, b: number): number;
}
type TwoNumberCalcType = (a: number, b: number) => number;
const add: TwoNumberCalcInterface = (a, b) => a + b;
const subtract: TwoNumberCalcType = (a, b) => a - b;

// void -> ignored doesn't mean it doesn't return ANYTHING but don't use it
// can return undefined... but use judicially ie values.push()... returns something... so does pop etc
function returnNothing(callback: () => void): void {
  setTimeout(callback, 5000);
}

// Construct signatures
// - What should happen with "new"
// - Does not happen often
interface DateConstructor {
  new (val?: number): Date;
}
let MyDateConstructor: DateConstructor = Date;
const d = new MyDateConstructor();

// Function Overloads
// - Feels a bit over-engineered to me...
// See - https://www.typescript-training.com/course/fundamentals-v3/09-functions/
// Here's another example... seems like people just want to get really picky on their types
// https://betterprogramming.pub/mastering-function-overloading-in-typescript-97108369570a
function foo(arg1: number, arg2: number): number;
function foo(arg1: string, arg2: string): string;
function foo(arg1: string | number, arg2: string | number) {
  return arg1 || arg2;
}

// ❎ x is of type string
const x = foo("sample1", "sample2");
// ❎ y is of type number
const y = foo(10, 24);

// ❌ Error: No overload matches this call
// @ts-expect-error
const a = foo(10, "sample3");
// ❌ Error: No overload matches this call
// @ts-expect-error
const b = foo("sample3", 10);

// This Types
// My implementation
const myButton = document.getElementsByTagName("button")[0];
function myClickHandler(this: HTMLButtonElement, event: Event): void {
  this.disabled = true;
}
myButton.addEventListener("click", myClickHandler);

// Mike's implementation
// Mike also brings up bind, call and apply... I haven't seen those in modern scripting except for bind... in which I see an arrow function more often to attach this
function mikesClickHandler(this: HTMLButtonElement, event: Event) {
  this.disabled = true;
}
mikesClickHandler;
mikesClickHandler.bind(myButton);
mikesClickHandler.call(myButton, new Event("click")); // also ok

// Classes
// public: seen
// private: not accessible by anything but self
// protected: self + subclasses
// Condensed version:
class Car {
  // Defined not in constructor
  public readonly yes = 5; // some other prop... cannot reassign ie like const
  private private = 5; // some other prop
  protected forSelfAndChildren = 5; // some other prop
  public name: string;
  #anotherPrivate = "hey";
  // So we don't need to define above first before setting this is the shorthand
  constructor(
    public make: string,
    public model: string,
    public year: number,
    moreInfo: string // just used inside constructor... maybe private?
  ) {
    this.name = `${make} ${model} ${year}`;
  }
}

const myCar2 = new Car("Honda", "Accord", 2017, "moreinfo");
myCar2.make;
myCar2.yes;
myCar2.name;

// Top Types
// `any` or `unknown`
// What's the diff...?
// - `unknown` asks for type guards
let myUnknown: unknown = 14;
// @ts-expect-error
myUnknown.it.is.possible.to.access.any.deep.property;
if (typeof myUnknown === "string") myUnknown.split("");

// Bottom Types
// Hold no possible value
// Exhaustive conditionals
// - Basically great for if/else or switch and come to a place it should be anything else... basically what I've done for some "default: " cases
class VehicleCar {
  drive() {
    console.log("vroom");
  }
}
class VehicleTruck {
  tow() {
    console.log("dragging something");
  }
}
class VehicleBoat {
  isFloating() {
    return true;
  }
}
type Vehicle = VehicleTruck | VehicleCar | VehicleBoat;

let myVehicle: Vehicle = Math.random() ? new VehicleBoat() : new VehicleCar();

// The exhaustive conditional
if (myVehicle instanceof VehicleTruck) {
  myVehicle.tow(); // Truck
} else if (myVehicle instanceof VehicleCar) {
  myVehicle.drive(); // Car
} else {
  // NEITHER!
  // @ts-expect-error
  const neverValue: never = myVehicle;
  if (neverValue) console.error("oops check your myVehicle instance type");
}

// Type guards and narrowing
// All the types you know and love...
// - instanceof, typeof, value check ===, true/false !, Array.isArray, check property

// User defined type guards
/* 
  - Write a function that check all props and does all the testing you want...
  - Then tell TS that it IS that type (TS must trust you)
  - Or you can use the stronger asserts + error throwing
*/
interface CarLike {
  make: string;
  model: string;
  year: number;
}

let maybeCar: unknown;

function isCarLike(valueToTest: any): valueToTest is CarLike {
  return (
    valueToTest &&
    typeof valueToTest === "object" &&
    "make" in valueToTest &&
    typeof valueToTest["make"] === "string" &&
    "model" in valueToTest &&
    typeof valueToTest["model"] === "string" &&
    "year" in valueToTest &&
    typeof valueToTest["year"] === "number"
  );
}

// using the guard
if (isCarLike(maybeCar)) {
  maybeCar;
}

// Non-null assertion operator
// `!.` - Mike likes for test suites not in prod code... so I'm just going to know it exists

// Definite assignment operator
// `!:` - also unlikely that I will use
// - probably best before something is initialized
