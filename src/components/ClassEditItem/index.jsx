import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const StyledPaper = styled(Paper)({
  width: '500px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  marginLeft: '-250px',
  marginTop: '-200px',
  padding: '40px',
});

export class ClassEditItem extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      title: props.classSession.title || '',
      startTime: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('.')[0],
      endTime: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('.')[0]
    };
  }

  changeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  }

  editClassForm = (e) => {
    e.preventDefault();
    const formData = {
      id: this.props.classSession.id,
      newData: {
        title: this.state.title,
        start_time: this.state.startTime,
        endTime: this.state.endTime,
      }
    };
    this.props.onSubmitEditForm(formData);
  }

  render() {
    const { title, startTime, endTime } = this.state;
    return (
      <StyledPaper>
        <Typography component="h2" variant="h6">
          Edit class
        </Typography>
        <form onSubmit={this.editClassForm}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="title">Class title</InputLabel>
            <Input
              id="title"
              name="title"
              autoComplete="title"
              value={title}
              onChange={this.changeInput}
              autoFocus
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField
              id="datetime-local"
              label="Start time"
              type="datetime-local"
              defaultValue={startTime}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField
              id="datetime-local"
              label="End time"
              type="datetime-local"
              defaultValue={endTime}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </form>
      </StyledPaper>
    );
  }
}

ClassEditItem.propTypes = {
  classSession: PropTypes.objectOf(PropTypes.any).isRequired,
  onSubmitEditForm: PropTypes.func.isRequired
};
