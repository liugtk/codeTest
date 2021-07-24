# code Test guide

### Scope:

Due to the time limit, this repository only developed the backend code.

align with the requirements, it fulfilled following from backend API:  

- display a list of device
- add or remove device
- check-in/check-out device
- post feedback on device
- throw error when checkout a device that is already checked-out
- checkout time in time frame of 9:00am to 17:00pm

missing parts:

- indicate a device that is checked out for more than a week
- max number device of 10
- each person can only check out a device at a time.

---

### How to run the code

step1: install the required software

- NodeJS:  https://nodejs.org/en/download/
  - the version used in my dev env is v10.16.3, but most likely the latest stable version should also work
- mongo database: https://www.mongodb.com/try/download/community
  - the version used in my dev env is 4.2. most likely, the latest stable version should also work

step2: install dependences

once NodeJS is installed, go to `backend/` folder. run:

```shell
npm install
```

step3: run the program

- run `mongod` with default setup with port at 27017 without username and password
- go to `backend/` and run `node index.js`

---

### How to test

##### check the program is running, open: http://localhost:3000/

##### check functionality: 

To easy the progress of testing, a postman collection is given in the repo.

You can download postman from: https://www.postman.com/downloads/

once installed and open, import the postman collection. you can directly hit the API and test the functions. 

e.g.:

![image-20210724150220619](imgs\image-20210724150220619.png)