function ErrorBox({ message, onRetry }) {
  return (
    <div className="errorbox" role="alert">
      <div className="error-icon">!</div>
      <h3>A wild error appeared!</h3>
      <p>{message}</p>
      <button className="btn" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

export default ErrorBox;

