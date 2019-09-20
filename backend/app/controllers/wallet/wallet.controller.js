const My = require("jm-ez-mysql");
const RocketGate = require("rocketgate");

const paymentClient = new RocketGate.gateway({
  MERCHANT_ID: process.env.MERCHANT_ID,
  MERCHANT_PASSWORD: process.env.MERCHANT_PASSWORD,
  testMode: true
});

//for update coin
exports.updateCoin = async (req, res) => {
  let data = req.body;
  let id = req.user.id;

  My.query("select coins from user_coins where user_id = ? limit 1", [id]) //get coins
    .then(result => {
      let order = {
        amount: data.amount
      };

      let creditCard = {
        creditCardNumber: data.card,
        expirationMonth: data.month,
        expirationYear: data.year,
        cvv: data.cvv
      };

      let prospect = {
        customerFirstName: req.user.name,
        customerEmail: req.user.email
      };

      paymentClient
        .submitTransaction(order, creditCard, prospect, {})
        .then(success => {
          My.insert("transactions", {
            user_id: id,
            transaction_id: success.transactionId,
            coins: data.coins,
            amount: data.amount
          }).then(result => {
            console.log("Transaction successfully");
          });

          var replace_var = {
            name: req.user.name,
            link: data.coins
          };
          send_mail(
            "coinspurchase.html",
            replace_var,
            req.user.email,
            "Coins purchase"
          );

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
        .catch(e => {
          return res.send(makeError("Something went wrong !"));
        });
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"));
    });
};

//for get all transactions
exports.getTransactions = (req, res) => {
  My.query("select * from transactions where user_id=?", [req.user.id])
    .then(results => {
      return res.send(makeSuccess("", { transactions: results }));
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"));
    });
};
