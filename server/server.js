const express = require("express");
const app = express();
const cors = require("cors");
// const Users = require("./models/usersModel");
const mongoose = require("mongoose");
const students = require("./router/Route");

// app.use(express.json());
// app.use(cors());

const Url = "mongodb://localhost:27017/frequentresearch";

mongoose
  .connect(Url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Coneected");
  })
  .catch((error) => console.log(error.message));

app.use(express.json());
app.use(cors());
app.use(students);

// app.get("/", async (req, res) => {
//   try {
//     const response1 = await axios("https://jsonplaceholder.typicode.com/users");
//     const response2 = await axios("https://jsonplaceholder.typicode.com/posts");
//     const data1 = response1.data.map((a) => a);
//     const data2 = response2.data.map((b) => b);

//     const data3 = data1.map((item) => {
//       const res = data2.map((item) => item).filter((r) => r.userId == item.id);
//       console.log(item);
//       return { ...res, ...item };
//     });

// const data3 = [...data1, ...data2];

// const merge = (data1, data2) => {
//   const temp = [];

//   data1.forEach((x) => {
//     data2.forEach((y) => {
//       if (x.id === y.userId) {
//         temp.push({ ...x, ...y });
//       }
//     });
//   });

//   return temp;
// };

// console.log(merge(data1, data2));

// const a1 = [
//   { id: 1, name: "test" },
//   { id: 2, name: "test2" },
// ];
// const a2 = [
//   { id: 1, count: "1" },
//   { id: 1, count: "4" },
//   { id: 2, count: "2" },
//   { id: 2, count: "8" },
// ];

// const merge = (arr1, arr2) => {
//   const temp = [];

//   arr1.forEach((x) => {
//     arr2.forEach((y) => {
//       if (x.id === y.id) {
//         temp.push({ ...x, ...y });
//       }
//     });
//   });

//   return temp;
// };

// console.log(merge(a1, a2));

//     res.status(200).json({ success: true, data: data3 });
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// app.get("/post", async (req, res) => {
//   // let id = "userId"
//   try {
//     const response = await axios("https://jsonplaceholder.typicode.com/posts");
//     // const array = response.data;

//     // const data1 = Array(array.d === "1");

//     // console.log(data1);
//     const data1 = response.data;
//     const data2 = data1
//       .map((data3) => {
//         return data3;
//       })
//       .filter((a) => {
//         return a.userId === 1;
//       });

//     res.status(200).json({ success: true, result: data2 });
//   } catch (error) {
//     console.log(error.message);
//   }
// });

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

// https://jsonplaceholder.typicode.com/posts
