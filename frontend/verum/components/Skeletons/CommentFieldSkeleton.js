export default function PostSkeleton() {
  return (
    <div className="p-4 bg-white border border-gray-200 animate-pulse cursor-pointer rounded-2xl border-gray-500 shadow-md my-4">
      <div className="flex items-center space-x-2">
      <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>
        <div className="">
          <div className="w-64 md:w-80 h-8 rounded-md bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
