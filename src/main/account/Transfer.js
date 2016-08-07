// @flow weak

import React, {PropTypes} from 'react';
import pure from 'recompose/pure';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import locale from 'locale';
import MemberChip from 'main/member/Chip';

const styleSheet = createStyleSheet('AccountDetailTransfer', () => ({
  root: {
    display: 'flex',
    padding: '14px 0 8px',
  },
  center: {
    textAlign: 'center',
    width: '31%',
    fontSize: 18,
    wordBreak: 'break-word',
  },
  svg: {
    height: 20,
    width: 70,
    marginTop: 2,
  },
}));

const styles = {
  satelite: {
    width: '34%',
  },
};

const AccountDetailTransfer = (props, context) => {
  const classes = context.styleManager.render(styleSheet);

  const transfer = props.transfer;
  const amount = locale.numberFormat(locale.current, {
    style: 'currency',
    currency: transfer.currency,
  }).format(transfer.amount);

  return (
    <div className={classes.root} data-test="AccountDetailTransfer">
      <MemberChip member={transfer.from} style={styles.satelite} />
      <div className={classes.center}>
        <div>
          {amount}
        </div>
        <svg className={classes.svg} viewBox="0 0 84 24">
          <path
            d="m70.4 4c-0.4 0.4-0.4 1.1 0 1.6l5.2 5.2 -70 0c-0.6
              0-1.1 0.5-1.1 1.1 0 0.6 0.5 1.1 1.1 1.1l70 0 -5.2 5.2c-0.4
              0.4-0.4 1.1 0 1.6 0.4 0.4 1.1 0.4 1.6 0l7.1-7.1c0.2-0.2
              0.3-0.5 0.3-0.8s-0.1-0.6-0.3-0.8l-7.1-7.1c-0.4-0.4-1.1-0.4-1.6 0l0 0z"
          />
        </svg>
      </div>
      <MemberChip member={transfer.to} style={styles.satelite} />
    </div>
  );
};

AccountDetailTransfer.propTypes = {
  transfer: PropTypes.object.isRequired,
};

AccountDetailTransfer.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

export default pure(AccountDetailTransfer);
