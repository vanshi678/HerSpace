export default function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 gap-3" role="status" aria-live="polite">
      <div className="relative w-10 h-10">
        <span className="absolute inset-0 rounded-full border-2 border-plum-100" />
        <span className="absolute inset-0 rounded-full border-2 border-plum-500 border-t-transparent animate-spin" />
      </div>
      <p className="text-sm text-graysoft-dark">{label}</p>
    </div>
  );
}
