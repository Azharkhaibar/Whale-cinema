export default function PricingTable() {
    const plans = [
        {
            name: "Basic",
            price: "$5.99/mo",
            features: [
                "Streaming Library",
                "New Episodes Next Day",
                "Dali Originals",
                "Watch on any device",
                "2 Screens",
            ],
            unavailable: ["Live TV", "Cloud DVR", "10 Profiles", "Live TV Guide", "Disney+ Ad-Free"],
        },
        {
            name: "Live TV",
            price: "$29.99/mo",
            mostPopular: true,
            features: [
                "Streaming Library",
                "New Episodes Next Day",
                "Dali Originals",
                "Watch on any device",
                "2 Screens",
                "Live TV (75+ Channels)",
                "Cloud DVR",
                "10 Profiles",
            ],
            unavailable: ["Live TV Guide", "Disney+ Ad-Free"],
        },
        {
            name: "Premium",
            price: "$59.99/mo",
            features: [
                "Streaming Library",
                "New Episodes Next Day",
                "Dali Originals",
                "Watch on any device",
                "2 Screens",
                "Live TV (75+ Channels)",
                "Cloud DVR",
                "10 Profiles",
                "Live TV Guide",
                "Disney+ Ad-Free",
            ],
            unavailable: [],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-2xl shadow-lg ${plan.mostPopular ? "bg-gray-800 border-2 border-green-400" : "bg-gray-800"
                            }`}
                    >
                        <h2 className="text-2xl font-bold text-center">{plan.name}</h2>
                        <p className="text-lg text-center font-semibold my-2">{plan.price}</p>
                        <ul className="mt-4 space-y-2">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <span className="text-green-400 mr-2">✔</span> {feature}
                                </li>
                            ))}
                            {plan.unavailable.map((feature, i) => (
                                <li key={i} className="flex items-center text-gray-500">
                                    <span className="mr-2">✖</span> {feature}
                                </li>
                            ))}
                        </ul>
                        <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                            Purchase
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
