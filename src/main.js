// ************ INTRO ************* //
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var hello = "world";
// ************ FUNCTIONS ************* //
// firsName is a string
// lastName is a string
// and the func returns a string
var getFullName = function (firstName, lastName) {
    return firstName + ' ' + lastName;
};
// This works
console.log(getFullName("Dale", "Cooper"));
var user = {
    name: 'Dale',
    age: 33,
    getMessage: function () {
        return "Hello" + this.name;
    }
};
// // Typescript understands our objs by default
// const user: {name: string, age: number} = {
//     name: 'Dale',
//     age: 33
// }
// This errors out due to lack of age property
// const user2: {name: string, age: number} = {
//     name: 'Hiro'
// }
// Helps with autocomplete
// and if you typo, it will suggest similar property names on hover
// console.log(user.namee);
// ************ UNION OPERATOR & TYPE ALIASES ************* //
var username = "Sarah";
// Union operator single |
var pageNumber = 1;
// often used to check null or undefined
// Null especially in the case of data that is coming from a server/API
var errorMessage = null;
var popularTags = ["anime", "games", "film"];
var profile = null;
// ************ any, never, void, and unknown types ************* //
// void
// When we don't return something the return is void
// Is a set of undefined and null
var doSomething = function () {
    console.log("doSomething");
};
// any
// all TypeScript checks are turned off
// avoid using if using Typescript
var foo = "foo";
// never
// a function that would never end
var doSomethingElse = function () {
    throw 'never';
};
// unknown
// showed up in TypeScript 3
// we can't assign unknown directly in another type
var vAny = 10;
var vUnknown = 10;
var s1 = vAny;
// This errors
// let s2: string = vUnknown;
// with Type Assertion works
var s2 = vUnknown;
var houseNumber = "4565";
// Errors out
// let numericHouseNumber: number = houseNumber as number;
// Works
var numericHouseNumber = houseNumber;
// console.log(vUnknown.foo());
// Type Assertion
// ************ WORKING WITH DOM ************* //
// TS doesn't know anything about our markup
// Use as to define the correct type of our DOM elements
var someElement = document.querySelector(".foo");
// We don't get an error on .value due to telling the querySelector we are selecting an HTMLInputElement
console.log("someElement", someElement.value);
// Event Listeners
someElement.addEventListener('blur', function (event) {
    var target = event.target;
    console.log("event", target.value);
});
// By enforcing an interface on the class
// it must have a getFullName method
var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.unchangeableFact = "is cool!";
    }
    User.prototype.getFullName = function () {
        return this.firstName + ' ' + this.lastName;
    };
    // A static readonly property that is accessible on the class not the obj
    User.maxAge = 50;
    return User;
}());
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Admin.prototype.setEditor = function (editor) {
        this.editor = editor;
    };
    Admin.prototype.getEditor = function () {
        return this.editor;
    };
    return Admin;
}(User));
// Everything is public by default
// private, public, or protected
var userAcct = new User("Dale", "Cooper");
// Errors
// userAcct.firstName
// Only getFullName is accessible
// userAcct.getFullName()
// with protected we can use properties or methods in children via prototypal inheritance
// readonly property can't reassign properties
// ************ GENERICS IN TYPESCRIPT ************* //
// All generic data types are written inside <>
// extends object enforces that argument must be an object
var addId = function (obj) {
    var id = Math.random().toString(16);
    return __assign(__assign({}, obj), { id: id });
};
// Telling TS that T is an obj with a string property called meta
var newUser = {
    name: "Sarah",
    data: {
        meta: "some string"
    },
    meta: "hey"
};
// Generics allow us to provide different data types, string array vs obj with string property
var newUser2 = {
    name: "Sarah",
    data: ["a", "b", "c"],
    meta: "hi"
};
// Explicit declarations are easier to read
// const result = addId<NewUserInterface>(newUser)
var result = addId(newUser);
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
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["NotStarted"] = "notStarted";
    StatusEnum["InProgress"] = "inProgress";
    StatusEnum["Done"] = "done";
})(StatusEnum || (StatusEnum = {}));
var notStartedStatus = StatusEnum.NotStarted;
// Values start at 0 and count up
console.log(StatusEnum.InProgress);
