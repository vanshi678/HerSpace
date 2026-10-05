import Modal from './Modal';
import Button from './Button';

export default function ConfirmModal({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm' }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      {description && <p className="text-sm text-graysoft-dark mb-6">{description}</p>}
      <div className="flex gap-3">
        <Button variant="outline" full onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" full onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
