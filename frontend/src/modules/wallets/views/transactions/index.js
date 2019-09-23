import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { getTransactions } from "../../../../selectors";

class Transactions extends React.PureComponent {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.timeout = null;
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let transactions = this.props.transactions;
    return (
      <div>
        <h3>Transactions Logs</h3>
        <br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Transactions ID</th>
              <th>Coins</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.transactionId}</td>
                <td>{transaction.coins}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: getTransactions(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
