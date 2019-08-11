import MaterialButton from '@material-ui/core/Button';
import MaterialTextField from '@material-ui/core/TextField';
import styled from 'styled-components';

export const SignForm = styled.div `
  height: calc(100% - 265px);
`;

export const ActualForm = styled.form `
  padding: 20px;
`;

export const Section = styled.div `
  padding-bottom: 35px;
`;

export const Legend = styled.legend `
  font-weight: bold;
  color: white;
`;

export const Label = styled.label `
  color: white !important;
`;

export const Input = styled.input `
  color: white;

  &::placeholder {
    color: var(--primary-bg);
  }
`;

export const TextField = styled(MaterialTextField) `
  width: 100%;
  position: relative;

  > div::before {
    border-color: white !important;
  }

  input {
    color: white !important;

    &::placeholder {
      color: var(--primary-bg) !important;
    }
  }

  label {
    color: white !important;
  }
` as typeof MaterialTextField;

export const Button = styled(MaterialButton) `
  width: 100px;
  display: block !important;
  margin: auto !important;
  background-color: var(--secondary-bg) !important;

  &[disabled] {
    color: #38a81c;
  }

  &:not([disabled]) {
    color: white;
  }
` as typeof MaterialButton;

export const ErrorMessage = styled.div `
  position: fixed;
  color: red;
  font-size: 15px;
  margin-top: 20px;
`;
