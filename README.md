<br/><br/>
<br/><br/>

<p align="center">
    <img height="50" src="https://rooftop.dev/images/rooftop-logo.webp">
   </p>

   <h1 align="center">Bakend - Rooftop Challenge</h1>
   
  
## The challenge
You will have to build a microservice that is in charge of managing the information of promotions, coupons and stores.

For this we provide you with an SQL script that has the structure and data of 2 tables. 
Your responsibility will be to build a REST API through HTTP and use the information provided through the ORM

In the provided script the database contains the following structure:

The coupons table with the columns id, code, expires_at, assigned_at, customer_email

The stores table with the columns id, name, address that are all the data of the stores.

The REST API that you will develop must offer 3 resources:
- Coupons
- Stores
- Statistics (optional)

### Coupons

Coupons table contains all the coupons that were created.

Code column is the coupon itself.

In case a coupon has been assigned to a customer, it will have an email in the customer_email column.

The email must appear only 1 time in the entire table, since a client cannot receive more than one coupon.

When a customer claims a coupon, the assigned_at field is filled in with the date when it was made.

Each coupon has an effective date until the date indicated in expires_at

You must create an endpoint for coupons, which only accepts the following requests:

- GET
  - Lets check if a coupon corresponds to an email
  - The parameter "email" and "coupon code" must be required in the query string
  - With both parameters you must search the database
  - Return status code 200 if found, otherwise return 404
  
- POST
  - The coupon code is required to create a new coupon
  - The coupon must have an exact total of 8 characters between letters and numbers
  - Show a code 201 if coupon was created correctly
  - Send a 422 code if an error occurred

- PATCH
  - User's email is required to assign it to an existing coupon
  - Validate email format
  - Validate that the same email has not previously generated another coupon
  - Return 201 code if success and return 422 with error messages in case of error 
  
- DELETE
  - You can unsubscribe a coupon by passing it the id as a parameter in the url
  - It is only possible to delete a coupon that has not been assigned to a customer
  - If it was deleted, return code 201
  - If the code is not valid or does not exist, return 404
  
### Stores
The "stores" resource accepts the following methods:

- GET
  - You must return a list of all stores
  - You must page 10 results per page
  - Include in the response the total number of existing stores
  - Allow search for stores using the "name" attribute in the query string
- POST
  - Allows you to register new stores
  - It must be validated that the name and address are complete
  - Use the corresponding response codes
- DELETE
  - You can unsubscribe a store by passing the id as a parameter in the url
  
###  Stats (optional)
You can create a 3rd resource that returns historical and statistical information

- GET
  - Returns an object that summarizes:
  - Total amount of existing coupons
  - Total amount of coupons assigned
  - Total amount of unassigned coupons
  - Total number of coupons created per day
  - Total amount of coupons assigned per day
  

## Project

### Tools

- Node js
- Express
- Typescript

### Project Structure
The files are structured as follow:

    ├── docs          
    ├── examples 
    ├── src
        ├── controllers          
        ├── entities     
        ├── interfaces          
        ├── routes 
        ├── services            
        index.ts
    └── README.md            # The first page that the user will view when will visit the repository.
    

### Commits convention

To commit the changes, the conventional commits convention was followed. That is:

commit format:

    <type>[optional scope]: <description>
    
Conventional commit names

    feat: (new feature for the user, not a new feature for build script)
    
    fix: (bug fix for the user, not a fix to a build script)
    
    docs: (changes to the documentation)
    
    style: (formatting, missing semi colons, etc; no production code change)
    
    refactor: (refactoring production code, eg. renaming a variable)
    
    test: (adding missing tests, refactoring tests; no production code change)
    
    chore: (updating grunt tasks etc)

## Requirements
* npm or yarn
* Git

## Local deployment
* Clone repository.
* Execute the command `npm install`
* Execute the command `npm run dev`

## Additional

Database schema was modified.
* Import database in Postgres
* Execute script provided in docs
