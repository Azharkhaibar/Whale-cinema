import { Button } from "./Button";
import { CheckCircle } from "lucide-react";

const pricingPlans = [
    {
        id: 1,
        name: "Basic",
        price: "$5.99/mo",
        features: [
            "Streaming Library with thousands of TV episodes",
            "Most new episodes the day after they air",
            "Access to award-winning Dali Originals",
            "Watch on your TV, laptop, phone, or tablet",
        ],
    },
    {
        id: 2,
        name: "Live TV",
        price: "$29.99/mo",
        mostPopular: true,
        features: [
            "Streaming Library with thousands of TV episodes",
            "Most new episodes the day after they air",
            "Access to award-winning Dali Originals",
            "Watch on your TV, laptop, phone, or tablet",
            "Watch on 2 different screens at the same time",
            "Live TV with 75+ top channels. No cable required.",
            "Record Live TV with 50 hours of Cloud DVR storage",
            "To add up to 10 user profiles",
        ],
    },
    {
        id: 3,
        name: "Premium",
        price: "$59.99/mo",
        features: [
            "Streaming Library with thousands of TV episodes",
            "Most new episodes the day after they air",
            "Access to award-winning Dali Originals",
            "Watch on your TV, laptop, phone, or tablet",
            "Watch on 2 different screens at the same time",
            "Live TV with 75+ top channels. No cable required.",
            "Record Live TV with 50 hours of Cloud DVR storage",
            "To add up to 10 user profiles",
            "Live TV guide to navigate channels",
            "Endless entertainment with Disney+, ad-free",
            "Live sports with ESPN+, now on Dali",
        ],
    },
];

// Mengumpulkan semua fitur unik
const allFeatures = [...new Set(pricingPlans.flatMap(plan => plan.features))];
export default function PricingTable() {
    return (
        <div className="p-10 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Choose Your Plan</h2>
            <div className="overflow-x-auto px-[45px]">
                <table className="w-full border-gray-700 text-white">
                    <thead>
                        <tr className=" text-white">
                            <th className="border-b border-t border-gray-700 px-6 py-16 text-left">
                                <h2 className="text-3xl mb-5">Enjoy on your TV or any device</h2>
                                <p className="text-md">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</p>
                            </th>
                            {pricingPlans.map((plan) => (
                                <th key={plan.id} className="border-b border-t border-gray-700 px-6 py-4 text-center">
                                    <h2 className="text-3xl font-semibold mb-4 font-geologica">{plan.name}</h2>
                                    <Button className="bg-blue-500 hover:bg-blue-600 w-full rounded-[30px] py-3 px-4">Purchase</Button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-800">
                            <td className="border-b border-t border-gray-700 px-6 py-4 w-1/2 text-left font-semibold text-lg">Monthly Price</td>
                            {pricingPlans.map((plan) => (
                                <td key={plan.id} className="border-b border-t border-gray-700 px-6 py-4 text-center text-2xl font-geologica font-bold">
                                    {plan.price}
                                </td>
                            ))}
                        </tr>
                        {allFeatures.map((feature, featureIdx) => (
                            <tr key={featureIdx} className="hover:bg-gray-800">
                                <td className="border-b border-t border-gray-700 px-6 py-4 text-left font-semibold text-lg">{feature}</td>
                                {pricingPlans.map((plan) => (
                                    <td key={plan.id} className="border-b border-t border-gray-700 px-6 py-4 text-center">
                                        {plan.features.includes(feature) ? (
                                            <CheckCircle className="text-green-400 mx-auto" size={20} />
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
