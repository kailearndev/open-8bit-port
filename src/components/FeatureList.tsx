import { Check } from "lucide-react";

const FeatureList = ({ items }: { items: string[] }) => (
    <ul className="space-y-3">
        {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
                <Check size={16} className="text-primary mt-1 shrink-0" />
                <span className="text-gray-400 text-sm leading-tight">{item}</span>
            </li>
        ))}
    </ul>
);


export default FeatureList;