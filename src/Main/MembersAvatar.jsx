'use strict';

var React = require('react/addons');
var MemberAvatar = require('./MemberAvatar');
var _ = require('underscore');

var styles = {
  root: {
    borderRadius: '50%',
    height: 40,
    width: 40,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 0,
  },
  square: {
    borderRadius: '0',
    boxShadow: 'none',
    position: 'absolute',
    top: 0,
  },
};

var MembersAvatar = React.createClass({
  propTypes: {
    members: React.PropTypes.array.isRequired,
  },
  mixins: [
    React.addons.PureRenderMixin,
  ],
  render: function() {
    var props = this.props;
    var members = props.members.slice(1, 4); // Up to 3 elements, skiping the first one

    switch (members.length) {
      case 0:
        console.warn('members is empty');
        break;

      case 1:
        return <MemberAvatar member={members[0]} />;

      case 2:
        return <div style={styles.root}>
            <MemberAvatar member={members[0]} style={_.extend({}, styles.square, {
              left: -20,
            })} />
            <MemberAvatar member={members[1]} style={_.extend({}, styles.square, {
              left: 21,
            })} />
          </div>;

      case 3:
      default:
        return <div style={styles.root}>
            <MemberAvatar member={members[0]} style={_.extend({}, styles.square, {
              left: -20,
            })} />
            <MemberAvatar member={members[1]} style={_.extend({}, styles.square, {
              left: 21,
            })} size={20} />
            <MemberAvatar member={members[2]} style={_.extend({}, styles.square, {
              left: 21,
              top: 21,
            })} size={20} />
          </div>;
    }
  },
});

module.exports = MembersAvatar;