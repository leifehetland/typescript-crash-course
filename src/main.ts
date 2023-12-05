// ************ INTRO ************* //
const a = "1";

// Official Docs: https://www.typescriptlang.org/
// Confirm you have node installed
// npm install -g typescript
// Run tsc name_of_file

// Example of error
// because myfunc is not a method on a
// console.log("test", a.myfunc());
// Error is thrown when trying to transpile

// Run tsc name_of_file -w 
// to run in watch mode

// After setting up tsconfig.json
// only need to run tsc -w to run all files in src and transpile them into the dist


// ************ TYPE DEFINITIONS ************* //
// Variables in TypeScript
// Always specify types specifically
// colon datatype

let hello: string = "world";
let numOne: number = 1;
let priorityCustomer: boolean = true;
let students: object[] = [{name: "Dale"}, {name: "Sarah"}];

// ************ FUNCTIONS ************* //
// firstName is a string
// lastName is a string
// and the func returns a string
const getFullName = (firstName: string, lastName: string): string => {
	 return firstName + ' ' + lastName;
}

// This works
console.log(getFullName("Dale", "Cooper"));

// This doesn't due to type not matching
console.log(getFullName("Hiro", "Ono"));
// console.log(getFullName());


// ************ INTERFACES ************* //
// Properties in an interface are required/mandatory by default
// to override this, we use ?
// age is now optional

// prefix or postfix interface with an I to distinguish from class or function constructors
// IUser or UserInterface naming convention
interface UserInterface {
	name: string;
	age: number;
	getMessage(): string
}

const user: UserInterface = {
	name: 'Dale',
	age: undefined,
	getMessage() {
		return "Hello" + this.name;
	}
}

console.log(user.age);


// Typescript understands our objs by default
// const user: {name: string, age: number} = {
//     name: 'Dale',
//     age: 33
// }

// This errors out due to lack of age property
const user2: {name: string, age?: number} = {
    name: 'Hiro'
}

console.log(user2.name);


// Helps with autocomplete
// and if you typo, it will suggest similar property names on hover
// console.log(user.name);

// ************ UNION OPERATOR & TYPE ALIASES ************* //
let username: string = "Sarah";

// Union operator single |
let pageNumber: string | number = 1;

// often used to check null or undefined
// Null especially in the case of data that is coming from a server/API
let errorMessage: number | null = null;

// Type alias 
type ID = string;
type PopularTag = string;
// Custom type with Union operator
// type MaybePopularTag = PopularTag | null;
type MaybePopularTag = string | null;

interface ProfileInterface {
	name: ID;
	age?: number;
	getMessage(): string
}

const popularTags: ID[] = ["anime", "games", "film"]

let profile: ProfileInterface | null = null;

// ************ any, never, void, and unknown types ************* //
// void
// When we don't return something the return is void
// Is a set of undefined and null
const doSomething = (): void => {
	console.log("doSomething");
}

// any
// all TypeScript checks are turned off
// avoid using if using Typescript
let foo: any = "foo";

// never
// a function that would never end
const doSomethingElse = (): never => {
	throw 'never';
}

// unknown
// showed up in TypeScript 3
// we can't assign unknown directly in another type
let vAny: any = 10;
let vUnknown: unknown = 10;

let s1: string = vAny;
// This errors
// let s2: string = vUnknown;
// with Type Assertion works
let s2: string = vUnknown as string;

let houseNumber: string = "4565"
// Errors out
// let numericHouseNumber: number = houseNumber as number;
// Works
let numericHouseNumber: number = (houseNumber as unknown) as number;


// console.log(vUnknown.foo());

// Type Assertion

// ************ WORKING WITH DOM ************* //
// TS doesn't know anything about our markup
// Use as to define the correct type of our DOM elements
// const someElement = document.querySelector(".foo") as HTMLInputElement;

// We don't get an error on .value due to telling the querySelector we are selecting an HTMLInputElement
// console.log("someElement", someElement.value);

// Event Listeners
// someElement.addEventListener('blur', (event) => {
// 	const target = event.target as HTMLInputElement;
// 	console.log("event", target.value);

// })

// ************ CLASSES IN TYPESCRIPT ************* //

interface IUser {
	getFullName(): string;
}

// By enforcing an interface on the class
// it must have a getFullName method
class User implements IUser {
	private firstName: string
	private lastName: string
	readonly unchangeableFact: string
	// A static readonly property that is accessible on the class not the obj
	// Example console.log(User.maxAge)
	static readonly maxAge: number = 50

	constructor(firstName: string, lastName: string) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.unchangeableFact = "is cool!"
	}

	getFullName(): string {
		return this.firstName + ' ' + this.lastName
	}
}

class Admin extends User {
	private editor: string

	setEditor(editor: string): void {
		this.editor = editor
	}

	getEditor(): string {
		return this.editor
	}
}

// Everything is public by default
// private, public, or protected
const userAcct = new User("Dale", "Cooper")

// Errors
// userAcct.firstName
// Only getFullName is accessible
// userAcct.getFullName()

// with protected we can use properties or methods in children via prototypal inheritance

// readonly property can't reassign properties

// ************ GENERICS IN TYPESCRIPT ************* //
// All generic data types are written inside <>
// extends object enforces that argument must be an object
// Big T is a default name for a generic
const addId = <T extends object>(obj: T) => {
	const id = Math.random().toString(16)

	return {
		...obj,
		id
	}
}

// To make an interface generic we add <> after name, T and V 
interface NewUserInterface<T, V> {
	name: string;
	data: T;
	meta: V;
}

// Telling TS that T is an obj with a string property called meta
const newUser: NewUserInterface<{ meta: string }, string> = {
	name: "Sarah",
	data: {
		meta: "some string"
	},
	meta: "hey"
}

// Generics allow us to provide different data types, string array vs obj with string property
const newUser2: NewUserInterface<string[], string> = {
	name: "Sarah",
	data: ["a", "b", "c"],
	meta: "hi"
}

// Explicit declarations are easier to read
// const result = addId<NewUserInterface>(newUser)
const result = addId(newUser)
console.log(result);


// <T> means we can provide different datatypes

// ************ ENUMS IN TYPESCRIPT ************* //
// const statuses = {
// 	notStarted: 0,
// 	inProgress: 1,
// 	done: 2
// }

// Have default values, but can be assigned
// uses equals instead of colon
// prefix or postfix your enums
enum StatusEnum {
	NotStarted = "notStarted",
	InProgress= "inProgress",
	Done= "done"
}

interface Task {
	id: string;
	status: StatusEnum;
}

let notStartedStatus: StatusEnum = StatusEnum.NotStarted;

console.log(notStartedStatus);

// Values start at 0 and count up
console.log(StatusEnum.InProgress);
