// pages/sample.js
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import getConfig from 'next/config';

// getConfig에서 publicRuntimeConfig 가져오기
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('SUPABASE_URL:', supabaseUrl);
console.log('SUPABASE_KEY:', supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default function SamplePage() {
  const [samples, setSamples] = useState([]);
  const [form, setForm] = useState({
    title: '',
    name: '',
    phoneNumber: '',
    is_auth: false,
  });
  const [editingId, setEditingId] = useState(null);

  const fetchSamples = async () => {
    const { data, error } = await supabase
      .from('sample')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setSamples(data);
  };

  useEffect(() => {
    fetchSamples();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('sample').update(form).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('sample').insert(form);
    }
    setForm({ title: '', name: '', phoneNumber: '', is_auth: false });
    fetchSamples();
  };

  const handleEdit = (sample) => {
    setForm({
      title: sample.title,
      name: sample.name,
      phoneNumber: sample.phoneNumber,
      is_auth: sample.is_auth,
    });
    setEditingId(sample.id);
  };

  const handleDelete = async (id) => {
    await supabase.from('sample').delete().eq('id', id);
    fetchSamples();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sample CRUD</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="is_auth" checked={form.is_auth} onChange={handleChange} />
          <span>Is Authenticated</span>
        </label>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {editingId ? 'Update' : 'Create'}
        </button>
      </form>

      <ul className="space-y-4">
        {samples.map((sample) => (
          <li key={sample.id} className="p-4 border rounded flex flex-col">
            <div className="font-semibold text-lg">{sample.title}</div>
            <div>Name: {sample.name}</div>
            <div>Phone: {sample.phoneNumber}</div>
            <div>Auth: {sample.is_auth ? 'Yes' : 'No'}</div>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(sample)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(sample.id)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
