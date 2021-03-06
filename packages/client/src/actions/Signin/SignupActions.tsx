import {
  Credentials,
  SigninErrors,
  SigninResult,
  TeacherConfirmData,
  TeacherRecord,
  TeacherSignupData
} from '@celluloid/types';
import { Dispatch } from 'redux';
import UserService from 'services/UserService';
import { Action, ActionType } from 'types/ActionTypes';

import { doLoginThunk, triggerSigninLoading } from '.';

export function openSignup(): Action<null> {
  return {
    type: ActionType.OPEN_SIGNUP
  };
}

export function failSignup(errors: SigninErrors): Action<SigninErrors> {
  return {
    type: ActionType.FAIL_SIGNUP,
    payload: errors
  };
}

export function openConfirmSignup(
  credentials?: Credentials
): Action<Credentials> {
  return {
    type: ActionType.OPEN_CONFIRM_SIGNUP,
    payload: credentials
  };
}

export function succeedSignup(): Action<TeacherRecord> {
  return {
    type: ActionType.SUCCEED_SIGNUP
  };
}

export function failConfirmSignup(errors: SigninErrors): Action<SigninErrors> {
  return {
    type: ActionType.FAIL_CONFIRM_SIGNUP,
    payload: errors
  };
}

export const doSignupThunk = (data: TeacherSignupData) =>
  (dispatch: Dispatch) => {
    dispatch(triggerSigninLoading());
    return UserService.signup(data)
      .then((result: SigninResult) => {
        if (!result.success) {
          return dispatch(failSignup(result.errors));
        } else {
          return dispatch(
            openConfirmSignup({
              login: data.email,
              password: data.password
            })
          );
        }
      })
      .catch(() => dispatch(failSignup({ server: 'RequestFailed' })));
  };

export const doConfirmSignupThunk = (
  data: TeacherConfirmData,
  credentials?: Credentials
) => (dispatch: Dispatch) => {
  dispatch(triggerSigninLoading());
  return UserService.confirmSignup(data)
    .then((result: SigninResult) => {
      if (!result.success) {
        return dispatch(failConfirmSignup(result.errors));
      } else {
        if (credentials) {
          doLoginThunk(credentials)(dispatch);
        }
        return dispatch(succeedSignup());
      }
    })
    .catch(() => {
      return dispatch(failConfirmSignup({ server: 'RequestFailed' }));
    });
};

export const doResendCodeThunk = (email: string) => (dispatch: Dispatch) => {
  dispatch(triggerSigninLoading());
  return UserService.resendCode(email)
    .then((result: SigninResult) => {
      if (!result.success) {
        return dispatch(failConfirmSignup(result.errors));
      } else {
        return dispatch(succeedSignup());
      }
    })
    .catch(() => {
      return dispatch(failConfirmSignup({ server: 'RequestFailed' }));
    });
};
