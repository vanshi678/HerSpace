import { useState, useEffect, useRef } from 'react';
import { PhoneCall, Clock3, Sparkles } from 'lucide-react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import SelectableCard from '../components/fakeCall/SelectableCard';
import IncomingCallScreen from '../components/fakeCall/IncomingCallScreen';
import ActiveCallScreen from '../components/fakeCall/ActiveCallScreen';
import { fakeCallers, fakeCallDelays } from '../data/fakeCallData';
import { useToast } from '../context/ToastContext';

export default function FakeCall() {
  const { showToast } = useToast(); const [callerId, setCallerId] = useState(fakeCallers[0].id); const [delayId, setDelayId] = useState(fakeCallDelays[0].id); const [stage, setStage] = useState('setup'); const [countdown, setCountdown] = useState(0); const intervalRef = useRef(null);
  const caller = fakeCallers.find((c) => c.id === callerId); const delay = fakeCallDelays.find((d) => d.id === delayId);
  useEffect(() => () => clearInterval(intervalRef.current), []);
  const startFakeCall = () => { if (delay.seconds === 0) return setStage('incoming'); setStage('waiting'); setCountdown(delay.seconds); intervalRef.current = setInterval(() => setCountdown(c => { if (c <= 1) { clearInterval(intervalRef.current); setStage('incoming'); return 0; } return c - 1; }), 1000); };
  const cancelWaiting = () => { clearInterval(intervalRef.current); setStage('setup'); showToast('Fake call cancelled', 'info'); };
  if (stage === 'incoming') return <IncomingCallScreen caller={caller} onAccept={() => setStage('active')} onDecline={() => {setStage('setup'); showToast('Call declined');}} />;
  if (stage === 'active') return <ActiveCallScreen caller={caller} onEnd={() => {setStage('setup'); showToast('Call ended');}} />;
  return <div><Header title="Fake Call" subtitle="A gentle exit tool with prerecorded AI voice calls." />{stage === 'waiting' ? <Card className="max-w-md mx-auto text-center py-10"><div className="mx-auto w-16 h-16 rounded-full brand-gradient text-white flex items-center justify-center mb-4 animate-breathe"><PhoneCall size={26}/></div><p className="text-sm text-graysoft-dark mb-1">Preparing a call from</p><p className="font-display text-2xl text-plum-900 mb-5">{caller.name}</p><div className="font-display text-5xl text-plum-700 mb-6 tabular-nums">{countdown}s</div><Button variant="outline" onClick={cancelWaiting}>Cancel</Button></Card> : <div className="max-w-2xl space-y-5"><Card className="overflow-hidden"><div className="flex items-center justify-between mb-4"><div><h2 className="font-display text-xl text-plum-900">Choose caller</h2><p className="text-xs text-graysoft mt-1">Pick the person whose voice you want to hear.</p></div><span className="rounded-full bg-pink-50 text-pink-500 px-3 py-1 text-[11px] font-bold inline-flex items-center gap-1"><Sparkles size={12}/> Voice</span></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{fakeCallers.map(c => <SelectableCard key={c.id} label={c.name} sublabel={c.label} selected={callerId===c.id} onClick={()=>setCallerId(c.id)} />)}</div></Card><Card><h2 className="font-display text-xl text-plum-900 mb-4">Choose delay</h2><div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{fakeCallDelays.map(d => <SelectableCard key={d.id} label={d.label} selected={delayId===d.id} onClick={()=>setDelayId(d.id)} icon={Clock3}/>)}</div></Card><Button icon={PhoneCall} full size="lg" onClick={startFakeCall}>Start fake call</Button><p className="text-xs text-graysoft text-center">This is a simulated call. No real call or message is sent.</p></div>}</div>;
}
