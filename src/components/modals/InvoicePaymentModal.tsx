import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { X, CheckCircle2, ShieldCheck, CreditCard, Download, FileText } from 'lucide-react';

export const InvoicePaymentModal: React.FC = () => {
  const { 
    isInvoicePaymentModalOpen, 
    setIsInvoicePaymentModalOpen, 
    activeInvoiceToPay, 
    setActiveInvoiceToPay,
    payInvoice,
    currentPatient
  } = useClinical();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'hsa' | 'wire'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('883');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isInvoicePaymentModalOpen || !activeInvoiceToPay) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        payInvoice(activeInvoiceToPay.id);
        setPaymentSuccess(false);
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Hospital Superbill Settlement
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                {activeInvoiceToPay.invoiceNumber} · {activeInvoiceToPay.department}
              </div>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsInvoicePaymentModalOpen(false);
              setActiveInvoiceToPay(null);
            }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentSuccess ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto animate-bounce" />
            <div className="text-base font-bold text-white">Payment Confirmed</div>
            <p className="text-xs text-slate-400">
              Transaction settled. Electronic receipt archived to your clinical record.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 space-y-4">
            
            {/* Breakdown card */}
            <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Service Description</span>
                <span className="text-slate-200 text-right font-medium max-w-[220px] truncate">
                  {activeInvoiceToPay.serviceDescription}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Total Clinical Charge</span>
                <span className="font-mono text-slate-200 tabular-nums">
                  ${activeInvoiceToPay.totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-teal-400">
                <span>Insurance Coverage ({currentPatient.insuranceProvider})</span>
                <span className="font-mono tabular-nums">
                  -${activeInvoiceToPay.insuranceCovered.toFixed(2)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm font-bold text-white">
                <span>Patient Balance Due</span>
                <span className="font-mono text-teal-300 tabular-nums">
                  ${activeInvoiceToPay.patientDue.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Settlement Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Credit Card' },
                  { id: 'hsa', label: 'HSA / FSA Card' },
                  { id: 'wire', label: 'Bank Debit' }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-2 px-3 text-xs rounded border text-center transition-colors ${
                      paymentMethod === m.id
                        ? 'border-teal-500 bg-teal-500/10 text-teal-300 font-semibold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Card Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 pl-9 text-xs rounded bg-slate-950 border border-slate-700 text-white font-mono focus:border-teal-500 focus:outline-none"
                  />
                  <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Expiration</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-700 text-white font-mono focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Security CVC</label>
                  <input
                    type="password"
                    value={cvc}
                    onChange={e => setCvc(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-700 text-white font-mono focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>256-bit encrypted healthcare payment protocol · HIPAA verified</span>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsInvoicePaymentModalOpen(false);
                  setActiveInvoiceToPay(null);
                }}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2.5 text-xs font-bold rounded bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-950/50 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Processing Transaction...' : `Pay $${activeInvoiceToPay.patientDue.toFixed(2)}`}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
