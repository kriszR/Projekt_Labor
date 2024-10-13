export default function Alert({ message, type }) {
  return (
    <div
      className={`p-5 ${
        type == "error" ? "bg-red-600" : "bg-green-400"
      } text-center text-white`}
    >
      {message}
    </div>
  );
}
