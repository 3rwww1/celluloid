import * as React from 'react';
import { AnyAction } from 'redux';

import { Action } from 'types/Action';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { SigninErrors, TeacherSignupData } from '../../../../../common/src/types/TeacherTypes';
import SigninAction from '../SigninAction';

interface Props {
  data: TeacherSignupData;
  errors: SigninErrors;
  confirmPasswordError?: string;
  onChange(name: string, value: string): void;
  onClickLogin(): Action<null>;
  onSubmit(): Promise<AnyAction>;
}

export default ({
  data,
  errors,
  confirmPasswordError,
  onChange,
  onSubmit,
  onClickLogin
}: Props) => (
    <div>
      <TextField
        error={errors && errors.username ? true : false}
        label="Nom complet"
        value={data.username}
        required={true}
        style={{ display: 'flex', flex: 1 }}
        onChange={event => onChange('username', event.target.value)}
        helperText={errors && errors.username}
      />
      <TextField
        error={errors && errors.email ? true : false}
        label="Email"
        value={data.email}
        required={true}
        style={{ display: 'flex', flex: 1 }}
        onChange={event => onChange('email', event.target.value)}
        helperText={errors && errors.email}
      />
      <TextField
        error={errors && errors.password ? true : false}
        label="Mot de passe"
        value={data.password}
        type="password"
        required={true}
        style={{ display: 'flex', flex: 1 }}
        onChange={event => onChange('password', event.target.value)}
        helperText={errors && errors.password}
      />
      <TextField
        error={confirmPasswordError ? true : false}
        label="Confirmer le mot de passe"
        type="password"
        required={true}
        style={{ display: 'flex', flex: 1 }}
        onChange={event => onChange('confirmPassword', event.target.value)}
        helperText={confirmPasswordError}
      />
      <div
        style={{
          justifyContent: 'center',
          display: 'flex',
          paddingTop: 16,
          paddingBottom: 16,
          flexWrap: 'wrap',
        }}
      >
        {errors && errors.server &&
          <Typography
            style={{
              color: 'red',
              fontWeight: 'bold'
            }}
          >
            {errors.server}
          </Typography>
        }
      </div>
      <div
        style={{
          justifyContent: 'center',
          paddingBottom: 16,
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap'
        }}
      >
        <Typography variant="caption">
          {`Déja un compte ?`}
        </Typography>
        <Button
          onClick={onClickLogin}
          color="primary"
        >
          {`Se connecter`}
        </Button>
      </div>
      <SigninAction
        onSubmit={onSubmit}
        actionName="S'inscrire"
      />
    </div>
  );