const express = require("express");
const bodyparser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyparser.json());

app.post("/events", async (req, res) => {

  const { type, data } = req.body;
  console.log("we are here",data)
  if (type === "CommentCreated") {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://event-bus-srv:4005/events', {
      type: "CommentModerated",
      data: {
        commentId: data.commentId,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.status({});
});

app.listen(4003, () => {
  console.log("Listen on port 4003");
});
