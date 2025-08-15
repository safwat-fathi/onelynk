interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: React.ReactNode
}

const MetricCard = ({ title, value, change, changeType = 'neutral', icon }: MetricCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-success'
      case 'negative': return 'text-error'
      default: return 'text-base-content/60'
    }
  }

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-base-content/60">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
            {change && (
              <p className={`text-sm mt-1 ${getChangeColor()}`}>
                {change}
              </p>
            )}
          </div>
          {icon && (
            <div className="text-primary opacity-60">
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MetricCard