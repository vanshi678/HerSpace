import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

const emptyForm = { name: '', relationship: '', phone: '' };

export default function ContactFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(initialData || emptyForm);
      setErrors({});
    }
  }, [open, initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Enter a name.';
    if (!form.relationship.trim()) next.relationship = 'Enter a relationship.';
    if (!form.phone.trim()) next.phone = 'Enter a phone number.';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(form);
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData ? 'Edit contact' : 'Add trusted contact'}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          id="contact-name"
          name="name"
          label="Full name"
          placeholder="e.g. Mom"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          id="contact-relationship"
          name="relationship"
          label="Relationship"
          placeholder="e.g. Mother, Best friend"
          value={form.relationship}
          onChange={handleChange}
          error={errors.relationship}
        />
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          label="Phone number"
          placeholder="e.g. +1 555 123 4567"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" full onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" full>
            {initialData ? 'Save changes' : 'Add contact'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
