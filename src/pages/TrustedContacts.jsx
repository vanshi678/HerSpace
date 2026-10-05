import { useState } from 'react';
import { UserPlus, Users } from 'lucide-react';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import ContactCard from '../components/contacts/ContactCard';
import ContactFormModal from '../components/contacts/ContactFormModal';
import ConfirmModal from '../components/common/ConfirmModal';
import { useContacts } from '../context/ContactsContext';
import { useToast } from '../context/ToastContext';

export default function TrustedContacts() {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const { showToast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openAddForm = () => {
    setEditingContact(null);
    setFormOpen(true);
  };

  const openEditForm = (contact) => {
    setEditingContact(contact);
    setFormOpen(true);
  };

  const handleSubmit = (data) => {
    if (editingContact) {
      updateContact(editingContact.id, data);
      showToast('Contact updated');
    } else {
      addContact(data);
      showToast('Contact added');
    }
    setFormOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteContact(deleteTarget.id);
    showToast('Contact removed');
    setDeleteTarget(null);
  };

  return (
    <div>
      <Header
        title="Trusted Contacts"
        subtitle="The people HerSpace reaches out to first during an SOS."
        action={
          <Button icon={UserPlus} onClick={openAddForm} className="hidden sm:inline-flex">
            Add contact
          </Button>
        }
      />

      <div className="sm:hidden mb-5">
        <Button icon={UserPlus} full onClick={openAddForm}>
          Add contact
        </Button>
      </div>

      {contacts.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No trusted contacts yet"
          description="Add the people you'd want by your side in an emergency — family, roommates, close friends."
          action={
            <Button icon={UserPlus} onClick={openAddForm}>
              Add your first contact
            </Button>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={openEditForm}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <ContactFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingContact}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Remove this contact?"
        description={`${deleteTarget?.name || 'This contact'} will no longer show up during an SOS. You can add them again anytime.`}
        confirmLabel="Remove contact"
      />
    </div>
  );
}
