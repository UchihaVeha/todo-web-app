// @flow
import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import DatePicker from 'material-ui-before/DatePicker';
import { IconButton, Typography } from 'material-ui';
import BeforeIcon from 'material-ui-icons/ArrowBack';
import NextIcon from 'material-ui-icons/ArrowForward';
import keycode from 'keycode';

declare var Intl: any;

const styles = theme => ({
  day: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.common.darkWhite
  },
  pointed: {
    cursor: 'pointer'
  },
  datePicker: {
    visibility: 'hidden'
  },
  button: {
    alignSelf: 'flex-end'
  }
});

type Props = {
  value: string,
  onChange: string => void,
  classes: Return<typeof styles>
};

class FilterByDate extends React.Component<Props> {
  picker: ?Object;

  handleChange = (e: null, value: Date) => {
    this.props.onChange(value.toDateString());
  };

  handleNextDay = () => {
    const date = new Date(this.props.value);
    date.setDate(date.getDate() + 1);
    this.props.onChange(date.toDateString());
  };

  handlePrevDay = () => {
    const date = new Date(this.props.value);
    date.setDate(date.getDate() - 1);
    this.props.onChange(date.toDateString());
  };

  handleEnterOnDay = (event: SyntheticKeyboardEvent<>) => {
    if (keycode(event) === 'enter' && this.picker) {
      this.picker.handleTouchTap();
    }
  };

  handleClickOnDay = () => {
    if (this.picker) this.picker.handleTouchTap();
  };

  render() {
    const { value, classes } = this.props;
    const date = new Date(value);
    const day = date.toLocaleString('en', {
      day: 'numeric'
    });
    const month = date.toLocaleString('en', {
      month: 'long'
    });
    const year = date.toLocaleString('en', {
      year: 'numeric'
    });
    return (
      <div>
        <div className={classes.day}>
          <IconButton
            color="inherit"
            aria-label="Menu"
            className={classes.button}
            onClick={() => this.handlePrevDay()}
          >
            <BeforeIcon />
          </IconButton>
          <div
            role="button"
            tabIndex={0}
            className={classes.pointed}
            onKeyPress={this.handleEnterOnDay}
            onClick={() => this.handleClickOnDay()}
          >
            <Typography type="display4" color="inherit">
              {day}
            </Typography>
          </div>
          <IconButton
            color="inherit"
            aria-label="Menu"
            className={classes.button}
            onClick={() => this.handleNextDay()}
          >
            <NextIcon />
          </IconButton>
        </div>
        <div
          role="button"
          tabIndex={0}
          className={classes.pointed}
          onKeyPress={this.handleEnterOnDay}
          onClick={() => this.handleClickOnDay()}
        >
          <Typography type="title" align="center" color="secondary">
            {month} {year}
          </Typography>
        </div>

        <DatePicker
          ref={ref => {
            this.picker = ref;
          }}
          id="datepicker"
          className={classes.datePicker}
          value={new Date(value)}
          onChange={this.handleChange}
          autoOk
        />
      </div>
    );
  }
}

export default withStyles(styles, { name: 'FilterByDate' })(FilterByDate);
