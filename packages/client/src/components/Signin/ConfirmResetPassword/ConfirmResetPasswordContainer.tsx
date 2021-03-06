import * as React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';

import ConfirmResetPassword from './ConfirmResetPasswordComponent';
import { doConfirmResetPasswordThunk } from 'actions/Signin';
import { Action } from 'types/ActionTypes';
import { AppState } from 'types/StateTypes';

import {
  TeacherConfirmResetPasswordData,
  SigninErrors
} from '@celluloid/types';

interface Props {
  errors: SigninErrors;
  onClickSignup(): Action<null>;
  onSubmit(data: TeacherConfirmResetPasswordData): Promise<AnyAction>;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmit: (data: TeacherConfirmResetPasswordData) =>
      doConfirmResetPasswordThunk(data)(dispatch)
  };
};

const mapStateToProps = (state: AppState) => {
  return {
    errors: state.signin.errors
  };
};

interface State extends TeacherConfirmResetPasswordData {
  confirmPassword: string;
}

class Confirm extends React.Component<Props, State> {
  state = {
    login: '',
    code: '',
    password: '',
    confirmPassword: ''
  } as State;

  render() {
    const onChange = (name: string, value: string) => {
      this.setState(state => ({
        ...state,
        [name]: value
      }));
    };

    const confirmPasswordError =
      this.state.confirmPassword === this.state.password
        ? undefined
        : 'Les mots de passe ne correspondent pas';

    return (
      <ConfirmResetPassword
        data={this.state}
        errors={this.props.errors}
        confirmPasswordError={confirmPasswordError}
        onSubmit={() => this.props.onSubmit(this.state)}
        onChange={onChange}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirm);
