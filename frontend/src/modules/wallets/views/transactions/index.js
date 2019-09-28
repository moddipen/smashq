import React from "react"
import { NavLink } from "redux-first-router-link"
import { connect } from "react-redux"
import { getTransactions, getAuthUserDetails } from "../../../../selectors"
import { API_URL } from "../../../../contants/config"

import { getTransactions as getTransData } from "../../store/actions"
import { back } from "redux-first-router"
import Moment from "react-moment"

class Transactions extends React.PureComponent {
  static propTypes = {}
  static defaultProps = {}

  constructor(props) {
    super(props)
    this.timeout = null
    this.state = {
      viewAll: true
    }
  }

  //redirect back
  handleBack = () => {
    back()
  }

  viewAll = () => {
    this.setState({
      viewAll: false
    })
    this.props.getTransData()
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let transactions = this.props.transactions
    return (
      <section className="pad-40 user-profile-section">
        <div className="top-back-bar">
          <div className="container container630">
            <div className="row align-items-center">
              <div className="col-3">
                <div className="back-prev">
                  <NavLink to="#" onClick={this.handleBack}>
                    <i className="fa fa-chevron-left"></i> <span>Back</span>
                  </NavLink>
                </div>
              </div>
              <div className="col-6 text-center">
                <div className="top-back-bar-name">My Transactions</div>
              </div>
              <div className="col-3 text-right">
                <div className="top-back-coin-need">
                  <a href="your-coins.php">
                    Q <span>{this.props.authUser.coins}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container container630 bg-white box-shadow myorder-wrap">
          {transactions.length ? (
            transactions.map(transaction => (
              <div className="myorder-row box-shadow" key={transaction.id}>
                <div className="myorder-top">
                  <span className="no">{transaction.transactionId}</span>
                  <span className="date">
                    <Moment format="DD MMM YYYY HH:mm A">
                      {transaction.createdAt}
                    </Moment>
                  </span>
                </div>
                <div className="myorder-detail">
                  <div className="myorder-img">
                    <a href="user-profile.php">
                      <img
                        src={
                          this.props.authUser.photo != ""
                            ? API_URL + "/" + this.props.authUser.photo
                            : "/img/noimg.png"
                        }
                        alt="User Photo"
                      />
                    </a>
                  </div>
                  <div className="myorder-info-box">
                    <div className="myorder-name">
                      <a href="user-profile.php">{this.props.authUser.name}</a>
                    </div>
                    <div className="myorder-status">
                      <div>
                        <span className="text-success">
                          {transaction.description}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="myorder-amount">
                    <span>Q {transaction.amount}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-record">
              <h3>No Record Found.</h3>
            </div>
          )}

          {this.state.viewAll && transactions.length === 5 ? (
            <NavLink to="#" className="viewalltrans" onClick={this.viewAll}>
              {" "}
              View All
            </NavLink>
          ) : null}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    transactions: getTransactions(state),
    authUser: getAuthUserDetails(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTransData: () => dispatch(getTransData(0))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions)
