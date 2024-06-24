import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return <p className={css.error}>{children}</p>;
};
export default ErrorMessage;
