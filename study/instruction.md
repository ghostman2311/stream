# 19 June

## Buffer

1. First example, It shows basic functionality of using buffer. See Below code will throw an error because we are out of range. It allocates 5 bytes from operating system.
   ![alt text](image.png)

2. This example demonstrates

   1. How can we copy from one buffer to another buffer.
   2. How buffer ignore the character
   3. ![alt text](image-1.png)

3. If we want to allocate dynamically
   ![alt text](image-2.png)

4. We can achieve the same thing using `Buffer.from`
   ![alt text](image-3.png)

5. Converting chars to hexa decimal and decimal. We can work with hexadecimal, ascii code with buffer.
   ![alt text](image-4.png)
   ![alt text](image-5.png)

6. To generate the 1 to 100 sequence in node js and store it in text.txt file

- `for i in `seq 1 100`; do node -e "process.stdout.write('$i-hello world\n')" >> text.txt; done`

7. How to process data in chunks
   1. ![alt text](image-6.png)
   2. ![alt text](image-7.png)

## Streams

1. Change the script
   ![alt text](image-8.png)

2. Read the file and see what happen
   ![alt text](image-9.png)

3. Consuming data example
   ![alt text](image-10.png)

4. Consuming all data example
   ![alt text](image-11.png)

5. Create stream type.mjs file(18.28)

   1. ![alt text](image-12.png)
   2. Usually we don't create readable from scratch

6. Transforming readable stream from one form to another
   ![alt text](image-13.png)
   ![alt text](image-14.png)

## Duplex

1. Basic example using duplex
   ![alt text](image-15.png)
   ![alt text](image-16.png)

2. Implementing read function in above duplex
   ![alt text](image-17.png)
   ![alt text](image-18.png)

3. create duplex-broadcast.mjs
   ![alt text](image-19.png)
   ![alt text](image-20.png)
   ![alt text](image-21.png)
   ![alt text](image-22.png)

# 20 June

## Chat app

1. Create server.mjs and client.mjs.
2. Create server.mjs like this
   1. ![alt text](image-23.png)
   2. ![alt text](image-24.png)
   3. ![alt text](image-25.png)
3. How it is different from app.listen in express js

   1. ![alt text](image-26.png)
   2. ![alt text](image-27.png)

4. What is difference between http server and tcp server?

   1. ![alt text](image-28.png)
   2. ![alt text](image-29.png)

5. Add this code in client.mjs

   1. ![alt text](image-30.png)

6. Add this code on server
   1. ![alt text](image-31.png)
   2. We are just assigning id to client and store it in map.
   3. Whenever client closes the connection we removed it from map.
7. Create log function like this on client
   ![alt text](image-32.png)

8. Create Writable stream in client like this
   ![alt text](image-33.png)

9. Create streamBroadcaster and notifySubscriber function
   ![alt text](image-34.png)

10. On frontend just use passthrough like this
    ![alt text](image-35.png)

# 4 July

## Pipe vs pipeline

1. Create big file
   // node -e "process.stdout.write('hello world'.repeat(1e7))" > big.file

2. Create server and read the big file like this
   ![alt text](image-36.png)

3. run the server and send curl request `curl localhost:3000`
4. Using pipe we can consume parital data.
5. This is the example using pipeline
   ![alt text](image-37.png)
