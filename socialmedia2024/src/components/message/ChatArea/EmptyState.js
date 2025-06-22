const EmptyState = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
          💬
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Chọn một cuộc trò chuyện
        </h2>
        <p className="text-gray-600">
          Chọn từ danh sách bên trái để bắt đầu trò chuyện
        </p>
      </div>
    </div>
  );
};
export default EmptyState;