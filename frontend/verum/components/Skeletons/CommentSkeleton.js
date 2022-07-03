export default function CommentSkeleton() {
  return (
    <div className="p-4 bg-white border border-gray-200 animate-pulse cursor-pointer rounded-2xl border-gray-500 shadow-md my-4">
      <div className="border-b-2 mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="">
            <div className="w-32 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></div>
            <div className="w-20 h-3 rounded-md bg-gray-300 animate-pulse"></div>
          </div>
        </div>
        <div className="max-w-md h-6 rounded-md bg-gray-300 animate-pulse mb-3"></div>
        <div className="max-w-sm h-4 rounded-md bg-gray-300 animate-pulse mb-2"></div>
        <div className="flex space-x-2 mt-4 mb-4">
          <div className="w-20 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></div>
          <div className="w-20 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></div>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>
        <div className="">
          <div className="w-32 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></div>
          <div className="w-20 h-3 rounded-md bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="max-w-md h-6 rounded-md bg-gray-300 animate-pulse mb-3"></div>
      <div className="max-w-sm h-4 rounded-md bg-gray-300 animate-pulse mb-2"></div>
      <div className="flex space-x-2 mt-4">
        <div className="w-20 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></div>
        <div className="w-20 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></div>
      </div>
    </div>
  )
}
