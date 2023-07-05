import express from "express";

const app=express()

app.listen(3000);


app.listen(8080, () => {
    console.log("Backend server is running!");
  });