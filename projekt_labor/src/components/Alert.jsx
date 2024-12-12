export default function Alert({ message, type }) {
  return (
    <div
      className={`p-5 ${
        type == 'error' ? 'bg-red-700' : 'bg-green-700'
      } text-center text-white`}
    >
      {message}
    </div>
  );
}
