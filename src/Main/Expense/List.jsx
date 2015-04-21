'use strict';

var React = require('react');
var _ = require('underscore');
var moment = require('moment');
var mui = require('material-ui');
var Paper = mui.Paper;

var polyglot = require('../../polyglot');
var utils = require('../../utils');
var locale = require('../../locale');
var API = require('../../API');
var List = require('../List/List');
var Avatar = require('../Avatar/Avatar');
var action = require('./action');

var ExpenseList = React.createClass({
  propTypes: {
    expenses: React.PropTypes.array.isRequired,
  },

  onTouchTapList: function(expense, event) {
    event.preventDefault();
    action.tapList(expense);
  },

  render: function () {
    var self = this;
    var expenses = this.props.expenses;

    // Wait loading for expenses
    if(!API.isExpensesFetched(expenses)) {
      return <div></div>;
    }

    expenses = _.sortBy(expenses, 'date').reverse();

    return <div>
      {_.map(expenses, function (expense) {
        var right = new locale.intl.NumberFormat(locale.current, { style: 'currency', currency: expense.currency })
          .format(expense.amount);
        var members = utils.getExpenseMembers(expense);
        var paidBy = members.hash[expense.paidByContactId];
        var date = moment(expense.date, 'YYYY-MM-DD').format('ll');
        var left = <Avatar contact={paidBy} />;

        return <Paper key={expense._id} zDepth={1} rounded={false}
                  onTouchTap={self.onTouchTapList.bind(self, expense)}>
                  <List left={left} right={right} className="mui-menu-item">
                    {expense.description}
                    <div className="mui-font-style-caption">
                      {polyglot.t('paid_by_name', {name: utils.getDisplayName(paidBy)}) + ', '+ date}
                    </div>
                  </List>
              </Paper>;
      })}
    </div>;
  }
});

module.exports = ExpenseList;