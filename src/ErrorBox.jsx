function ErrorBox({ message, onRetry }) {
  return (
    <div>
      <p>Something went wrong: {message}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}

export default ErrorBox;