'use client';

import { useUI } from '@/hooks/context/UIContext';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/16/solid';
import emailjs from '@emailjs/browser';

// Spinner component for loading state
function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export default function ContactPopup() {
  const { showContactPopup, closeContactPopup } = useUI();
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  const [errors, setErrors] = useState({ email: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'user_email') {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setErrors({ email: isValid ? '' : 'Invalid email' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('Missing EmailJS environment variables');
      setStatus('error');
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.user_name,
          from_email: form.user_email,
          message: form.message,
        },
        publicKey
      );

      setStatus('success');
      setForm({ user_name: '', user_email: '', message: '' });
      formRef.current?.reset();

      setTimeout(() => {
        setStatus('idle');
        closeContactPopup();
      }, 2000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeContactPopup();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [closeContactPopup]);

  if (!showContactPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-lg max-w-md w-[90%] relative"
      >
        <button
          onClick={closeContactPopup}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-500"
        >
          <XMarkIcon className="h-6 w-6 text-red-400" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Get in Touch – Let’s Connect</h2>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <input
            name="user_name"
            value={form.user_name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Your Name"
            required
          />
          <input
            name="user_email"
            type="email"
            value={form.user_email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Your Email"
            required
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            rows={4}
            placeholder="Your Message"
            required
          />

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center gap-2 ${
              loading ? 'bg-blue-600 animate-pulse' : 'bg-blue-600'
            }`}
            animate={loading ? { scale: [1, 1.02, 1] } : { scale: 1 }}
            transition={{
              repeat: loading ? Infinity : 0,
              duration: 1.2,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {loading ? (
                <motion.div
                  key="loading"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Spinner />
                  <span>Sending...</span>
                </motion.div>
              ) : (
                <motion.span
                  key="send"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Send Message
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {status === 'success' && (
            <p className="text-green-600 text-center">
              Message sent successfully!
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center">
              Failed to send. Try again.
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}





