const My = require("jm-ez-mysql")
const RocketGate = require("rocketgate")
const util = require("util")

const paymentClient = new RocketGate.gateway({
  MERCHANT_ID: process.env.MERCHANT_ID,
  MERCHANT_PASSWORD: process.env.MERCHANT_PASSWORD,
  testMode: true
})

//for update coin
exports.updateCoin = async (req, res) => {
  let data = req.body
  let id = req.user.id

  My.query("select coins from user_coins where user_id = ? limit 1", [id]) //get coins
    .then(result => {
      let order = {
        amount: data.amount
      }

      let creditCard = {
        creditCardNumber: data.card,
        expirationMonth: data.month,
        expirationYear: data.year,
        cvv: data.cvv
      }

      let prospect = {
        customerFirstName: req.user.name,
        customerEmail: req.user.email
      }

      paymentClient
        .submitTransaction(order, creditCard, prospect, {})
        .then(success => {
          My.insert("transactions", {
            user_id: id,
            transaction_id: success.transactionId,
            coins: data.coins,
            amount: data.amount,
            description: "Coin purchase"
          }).then(result => {
            console.log("Transaction successfully")
          })

          var replace_var = {
            name: req.user.name,
            coins: data.coins
          }
          send_mail(
            "coinspurchase.html",
            replace_var,
            req.user.email,
            "Coins purchase"
          )

          let coin = 0
          if (Object.keys(result).length !== 0) {
            coin = parseInt(result[0].coins) + parseInt(data.coins)
          } else {
            coin = coin + parseInt(data.coins)
          }
          let data1 = {
            coins: coin
          }
          //update coins
          My.update("user_coins", data1, "user_id = " + id)
            .then(result1 => {
              return res.send(
                makeSuccess("Coins added successfully.", {
                  profiles: data1
                })
              )
            })
            .catch(err => {
              console.log("e1", err)
              return res.send(makeError("Something went wrong !"))
            })
        })
        .catch(e => {
          console.log("e2", e)
          return res.send(makeError(e.message))
        })
    })
    .catch(err => {
      console.log("e3", err)
      return res.send(makeError("Something went wrong !"))
    })
}

//for get all transactions
exports.getTransactions = (req, res) => {
  console.log(req)
  var limit = req.query.limit
  var sql = ""
  if (parseInt(limit) !== 0) {
    sql =
      "select * from transactions where user_id=? order by id desc limit " +
      limit
  } else {
    sql = "select * from transactions where user_id=? order by id desc"
  }

  My.query(sql, [req.user.id])
    .then(results => {
      console.log(results)
      return res.send(makeSuccess("", { transactions: results }))
    })
    .catch(err => {
      return res.send(makeError("Something went wrong !"))
    })
}

exports.requiringSubscription = (req, res) => {
  const data = req.body.creditCard
  const subPlan = req.body.subPlan
  var rebill = {
    rebillCount: +subPlan.iterationCount - 1,
    rebillAmount: +subPlan.amount
  }
  var feeAmount = +subPlan.amount

  switch (subPlan.periodUnit) {
    case "months": {
      if (subPlan.periodLength == 4) {
        rebill.rebillFrequency = "QUARTERLY"
      } else if (subPlan.periodLength == 6) {
        rebill.rebillFrequency = "SEMI-ANNUALLY"
      } else if (subPlan.periodLength == 12) {
        rebill.rebillFrequency = "ANNUALLY"
      } else {
        rebill.rebillFrequency = "MONTHLY"
      }

      break
    }
    case "days": {
      rebill.rebillFrequency = "Weekly"
      break
    }
    default: {
      rebill.rebillFrequency = "MONTHLY"
    }
  }

  if (subPlan.trialAmount) {
    rebill.rebillAmount = subPlan.amount
    feeAmount = subPlan.trialAmount
    rebill.rebillCount += 1
  } else if (subPlan.trialCount) {
    rebill.rebillCount += +subPlan.trialCount
  }

  let cc = {
    creditCardNumber: data.card,
    expirationMonth: data.month,
    expirationYear: data.year,
    cvv: data.cvv
  }

  let prospect = {
    customerFirstName: req.user.name,
    customerEmail: req.user.email
  }

  rebill.rebillStart = Math.floor(
    (new Date(subPlan.startingDate).getTime() - Date.now()) / (3600 * 1000 * 24)
  )

  console.log(rebill)

  // util._extend(rebill, {});

  paymentClient
    .submitTransaction({ amount: feeAmount }, cc, prospect, rebill)
    .then(response => {
      console.log("response ----", response)
    })
}
