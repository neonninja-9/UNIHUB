export function QuickLinks() {
  return (
    <div className="bg-[#1A1F3A] rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Quick Links</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 rounded-lg py-3 px-4 text-sm font-medium transition">
          Library
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 rounded-lg py-3 px-4 text-sm font-medium transition">
          Assignments
        </button>
        <button className="bg-pink-600 hover:bg-pink-700 rounded-lg py-3 px-4 text-sm font-medium transition">
          Exams
        </button>
        <button className="bg-green-600 hover:bg-green-700 rounded-lg py-3 px-4 text-sm font-medium transition">
          Results
        </button>
      </div>
    </div>
  )
}