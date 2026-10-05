import { useState } from 'react';
import { Plus, Lock, LockKeyholeOpen } from 'lucide-react';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import VaultPinGate from '../components/vault/VaultPinGate';
import VaultEntryCard from '../components/vault/VaultEntryCard';
import VaultEntryFormModal from '../components/vault/VaultEntryFormModal';
import ConfirmModal from '../components/common/ConfirmModal';
import { useVault } from '../context/VaultContext';
import { useToast } from '../context/ToastContext';

export default function SafetyVault() {
  const { entries, unlocked, hasPin, setPin, unlock, lock, addEntry, deleteEntry } = useVault();
  const { showToast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  if (!unlocked) {
    return (
      <div>
        <Header title="Safety Vault" subtitle="Your private space for important information." />
        <VaultPinGate
          hasPin={hasPin()}
          onUnlock={unlock}
          onCreatePin={(pin) => {
            setPin(pin);
            showToast('Vault PIN created');
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <Header
        title="Safety Vault"
        subtitle="Addresses, numbers, and notes only you can see."
        action={
          <Button variant="outline" icon={Lock} onClick={lock} className="hidden sm:inline-flex">
            Lock vault
          </Button>
        }
      />

      <div className="flex gap-3 mb-6 sm:hidden">
        <Button variant="outline" icon={Lock} full onClick={lock}>
          Lock
        </Button>
        <Button icon={Plus} full onClick={() => setFormOpen(true)}>
          Add entry
        </Button>
      </div>
      <div className="hidden sm:block mb-6">
        <Button icon={Plus} onClick={() => setFormOpen(true)}>
          Add entry
        </Button>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          icon={LockKeyholeOpen}
          title="Your vault is empty"
          description="Store addresses, emergency numbers, or notes you'd want quick, private access to."
          action={
            <Button icon={Plus} onClick={() => setFormOpen(true)}>
              Add your first entry
            </Button>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {entries.map((entry) => (
            <VaultEntryCard key={entry.id} entry={entry} onDelete={setDeleteTarget} />
          ))}
        </div>
      )}

      <VaultEntryFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={(data) => {
          addEntry(data);
          showToast('Entry saved');
          setFormOpen(false);
        }}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteEntry(deleteTarget.id);
          showToast('Entry deleted');
          setDeleteTarget(null);
        }}
        title="Delete this entry?"
        description="This can't be undone."
        confirmLabel="Delete entry"
      />
    </div>
  );
}
