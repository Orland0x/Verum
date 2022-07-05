export default function GenericButton({ children, action }) {
  return (
    <button className="bg-blue-800 text-white px-4 py-2 rounded-xl shadow-lg mt-5 hover:scale-110 duration-100 font-semibold" onClick={() => action()}>{children}</button>
  )
}
