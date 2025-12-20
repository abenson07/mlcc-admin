import { TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  subtitle: string;
}

export function MetricCard({ title, value, change, subtitle }: MetricCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="flex-1 bg-white border border-[#e5e7eb] rounded-[10px] pt-[21px] px-[21px] pb-px flex flex-col gap-[4px]">
      <div className="h-5">
        <p className="text-[#6a7282] text-sm leading-5 tracking-[-0.1504px] font-normal">
          {title}
        </p>
      </div>
      <div className="flex items-center h-[30px]">
        <p className="text-[#101828] text-xl font-medium leading-[30px] tracking-[-0.4492px]">
          {value}
        </p>
        <div className="flex items-center gap-[2px] h-5 ml-[8px]">
          <TrendingUp size={16} className={isPositive ? 'text-[#00a63e]' : 'text-red-600'} />
          <p className={`text-sm leading-5 tracking-[-0.1504px] font-normal ${
            isPositive ? 'text-[#00a63e]' : 'text-red-600'
          }`}>
            {Math.abs(change)}%
          </p>
        </div>
      </div>
      <div className="h-4">
        <p className="text-[#99a1af] text-xs leading-4 font-normal">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
