import Main from '../components/Layout';

export default function Browse() {
  return (
    <Main active={'post'}>
      <div className="p-5 py-20 rounded-md mx-auto">
        <h1 className="text-3xl font-bold text-center">New post</h1>
        <form action="" className="mt-5">
          <textarea
            type="text"
            name="post"
            autoComplete="off"
            placeholder="Start typing..."
            className="px-4 py-2 mt-4 text-sm outline-none w-full rounded-xl border border-gray-400 focus-within:border-blue-800 duration-150 shadow-sm focus-within:shadow-md"
          />
          <div className="mt-4">
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => console.log('hi')}
              className="text-lg py-1 px-4 duration-100 bg-blue-800 text-white rounded-xl shadow-lg hover:scale-110"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </Main>
  )
}
