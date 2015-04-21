'use strict';

var React = require('react/addons');
var _ = require('underscore');
var mui = require('material-ui');
var Dialog = mui.Dialog;
var RadioButton = mui.RadioButton;
var FontIcon = mui.FontIcon;

var polyglot = require('../../polyglot');
var utils = require('../../utils');
var List = require('../List/List');
var Avatar = require('../Avatar/Avatar');
var action = require('./action');

var PaidByDialog = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    members: React.PropTypes.array.isRequired,
    selected: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
      selected: this.props.selected || '',
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.hasOwnProperty('selected')) {
      this.setState({
        selected: nextProps.selected
      });
    }
  },

  show: function() {
    this.refs.dialogWindow.show();
  },

  onNewSelected: function(event, newSelectedValue) {
    this.setState({
      selected: newSelectedValue
    });

    if (this.props.onChange) {
      var newSelected = _.findWhere(this.props.members, {
        id: newSelectedValue
      });

      this.props.onChange(newSelected);
    }
  },

  onTouchTapAdd: function() {
    if ('production' === process.env.NODE_ENV) {
      var self = this;

      navigator.contacts.pickContact(function(contact) {
        console.log(contact);
        action.pickContact(contact);
        self.props.onChange(contact);
      }, function(error) {
        console.log(error);
      });
    } else {
      var contact = {
        id: '101',
        displayName: 'My name',
      };
      action.pickContact(contact);
      this.props.onChange(contact);
    }
  },

  render: function () {
    var self = this;
    var icon = <FontIcon className="md-add" />;

    return <Dialog title={polyglot.t('paid_by')} ref="dialogWindow" onDismiss={this.props.onDismiss}>
      {_.map(this.props.members, function (member) {
        var right = <RadioButton value={member.id} onCheck={self.onNewSelected}
                    checked={member.id === self.state.selected} />;

        var avatar = <Avatar contact={member} />;

        return <List
          onTouchTap={self.onNewSelected.bind(self, '', member.id)}
          className="mui-menu-item"
          left={avatar}
          key={member.id}
          right={right}>
            {utils.getDisplayName(member)}
        </List>;
      })}
      <List className="mui-menu-item" left={icon} onTouchTap={this.onTouchTapAdd}>
        {polyglot.t('add_a_new_person')}
      </List>
    </Dialog>;
  }
});

module.exports = PaidByDialog;