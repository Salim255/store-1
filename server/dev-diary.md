# Refresher

## How the web works?

### Whats does happen each time we type a URL in our browser ?

- Our browser sends a request to the server where the web is hosted
- The server then send back a response, contain the web page that we requested
- The above process. called request response model or Client Server architecture

### DNS: domain name server

- Its special server, like the phone-books of the internet
- The first step when we we open up browser with a url, the browser makes a request to a DNS
- Then the DNS server will match the URL that we typed to real IP (internet protocol) address

### TCP/IP socket connection

- Once we have the real web address from the DNS, A TCP socket connection is established between the browser and the server, and this connection is typically kept alive for the entire time it takes to transfer all the files of the website

#### Whats TCP/IP ?

- TCP: Transmission Control Protocol:
  - Its job is to break out the requests and responses into small chunks called packets before they are sent
  - Then once the get to their destination, it will reassemble all the packets into the original request or response, so that the messages arrives at the destination as quick as possible
- IP: Internet protocol:
  - The job of the IP protocol is to send and route all the packets through the internet
  - Its ensure that all of them arrive at the destination
- Together, they are transmission protocols that define how data travels across the web (are internet fundamental control rules)

### HTTP Request

- HyperText: stand for beyond the text
- HTTP stand for HyperText Transfer Protocol
- HTTP is a set of rules allows two or more parties to request and receive HyperText from a web server

#### The request message contain?

- Start line : GET/maps HTTP/1.1
  - HTTP method(GET) + request target or resources (/maps) + HTTP version(1.1)
- Request Header: Which is just some information that we send about the request itself like: Host: www.google.com, User-Agent: Mozila/5.0, ...
- Body: the request body (only when sending data to server, e.g POST), like form data

#### HTTP/HTTPS

- The HTTPS is encrypted using TLS or SSL protocol

### HTTP response

- Http response quite similar to the HTTP request by having, start line, header and body, the body will be the wanted response HTML requested web, or json data from API

# Nodejs

- Node is Javascript run time based on Google's V8 engine
- If wasn't for V8, Node would never understand the javascript code we write
- So for that V8 is fundamental part in the Node architecture

## Node dependencies

- Node dependencies are just a couple of libraries that Node depends on in order to work properly.
- So the node runtime. has several dependencies and the most important ones are the V8(mumbles) engine and libuv.

### V8 engine?

- Use C++ beside Javascript
- Its what convert the javascript code into machine code that a computer can actually understand

### LibUV?

- LibUV is an open source library with a strong focus on asynchronous IO
- This layer is what gives Node access to the underlying computer operating system, files system , networking and more.
- Also libuv implement two important features of Node.JS which are:
  - The vent loop
  - thread pool
- Its written in C++

#### Event loop feature?

- Is responsible for handling easy tasks like executing call backs and network IO

#### Thread Pool?

- Is responsible for handling heavy work like file access or compression ...

## Node Process And Threads

### NodeJs Process

- When we use node in our computer, means that there are a Node process running on our computer
- Process is just a program in execution
- In that process, Node runs in a so called , single thread

### Single Thread

- A thread is just a sequence of instructions
- Imagine a thread like a box where our code is executed in computer processor
- The Node runs in just one single thread, which makes it easy to block a Node applications
- No matter if you have 10 user or 10 million users, accessing your application at the same time

### Event loop?

- When we start Node application, after the program initialized and all the top level code is executed (all the code that not inside a callback functions) and after all the modules that your application need are required and after the callbacks functions are registered, then finally the vent loop start running.
- The event loop is where most of the job done in the node application
- To avoid blocking the single thread when there are heavy work on the event loop we use thread pool (second feature from libuv)
- The event loops is all the application code that is inside callback function is executed, basically, its all code that not top level code will run in the event loop
- The event loop is the heart of the node architecture
- Node js is all built around callback functions
- Receiving HTTP request on server or time expiring, or file finishing reading to read, all these will emit events as soon as they ae done their work, and our event loop will then pick up these events and call the callback functions that are associated with each event
- The event loop receives events each time something important happens, and then call the necessary callbacks.
- In summery, the event loop does the orchestration, means that it receives events calls their callback functions, and offload the more expensive tasks to the thread pool

#### In which order the callbacks executed?

- When we start our Node application, the event loop starts running right away, and the event loop has multiple phases, and each phase has a callback queue, which are the callback coming from the events that the callback receives

##### The four most important event loop phases are ?

- 1. Expire timer callback, like setTimeout():
  - So if there are callback function from timers that just expired, these are the first ones to be processed by the event loop
- 2. I/O pulling execution of I/O callbacks:
  - So polling means looking for new I/O events that are ready to be processed and putting them into the callback queue
  - I/O in Node application means Networking and files access.
- 3. Set immediate callback:
  - Its special kind of timer we can use if we want to process callback immediately after I/O pulling or execution phase
- 4. Close callbacks:
  - In this phase, all close events are processed, for example when web server or a websocket shut down
- 5. nextTick() queue
- 6. microtasks queue, 5, 6 queue are for resolved promises and they are runs after the first 4 phase finished instead fo waiting fot the entire loop to finish. Means if there are any callbacks in this two special queues, they will be executed right away after the 4 phase

##### How to avoid block the vent loop?

- 1. Don't use the sync version of functions in the fs, crypto or zlib modules in your callback functions.
- 2. Don't perform complex calculation in event loop
- 3. Be careful with JSON in very large object, because it may takes long time to parse or stringify JSON
- 4. Don't use to complex regular expressions, for example with multiple nested qualifiers, they can a take longer than expected

#### Thread pool?

- The thread pool give us more additional four threads are separate from the main thread, and we can configure it to 128 threads.
- And those threads together form thread pool
- So event loop can then automatically offload heavy tasks to the thread pool to avoid blocking th mains thread
- We can change the thread pool size by:
  - process..env.UV_THREADPOOL_SIZE = X

## Nodejs Streams

- With streams we can process read and write data piece by piece without completing the whole read or write operation. There are for we don't have to keep all the data in memory to do these operations.
- In Nodejs there are four fundamentals types of streams:
  - 1. Readable streams:
    - Are the one form which we can read(consume data)
    - The data that sent with http request are readable stream. So all the data that sent with the request comes in piece by piece and not in one large piece
    - its events are:
      - data()
      - end
    - its functions are:
      - pipe()
      - read()
  - 2. Writable streams
    - The response that we send back to the client is its writeable stream
    - Its events are:
      - drain
      - finish
    - its functions are:
      - write()
      - end()
  - 3. Duplex streams:
    - They're streams that are both readable and writeable at the same time, like websocket from node module
  - 4. Transform streams:
    - They are duplex streams, and can transform or modify data as its read or written
    - Example of this one is the zlib core module to compress data
- The readable and the writable are the most important ones
- Streams are everywhere in the core Node modules.

# MongoDB

- MongoDB is NoSQL database
- MongoDB is document database(store data in document, field-value paired data structure like JSON), with the scalability and flexibility that needed with querying and indexing that you need.
- The tables in MongoDB called collections
- Every table or collection contain one or more data structure called document which are rows in SQL database
- It store data in document instead of rows and tables like in traditional databases
- MongoDB has built-in scalability, making it very easy to distribute data across multiple machines as your apps get more and more users.
- MongoDB makes it very easy to grow
- Its great flexibility, so no need to define a document data schema before filing it with data
- A document can have a different number and type of fields, and we can change this fields at anytime
- Its very performant database system
- Its free and open source database
- its the most used database with Nodejs
- MongoDB use data format similar to JSON for data storage called BSON, its same as JSON but its typed
- The maximum size for each document is currently 16MB

## Mongoose ?

- Mongoose is an object data modeling (ODM) library for MongoDB and Nodejs, a heigh level of abstraction
- Data modeling library, its just a way of writing JavaScript code that interact with database
- Allowing for faster and simple development of our applications

### Mongoose features:

- 1. Schema to model our data relationship
  - Schema in mongoose is a schema where we model our data or where we describe the structure of the data default value and validation, then we take that schema and create model out of it.
  - Model is a wrapper around the schema, allows us to interact with the database in order to create, delete, update, and read documents
- 2. Easy data validation
- 3. Simple query API
- 4. Middleware...
- Finally Mongoose is all about model, and a model is like a blueprint that we use to create document, its a bit like class in JavaScript
- So we create model in mongoose in order to create document using it and to perform the CRUD operation on that document and in order to create a model we need a schema
- We create models out of mongoose schema

# How Requiring Modules works?

- Each JavaScript file is treated as a separate module
- Nodejs uses the CommonJS module system: require(), exports or module.exports
- ES or ECMA script module system is used in browsers(frontend): import/export
- There have been attempt to bring ES modules to node.js(.mjs)

## require function architecture

- What happens each time that we require a module by calling the require function with the module name?
  - 1. Resolving & Loading: First the path to the required module is resolved and the file is loaded
  - 2. Wrapping: wrapping the module in a function
  - 3. Execution: the module code is executed
  - 4. Returning Exports: the module exports are returned
  - 5. Cashing:the entire module get cashed and in subsequent calls, the result is retrieved from the cache.

### How does node knows which file to load when we require a module ?

- Node can load three kinds of modules:
  - 1. Node's core module
  - 2. Developer module(our own module)
  - 3. Thirst party module (npm module) like express
- how Node resolving the filepath ?
  - 1. It will first try to load core module with the given name
  - 2. If the path start by ./ or ../ it will try developer module, but if there is no file with the given name, then it will look for a folder instead and load index.js if its in the folder
  - 3. Finally which means that the required module neither a core module or developer module, Node will assume that it's a module from npm, so node will step into the module folder and try to find a module there and then load it, and if there is no file, an error will be thrown and the execution will stop

### Wrapping ?

- The module code is wrapped into a special function which will give us access to couple of special objects. then we get access require object, exports object, module reference to the current module, **filename and **direname variable are contain the absolute path to the current module's file and as well the current directory, they are like global variables inject in each module.
- Each module has its private scope to avoid overridden local variables

### Returning Exports ?

- Require function return exports of the required module
- module.exports is the returned object

### When to use module.export and when export ?

- To export one single variable or class or function:
  - we use module.exports = x
- If you are looking to export multiple named variables like multiple functions, for example:
  - exports.add =(a, b) => a+b

# 🔓 Security Best Practices

## Attack types

- 1. Compromised Database:
  - Means the attacker gained access to our database
  - To prevent it?:
    - 1. Strongly encrypt passwords with salt adn hash (bcrypt)
    - 2. Strongly encrypt password reset token (SHA 256)
- 2. Brute Force Attacks:
  - Where the attacker tries to guess the password, by trying millions of random passwords
  - To prevent it?:
    - 1. Use bcrypt (to make the login request slow)
    - 2. Implement rate limiting (express-rate-limit), to limits number of requests come from one single IP
    - 3. Implement maximum login attempts, fro example after 10 failed attempts, user would have to wait for one hour before can try again

- 3. Cross Site Scripting (XSS) Attacks
  - Where the attacker tries to inject scripts into our pages to run his malicious code. On the Client side.
  - Its dangerous because allows the attacker to read the local storage, which why we should never store JSON web token in local storage. Instead, it should be stored in HTTP-only cookie that makes it so that the browser can only receive and send the cookies but can't access, read or modify it in any way
  - To prevent it ?:
    - 1. Store JWT in HTTPOnly cookies
    - 2. Sanitize user input data
    - 3. Set special HTTP headers (helmet package)

- 4. Denial Of Service (DOS) Attacks
  - Its happens when the attacker sent many requests to the server to break it down and the application become unavailable
  - To prevent it ?:
    - Implementing rate limiting (express-rate-limit)
    - Limit body payload (in body -parser)
    - Avoid evil regular expression in pour code:
      - Its just regular expression that takes an exponential time to run for no matching input, then they can be exploited to bring our application down
- 5. NoSQL Query Injection Attack
  - Its happen when the attacker injects some query in order to create query expressions that are gonna translate to true. For example to be logged in even without providing a valid username or password
  - How to prevent ?
    - 1. Use mongoose for MongoDB(because of Schema types):
      - Because a good schema force each value to have a well defined data type
    - 2. Sanitize user input data

## 👉 Other Best practices

- ✅ Always use HTTPS
- ✅ Create random (not generate from date) password reset token with expire dates
- ✅ Deny access to to JWT after password change (revoke the token as soon as the user change the password)
- ✅ Don't commit sensitive config data to Git
- ✅ Don't send errors details to clients
- ✅ Prevent Cross-Site request Forgery(csur package):
  - Which an attack that force the user to execute unwanted actions on a web application in which they are currently logged in
- ✅ Require re-authentication before a heigh value action
- ✅ Implement a blacklist of untrusted JWT:
  - We create list of untrusted tokens based on there holder activities and then validate them with each request
- ✅ Confirm user email address after first creating account
- ✅ Keep user logged in with refresh tokens
- ✅ Implement two-factor authentication
- ✅ Prevent parameters pollution causing Uncaught Exception:
  - FOR EXAMPLE if i try inserting two field parameters in to the query string that search for all products, there will be an error because our application is not prepared for that. And attacker can use these kinds of weaknesses to crash application
