import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id:
    "AeQ2JLDawVkdMh-o53Tzf-TFyJ9oFnuGAn9n2ggtQwOMts5W3kFLIQhPu2YLGkWGG5Yv3cVkSLt1EBs8",
  client_secret:
    "EB8mntwZcMnj6ararss8N4RnjSEQFtqV-HR1-l6-5QoXm6ikcn5o_mHIo9o3c5kuV0BW8VXeFuegNg6V",
});

export default paypal;
