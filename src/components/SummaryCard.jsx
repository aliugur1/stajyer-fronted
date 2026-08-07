function SummaryCard({ data }) {
  const Icon = data?.icon;
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-200">
        {typeof Icon === "string" ? (
          <i className={`${Icon} w-5 text-blue-900`} />
        ) : (
          Icon && <Icon className="w-5 h-5 text-blue-900" />
        )}
        <span className="font-bold text-gray-900">{data?.name}</span>
      </div>
      <div className="flex flex-col gap-2">
        {data?.card?.map((item, key) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-gray-500">{item.title}</span>
            <span className="font-semibold text-gray-900">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SummaryCard;
