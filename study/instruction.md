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
