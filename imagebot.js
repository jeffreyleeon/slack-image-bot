var fs    = require("fs");
var client = require('google-images');

module.exports = function (req, res, next) {
  var text = req.body.text;
  for (i = 0; i < process.env.PRECEDING_NUMBER_OF_WORDS; ++i) {
    string = text.split(' ').pop();
  }
  console.log('string is: ' + string);
  client.search(string, function (err, images) {
    var imageUrl = images[0].url;
    var botPayload = {
        "text": imageUrl
      };
    if (req.body.user_name !== 'slackbot') {
      return res.status(200).json(botPayload);
    } else {
      return res.status(200).end();
    }
  });
}
