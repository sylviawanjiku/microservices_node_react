// // Express v4.16.0 and higher
// // --------------------------
// const express = require("express");
// // const bodyparser = require("body-parser");
// const axios = require("axios");

// const app = express();
// const _ = require("lodash");
// const fs = require("fs");
// var mergeWith = require("lodash.mergewith");

// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
// var sizeof = require("object-sizeof");
// const base_url =
//   "https://prompts.jacarandahealth.org/api/v2/messages.json?folder=incoming&after=2022-11-03T00:00:00.000&before=2022-11-04T00:00:00.000";
// const access_token = "85d54b8e3ad1f67f5b673ed10933bde570b35eb8";

// function customizer(objValue, srcValue) {
//   console.log("adding....");
//   if (_.isArray(objValue)) {
//     return objValue.concat(srcValue);
//   }
// }
// async function ExecuteRequest(url, data) {
//   // As this is a recursive function, we need to be able to pass it the prevous data. Here we either used the passed in data, or we create a new objet to hold our data.
//   data = data || {};
//   console.log(url, access_token, data);
//   await axios
//     .get(url, {
//       headers: {
//         Authorization: `Token ${access_token}`,
//       },
//     })
//     .then((response) => {
//       // We merge the returned data with the existing data
//       _.mergeWith(data, response.data, customizer);

//       // We check if there is more paginated data to be obtained
//       if (response.data.next != null) {
//         // If nextPageUrl is not null, we have more data to grab
//         console.log("next....");
//         return ExecuteRequest(response.data.next, data);
//       }
//     });
//     for (const value in data) {
//       const jsonString = JSON.stringify(value);
//       fs.writeFile("./data.json", jsonString, (err) => {
//         if (err) {
//           console.log("Error writing file", err);
//         } else {
//           console.log("Successfully wrote file");
//         }
//       });
//     }
    
//   return data;
// }

// app.get("/messages", async (req, res) => {
//   console.log("started....");
//   try {
//     console.log("here");
    
//     await ExecuteRequest(base_url).then((data) => {
//       console.dir(data);
//     });
//     // console.log(res)
    
//   } catch (error) {
//     console.error(error, "error");
//   }
//   // console.log(res);
// });

// app.listen(3000, () => {
//   console.log(" running on port 3000");
// });



// const express = require("express");
// const bodyparser = require("body-parser");
// const axios = require("axios");

// const app = express();
// app.use(bodyparser.json());

// const events = [];

// app.post("/events", (req, res) => {
//   const event = req.body;

//   events.push(event);

//   axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
//     console.log(err.message);
//   });
//   axios.post("http://comments-srv:4001/events", event).catch((err) => {
//     console.log(err.message);
//   });
//   axios.post("http://query-srv:4002/events", event).catch((err) => {
//     console.log(err.message);
//   });
//   axios.post("http://moderation-srv:4003/events", event).catch((err) => {
//     console.log(err.message);
//   });

//   res.send({ status: "OK" });
// });

// app.get("/events", (req, res) => {
//   res.send(events);
// });

// app.listen(4005, () => console.log("Listening on port 4005"));
// Express v4.16.0 and higher
// --------------------------
const express = require("express");
// const bodyparser = require("body-parser");
const axios = require("axios");

const app = express();
const _ = require('lodash');
var mergeWith = require('lodash.mergewith');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
var sizeof = require("object-sizeof");
const base_url =
  "https://prompts.jacarandahealth.org/api/v2/messages.json?folder=incoming&after=2022-11-03T00:00:00.000&before=2022-11-04T00:00:00.000";
const access_token = "85d54b8e3ad1f67f5b673ed10933bde570b35eb8";

function customizer(objValue, srcValue) {
  console.log("adding....");
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}
async function ExecuteRequest(url, data) {
  // As this is a recursive function, we need to be able to pass it the prevous data. Here we either used the passed in data, or we create a new objet to hold our data.
  data = data || {};
  console.log(url, access_token, data);
  await axios
    .get(url, {
      headers: {
        Authorization: `Token ${access_token}`,
      },
    })
    .then((response) => {
      // We merge the returned data with the existing data
      _.mergeWith(data, response.data, customizer);

      // We check if there is more paginated data to be obtained
      if (response.data.next != null) {
        // If nextPageUrl is not null, we have more data to grab
        console.log("next....");
        return ExecuteRequest(response.data.next, data);
      }
    });
    
  return data;
}

app.get("/messages", async (req, res) => {
  console.log("started....");
  try {
    console.log("here");
    await ExecuteRequest(base_url).then((data) => {
      console.dir(data);
    });
  } catch (error) {
    console.error(error, "error");
  }
  // console.log(res);
});

app.listen(3000, () => {
  console.log(" running on port 3000");
});
