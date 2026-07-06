export default function TrackingTimeline({ status }) {

  const steps = [
    { label: "Order Placed", key: "Placed", icon: "🛒" },
    { label: "Processing", key: "Processing", icon: "⚙️" },
    { label: "Shipped", key: "Shipped", icon: "📦" },
    { label: "Out for Delivery", key: "OutForDelivery", icon: "🚚" },
    { label: "Delivered", key: "Delivered", icon: "✅" },
  ];

  // normalize backend status safely
  const normalize = (s) => {
    const map = {
      Placed: "Placed",
      Processing: "Processing",
      Shipped: "Shipped",
      "Out for Delivery": "OutForDelivery",
      OutForDelivery: "OutForDelivery",
      Delivered: "Delivered",
    };
    return map[s] || "Processing";
  };

  const cleanStatus = normalize(status);

  const currentIndex = steps.findIndex(s => s.key === cleanStatus);

  return (
    <div className="bg-white border rounded-xl p-6">

      <h3 className="text-lg font-semibold mb-6">
        📦 Order Tracking
      </h3>

      <div className="relative">

        {/* BACK LINE */}
        <div className="absolute left-4 top-0 bottom-0 w-[3px] bg-gray-200 rounded"></div>

        {/* FILLED LINE (STABLE) */}
        <div
          className="absolute left-4 top-0 w-[3px] bg-green-500 rounded transition-all duration-500"
          style={{
            height:
              currentIndex === -1
                ? "20%"
                : `${(currentIndex / (steps.length - 1)) * 100}%`
          }}
        />

        <div className="flex flex-col gap-10">

          {steps.map((step, index) => {

            const isDone = currentIndex !== -1 && index <= currentIndex;
            const isActive = index === currentIndex;

            return (
              <div key={step.key} className="flex items-center gap-4">

                {/* DOT */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full z-10 transition-all duration-300 ${
                    isDone ? "bg-green-500 text-white" : "bg-gray-200"
                  } ${isActive ? "ring-4 ring-green-100" : ""}`}
                >
                  {step.icon}
                </div>

                {/* LABEL */}
                <div>
                  <p
                    className={`font-medium ${
                      isDone ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>

                  {isActive && (
                    <p className="text-xs text-green-600">
                      Current status
                    </p>
                  )}
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}