export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-6">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-lavender-light flex items-center justify-center mb-4">
          <Icon size={26} className="text-plum-500" strokeWidth={1.75} />
        </div>
      )}
      <h3 className="font-display text-lg text-plum-800 mb-1.5">{title}</h3>
      {description && <p className="text-sm text-graysoft-dark max-w-xs mb-5">{description}</p>}
      {action}
    </div>
  );
}
