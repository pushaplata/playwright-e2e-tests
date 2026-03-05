import { test, expect } from "@playwright/test";

test.describe("Invenrty feature", () => {
  test.beforeEach("Launching the application", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
  });

  test("Should verify all price are non-zero values", async ({ page }) => {
    let prodeElements = page.locator(".inventory_item")
    await expect(prodeElements).toHaveCount(6);

    let prodNameAndPrice = await prodeElements.count();
    let priceArr = [];
    for(let i=0; i < prodNameAndPrice; i++){

        let eleNode = prodeElements.nth(i)

        //product Name 
        let prodName = await eleNode.locator('.inventory_item_name').innerText();
        //product Price
        let prodprice = await eleNode.locator('.inventory_item_price').innerText();

        console.log(`Product Name: ${ prodName}  Price: ${ prodprice}`);

        priceArr.push(prodprice);
        
    }  

    console.log(`All prices are: ${priceArr}`);

    /**
     * $29.99,$9.99,$15.99,$49.99,$7.99,$15.99
     * Replace $ sign with "" price and convert string to float
     * comapre the price should be > 0
     */
   
    let modifiedPriceNUm = priceArr.map((item) => parseFloat(item.replace("$", "")));
    console.log(`Modified prices are: ${modifiedPriceNUm}`);

    let pricearrWithInvalidBal = modifiedPriceNUm.filter((item) => item <=0)

    if(pricearrWithInvalidBal.length > 0){
        console.log(`ERRER: There are invalid prices which are zero or less than zero: ${pricearrWithInvalidBal}`);
    }else{
        console.log(`INFO: All prices are valid and greater than zero`);
    }

   expect(pricearrWithInvalidBal).toHaveLength(0);

   
  });

   test("Should add first item in the cart", async ({ page }) => {
    let prodeElements = page.locator('.inventory_item').nth(0);
    await prodeElements.getByText('Add to cart').click();
    await page.locator('.shopping_cart_badge').click();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await page.locator('[data-test="checkout"]').click();
    
    //Fill the checkout info
    await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('john');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('doe');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('234');
  await page.locator('[data-test="continue"]').click();

  //Verify the payment info, shipping info and total price
  await expect(page.locator('[data-test="payment-info-value"]')).toBeVisible();
  await expect(page.locator('[data-test="shipping-info-value"]')).toBeVisible();
  await expect(page.locator('[data-test="total-label"]')).toBeVisible();
  
  //Finish the order
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
  await page.locator('[data-test="back-to-products"]').click();



    

  })


    });




