export default function AttestationSkeleton() {
  return (
    <div className="p-4 bg-white border border-gray-200 animate-pulse cursor-pointer rounded-2xl border-gray-500 shadow-md my-4">
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>
        <div className="">
          <div className="w-48 h-4 rounded-md bg-gray-300 animate-pulse mb-2"></div>
          <div className="w-40 h-3 rounded-md bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
