import { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

const CATEGORIES = ['Important Addresses', 'Emergency Numbers', 'Personal Notes', 'Important Instructions'];

export default function VaultEntryFormModal({ open, onClose, onSubmit }) {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setCategory(CATEGORIES[0]);
    setTitle('');
    setContent('');
    setError('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Please fill in a title and details.');
      return;
    }
    onSubmit({ category, title, content });
    reset();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add vault entry">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block text-sm font-medium text-plum-700 mb-1.5">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-plum-100 bg-white/80 py-3 px-4 text-sm text-plum-900 outline-none focus:border-plum-300"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <Input
          label="Title"
          placeholder="e.g. Home address"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-plum-700 mb-1.5">Details</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Add the details you want to keep private here…"
            className="w-full rounded-2xl border border-plum-100 bg-white/80 py-3 px-4 text-sm text-plum-900 placeholder:text-graysoft-light outline-none focus:border-plum-300 resize-none"
          />
        </div>
        {error && <p className="text-xs font-medium text-emergency-dark">{error}</p>}
        <div className="flex gap-3 pt-1">
          <Button type="button" variant="outline" full onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" full>
            Save entry
          </Button>
        </div>
      </form>
    </Modal>
  );
}
