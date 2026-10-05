import { useState } from 'react';
import { Lock } from 'lucide-react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';

export default function VaultPinGate({ hasPin, onUnlock, onCreatePin }) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = (e) => {
    e.preventDefault();
    if (!onUnlock(pin)) {
      setError('That PIN doesn\u2019t match. Try again.');
      setPin('');
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (pin.length < 4) {
      setError('Use at least 4 digits.');
      return;
    }
    if (pin !== confirmPin) {
      setError('PINs don\u2019t match.');
      return;
    }
    onCreatePin(pin);
  };

  return (
    <div className="max-w-sm mx-auto py-10">
      <Card className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-lavender-light flex items-center justify-center mx-auto mb-4">
          <Lock size={22} className="text-plum-600" />
        </div>
        <h2 className="font-display text-xl text-plum-900 mb-1.5">
          {hasPin ? 'Enter your PIN' : 'Set up a vault PIN'}
        </h2>
        <p className="text-sm text-graysoft-dark mb-6">
          {hasPin
            ? 'Your Safety Vault is protected. Enter your PIN to continue.'
            : 'Choose a PIN to keep your important safety information private.'}
        </p>

        <form onSubmit={hasPin ? handleUnlock : handleCreate} className="space-y-3.5" noValidate>
          <Input
            type="password"
            inputMode="numeric"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
            aria-label="PIN"
          />
          {!hasPin && (
            <Input
              type="password"
              inputMode="numeric"
              placeholder="Confirm PIN"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              aria-label="Confirm PIN"
            />
          )}
          {error && <p className="text-xs font-medium text-emergency-dark">{error}</p>}
          <Button type="submit" full>
            {hasPin ? 'Unlock vault' : 'Create PIN'}
          </Button>
        </form>

        <p className="text-xs text-graysoft mt-5">
          For this MVP, your PIN is stored on this device only. A future version will add real
          backend encryption.
        </p>
      </Card>
    </div>
  );
}
