import React from 'react';
import Alert from '@material-ui/lab/Alert';

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage ({message}: ErrorMessageProps){
  return (
    <Alert severity="error">{message}</Alert>
  );
};
