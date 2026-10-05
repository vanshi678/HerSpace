import { useState, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import Header from '../components/layout/Header';
import Input from '../components/common/Input';
import EmptyState from '../components/common/EmptyState';
import SafetyCategoryCard from '../components/safety/SafetyCategoryCard';
import { safetyCategories } from '../data/safetyResources';

export default function SafetyHub() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return safetyCategories.map((c) => ({ ...c, matched: false }));

    return safetyCategories
      .map((category) => {
        const titleMatches = category.title.toLowerCase().includes(q);
        const matchingTips = category.tips.filter((tip) => tip.toLowerCase().includes(q));
        if (!titleMatches && matchingTips.length === 0) return null;
        return {
          ...category,
          tips: titleMatches ? category.tips : matchingTips,
          matched: true,
        };
      })
      .filter(Boolean);
  }, [query]);

  return (
    <div>
      <Header title="Safety Hub" subtitle="Short, practical tips for everyday situations." />

      <div className="mb-6 max-w-md">
        <Input
          icon={Search}
          placeholder="Search safety tips…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search safety tips"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No tips match that search"
          description="Try a different word, like 'ride', 'lock', or 'password'."
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((category) => (
            <SafetyCategoryCard key={category.id} category={category} forceOpen={category.matched} />
          ))}
        </div>
      )}
    </div>
  );
}
