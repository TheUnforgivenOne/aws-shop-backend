const encode = (str) => {
  const encodedStr = Buffer.from(str).toString('base64');
  console.log(encodedStr);
}

encode(process.argv[2]);
