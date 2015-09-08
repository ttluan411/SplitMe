'use strict';

var React = require('react');
var Immutable = require('immutable');
var StylePropable = require('material-ui/lib/mixins/style-propable');

var accountUtils = require('Main/Account/utils');
var MemberAvatar = require('Main/MemberAvatar');

var styles = {
  root: {
    display: 'flex',
    padding: 8,
    alignItems: 'center',
  },
  avatar: {
    flexShrink: 0,
  },
  name: {
    paddingLeft: 8,
    fontSize: 13,
  },
};

var MemberChip = React.createClass({
  propTypes: {
    member: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    style: React.PropTypes.object,
  },
  mixins: [
    React.addons.PureRenderMixin,
    StylePropable,
  ],
  render: function() {
    var member = this.props.member;

    return <span style={this.mergeAndPrefix(styles.root, this.props.style)}>
        <MemberAvatar member={member} size={32} style={styles.avatar} />
        <span style={styles.name}>
          {accountUtils.getNameMember(member)}
        </span>
      </span>;
  },
});

module.exports = MemberChip;
