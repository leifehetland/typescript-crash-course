const a = "1";

// Run tsc name_of_file

// Example of error
// because myfunc is not a method on a
console.log("test", a.myfunc());
// Error is thrown when trying to transpile

// Run tsc name_of_file -w 
// to run in watch mode
