# expressjs-discount-code-symetra
 
To run:

- Clone repo
- Install Node Packages: npm i
- Setup Environment Variables (optional): The .env file contains environment variables. The default port is 3000, change this if you desire.
- Run Server: npm start (compiles Typescript and moves static assets)
- Visit localhost:3000 in browser

Requirements (as provided):
- Store owner gives out discounts to every nth transaction
- Customers, as they login, get to see if they have discount and the appropriate discount code
- Customers can then purchase items using the discount code if available
- The store owner reviews at various times what the count of purchases that were made
- The store owner reviews at various times the total count of discounts that were given out
- Stretch: Develop a simple UI with different pages for admin and customer

Additioal Goals/Assumptions:
- A more complete UI with a store front to browse products, a shopping cart, and make purchases
- A detailed collection of products with names, prices and images
- Authenication included although the sign-in process is streamlined in the UI (dropdowns for customer or admin)
- Admin APIs are protected against customers and non-signed-in users
- Customer APIs are protected against non-signed-in users
- Product prices reflect discount code offer in UI
- Produces show their original price before discount in the UI (store front and cart)
- More detailed "Store and purchase report" in the admin portal showing values like transations and sales figures
- Once a discount code is used in a transaction, it is no longer available for the remainder of the customer's session
- Customers remain logged into the store after a purchase and can purchase further items
- The admin can clear a currently active discount code campaign
- When the admin sets a new discount code campaign, it resets the count of the "nth customer" if replacing an existing campaign
- Included TSLint during development process for static analysis