import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  ShieldAlert,
  Heart,
  AlertOctagon,
  Phone,
  Clock,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Edit3,
  Save,
  Plus,
  Trash2,
  Sparkles,
  AlertCircle,
  Eye,
  User,
} from 'lucide-react';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';

export const EmergencyCard = () => {
  const { user } = useAuth();
  const [token, setToken] = useState('demo-token-123');
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const [accessCount, setAccessCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  // Editable Profile State (Clean defaults)
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [allergies, setAllergies] = useState([]);
  const [newAllergy, setNewAllergy] = useState('');
  const [chronicConditions, setChronicConditions] = useState([]);
  const [newCondition, setNewCondition] = useState('');
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRel, setNewContactRel] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [organDonor, setOrganDonor] = useState(false);
  const [criticalNotes, setCriticalNotes] = useState('');

  const fetchProfileAndToken = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/emergency/profile');
      if (res.data?.emergency_info) {
        const info = res.data.emergency_info;
        setBloodGroup(info.blood_group || 'O+');
        setAllergies(info.allergies || []);
        setChronicConditions(info.chronic_conditions || []);
        setContacts(info.emergency_contacts || []);
        setOrganDonor(info.organ_donor ?? false);
        setCriticalNotes(info.critical_notes || '');
        setAccessCount(res.data.access_count || 0);

        if (res.data.active_token) {
          setToken(res.data.active_token);
          setTokenExpiry(res.data.token_expires_at);
        } else {
          handleGenerateNewToken();
        }
      }
    } catch (err) {
      console.warn('Profile fetch note:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndToken();
  }, []);

  const handleGenerateNewToken = async () => {
    setGenerating(true);
    setMessage('');
    try {
      const res = await apiClient.post('/emergency/generate-token');
      if (res.data?.success) {
        setToken(res.data.token);
        setTokenExpiry(res.data.expires_at);
        setMessage('Fresh 24-hour Emergency QR Code generated!');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      console.error('Token generation error:', err);
      const fallback = `emg_${Date.now()}`;
      setToken(fallback);
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.put('/emergency/profile', {
        blood_group: bloodGroup,
        allergies,
        chronic_conditions: chronicConditions,
        emergency_contacts: contacts,
        organ_donor: organDonor,
        critical_notes: criticalNotes,
      });
      setIsEditing(false);
      setMessage('Emergency medical profile updated successfully.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Save error:', err);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const emergencyPublicUrl = `${window.location.origin}/emergency-view/${token}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emergencyPublicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy('');
    }
  };

  const removeAllergy = (idx) => {
    setAllergies(allergies.filter((_, i) => i !== idx));
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      setChronicConditions([...chronicConditions, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const removeCondition = (idx) => {
    setChronicConditions(chronicConditions.filter((_, i) => i !== idx));
  };

  const addContact = () => {
    if (newContactName.trim() && newContactPhone.trim()) {
      setContacts([
        ...contacts,
        {
          name: newContactName.trim(),
          relation: newContactRel.trim() || 'Relative',
          phone: newContactPhone.trim(),
        },
      ]);
      setNewContactName('');
      setNewContactRel('');
      setNewContactPhone('');
    }
  };

  const removeContact = (idx) => {
    setContacts(contacts.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emergency-100 text-emergency-800 text-xs font-bold mb-2 border border-emergency-200">
            <ShieldAlert className="w-3.5 h-3.5 text-emergency-600" /> ABDM Emergency Life-Saving Protocol
          </div>
          <h1 className="text-2xl font-bold text-brand-950">Emergency QR Mode</h1>
          <p className="text-sm text-slate-500 mt-1">
            Generate a secure, 24-hour time-limited QR code for first responders and emergency room doctors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-brand-200 bg-white hover:bg-brand-50 text-xs font-bold text-brand-800 shadow-2xs transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Emergency Info'}</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-brand-100 border border-brand-200 text-brand-900 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-brand-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Main Grid: QR Code Generator on Left + Emergency Card Display on Right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: QR Code Container */}
        <div className="bg-white rounded-3xl border border-brand-100 p-6 shadow-2xs flex flex-col items-center justify-between text-center space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Scan For Emergency Access
            </h2>
            <p className="text-xs text-slate-500">
              Valid for first responders • 24hr auto-expiry
            </p>
          </div>

          {/* Interactive QR SVG */}
          <div className="p-4 bg-brand-50/50 border border-brand-200 rounded-2xl shadow-inner">
            <QRCodeSVG
              value={emergencyPublicUrl}
              size={180}
              bgColor={"#ffffff"}
              fgColor={"#1D2D25"}
              level={"H"}
              includeMargin={true}
            />
          </div>

          <div className="space-y-2 w-full">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-mono">
              <Clock className="w-3.5 h-3.5 text-brand-600" />
              <span>Expires in <strong>24 Hours</strong></span>
            </div>

            <div className="text-[11px] text-slate-400">
              Scanned: <strong className="text-slate-700">{accessCount} times</strong>
            </div>

            <div className="flex gap-2 w-full pt-1">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-brand-200 hover:bg-brand-50 text-brand-800 text-xs font-bold transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-brand-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Link'}</span>
              </button>

              <button
                type="button"
                onClick={handleGenerateNewToken}
                disabled={generating}
                title="Regenerate New 24-hr Token"
                className="p-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 transition border border-brand-200"
              >
                <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
              </button>

              <a
                href={`/emergency-view/${token}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Preview Public First Responder Page"
                className="p-2 rounded-xl bg-emergency-50 hover:bg-emergency-100 text-emergency-700 border border-emergency-200 transition"
              >
                <Eye className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Emergency Summary / Form Card */}
        <div className="md:col-span-2">
          {isEditing ? (
            /* Editing Form */
            <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl border border-brand-100 p-6 shadow-2xs space-y-4 text-xs">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Update Emergency Medical Profile
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Pledged Organ Donor</label>
                  <select
                    value={organDonor ? 'yes' : 'no'}
                    onChange={(e) => setOrganDonor(e.target.value === 'yes')}
                    className="w-full p-2.5 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="yes">Yes (Organ Donor)</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              {/* Allergies editor */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Known Drug Allergies</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="e.g. Penicillin, Sulfa drugs"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    className="flex-1 p-2 rounded-xl border border-brand-200 outline-none"
                  />
                  <button
                    type="button"
                    onClick={addAllergy}
                    className="px-3 py-2 rounded-xl bg-brand-700 text-white font-bold"
                  >
                    Add
                  </button>
                </div>
                {allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {allergies.map((a, i) => (
                      <span key={i} className="inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded-lg text-[11px]">
                        {a}
                        <button type="button" onClick={() => removeAllergy(i)}>
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">No allergies added yet.</p>
                )}
              </div>

              {/* Conditions editor */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Chronic Conditions</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="e.g. Hypertension, Diabetes, Asthma"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    className="flex-1 p-2 rounded-xl border border-brand-200 outline-none"
                  />
                  <button
                    type="button"
                    onClick={addCondition}
                    className="px-3 py-2 rounded-xl bg-brand-700 text-white font-bold"
                  >
                    Add
                  </button>
                </div>
                {chronicConditions.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {chronicConditions.map((c, i) => (
                      <span key={i} className="inline-flex items-center gap-1 bg-sand-100 text-sand-800 border border-sand-300 px-2 py-1 rounded-lg text-[11px]">
                        {c}
                        <button type="button" onClick={() => removeCondition(i)}>
                          <Trash2 className="w-3 h-3 text-sand-600" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">No chronic conditions added.</p>
                )}
              </div>

              {/* Emergency Contacts editor */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Emergency Contacts</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="p-2 rounded-xl border border-brand-200 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Relation (e.g. Spouse)"
                    value={newContactRel}
                    onChange={(e) => setNewContactRel(e.target.value)}
                    className="p-2 rounded-xl border border-brand-200 outline-none"
                  />
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Phone"
                      value={newContactPhone}
                      onChange={(e) => setNewContactPhone(e.target.value)}
                      className="flex-1 p-2 rounded-xl border border-brand-200 outline-none"
                    />
                    <button
                      type="button"
                      onClick={addContact}
                      className="px-3 py-2 rounded-xl bg-brand-700 text-white font-bold"
                    >
                      Add
                    </button>
                  </div>
                </div>
                {contacts.length > 0 ? (
                  <div className="space-y-1.5">
                    {contacts.map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-brand-50/70 border border-brand-200">
                        <span><strong>{c.name}</strong> ({c.relation}) — {c.phone}</span>
                        <button type="button" onClick={() => removeContact(i)}>
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">No emergency contacts added yet.</p>
                )}
              </div>

              {/* Critical Notes */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Critical Notes / Implants</label>
                <input
                  type="text"
                  value={criticalNotes}
                  onChange={(e) => setCriticalNotes(e.target.value)}
                  placeholder="e.g. Pacemaker implanted, severe latex allergy"
                  className="w-full p-2.5 rounded-xl border border-brand-200 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-brand-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Profile'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* High-Contrast Card Display */
            <div className="bg-gradient-to-br from-brand-950 via-slate-900 to-brand-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col justify-between border border-brand-800/50 space-y-6">
              <div>
                <div className="flex items-start justify-between border-b border-brand-800 pb-4 mb-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-300">
                      EMERGENCY CARD PREVIEW
                    </span>
                    <h2 className="text-xl font-bold mt-0.5">
                      {user?.user_metadata?.full_name || 'Patient'}
                    </h2>
                    <p className="text-xs text-brand-200 font-mono mt-0.5">
                      ABHA: {user?.user_metadata?.abha_id || 'Not Assigned'}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-brand-200 block font-medium">Blood Group</span>
                    <span className="text-3xl font-black text-white tracking-tight">
                      {bloodGroup}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-red-300 font-bold block flex items-center gap-1.5">
                      <AlertOctagon className="w-3.5 h-3.5" /> Critical Allergies
                    </span>
                    {allergies.length > 0 ? (
                      <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                        {allergies.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-400 italic">No allergies recorded.</p>
                    )}
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-brand-300 font-bold block flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5" /> Chronic Conditions
                    </span>
                    {chronicConditions.length > 0 ? (
                      <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                        {chronicConditions.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-400 italic">No conditions recorded.</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-slate-300 font-bold block mb-1.5 flex items-center gap-1.5 text-xs">
                    <Phone className="w-3.5 h-3.5 text-brand-400" /> Primary Emergency Contacts
                  </span>
                  {contacts.length > 0 ? (
                    <div className="flex flex-col sm:flex-row gap-3 text-xs">
                      {contacts.map((contact, idx) => (
                        <div key={idx} className="flex-1">
                          <p className="font-semibold text-white">{contact.name} ({contact.relation})</p>
                          <p className="text-brand-200 font-mono">{contact.phone}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-xs">No emergency contacts saved yet. Click 'Edit Emergency Info' to add.</p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-brand-800 flex items-center justify-between text-[11px] text-brand-300">
                <span>Organ Donor: <strong className="text-white">{organDonor ? 'YES' : 'NO'}</strong></span>
                <span className="font-mono">ABDM QR Integrated</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
