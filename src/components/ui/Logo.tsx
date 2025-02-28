import { LightBulbIcon } from "@heroicons/react/24/outline";


type LogoProps = {
    className: string;
}

export default function Logo({ className } : LogoProps) {
    return (
        <LightBulbIcon className={className}/>
    )
}