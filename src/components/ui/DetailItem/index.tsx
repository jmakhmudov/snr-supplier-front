interface DetailItemProps {
  label: string;
  value: any;
  textStyle?: 'default' | 'italic';
  className?: string;
}

export default function DetailItem({
  label,
  value,
  className,
  textStyle = 'default',
}: DetailItemProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="text-sm font-semibold">{label}</div>
      <div
        data-italic={textStyle === 'italic'}
        className="text-sm data-[italic=true]:italic" 
        dangerouslySetInnerHTML={{ __html: value.toString().replace(/\n/g, '<br />') }}
      ></div>
    </div>
  )
}