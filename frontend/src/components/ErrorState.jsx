const ErrorState = ({ message, retry }) => (
  <div className="text-center">
    <p className="text-red-500 mb-3">{message}</p>
    <button onClick={retry} className="px-4 py-2 bg-primary text-white rounded">
      Retry
    </button>
  </div>
);

export default ErrorState;
