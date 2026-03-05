import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";

test.beforeAll("before all test once at file level", () =>{
    console.log("This is before all tests"); //Should run onec before per worker. 1x

});
test.beforeEach("before each test at file level", () =>{
    console.log("This is before each test file level"); //Should run before all the test in file. 6x
});

test.describe("Hookes Demo", () => {
    
    //before All
    test.beforeAll("before all tests in describe 1", () =>{
        console.log("This is before all tests in describe"); //Should run once before all tests in describe block 1x
    });
    
    //before Each test
    test.beforeEach("before each test in describe 1", () =>{
        console.log("This is before each test in describe"); //Should run before each test in describe block 3x
    });

    test("First Test", async ({page}) =>{
        console.log("This is first test");
    });

    test("Second Test", async ({page}) =>{
        console.log("This is second test");
    });

    test("third Test", async ({page}) =>{
        console.log("This is third test");
    });

});

test.describe("Hookes Demo", () => {
    
    //before All
    test.beforeAll("before all tests in describe 2", () =>{
        console.log("This is before all tests in describe"); //Should run once before all tests in describe block 1x
    });
    
    //before Each test
    test.beforeEach("before each test in describe 2", () =>{
        console.log("This is before each test in describe"); //Should run before each test in describe block 3x
    });

    test("First Test 1", async ({page}) =>{
        console.log("This is first test");
    });

    test("Second Test 2", async ({page}) =>{
        console.log("This is second test");
    });

    test("Third Test 3", async ({page}) =>{
        console.log("This is third test");
    });

});


    

