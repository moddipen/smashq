const My = require("jm-ez-mysql");
const bcrypt = require("bcrypt-nodejs");
const isBase64 = require("is-base64");

//for update coin
exports.updateCoin = async (req, res) => {
  let data = req.body;
  let id = req.user.id;

  My.query("select coins from user_coins where user_id = ? limit 1", [id]) //get coins
    .then(result => {
      console.log("result", result);
      let coin = 0;
      if (Object.keys(result).length !== 0) {
        coin = parseInt(result[0].coins) + parseInt(data.coins);
      } else {
        coin = coin + parseInt(data.coins);
      }
      let data1 = {
        coins: coin
      };
      //update coins
      My.update("user_coins", data1, "user_id = " + id)
        .then(result1 => {
          return res.send(
            makeSuccess("Coins added successfully.", {
              profiles: data1
            })
          );
        })
        .catch(err => {
          console.log(err);
          return res.send(makeError("Something went wrong !"));
        });
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"));
    });
};
