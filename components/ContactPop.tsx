'use client';

import { useUI } from '@/hooks/context/UIContext';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/16/solid';
import emailjs from '@emailjs/browser';

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

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  console.log('Env:', { serviceId, templateId, publicKey });

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
        user_name: form.user_name,
        user_email: form.user_email,
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>

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




