function StatCard({
  icon,
  title,
  value,
  subtitle,
  color,
  onClick,
}) {
  return (
    <div
      className="dashboard-card"
      onClick={onClick}
    >
      <div className="stat-icon">
        {icon}
      </div>

      <h3 className="stat-title">
        {title}
      </h3>

      <h1 className={`stat-value text-${color}`}>
        {value}
      </h1>

      <div className="stat-footer">
        <span>{subtitle}</span>

        <i className="bi bi-arrow-right"></i>
      </div>

    </div>
  );
}

export default StatCard;