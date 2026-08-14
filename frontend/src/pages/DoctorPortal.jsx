import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  ShieldCheck,
  Sparkles,
  Clock,
  Send,
  Eye,
  Trash2,
  Lock,
  Plus,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  FileCheck,
  History,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import apiClient from '../api/client';

export const DoctorPortal = () => {
  const [shares, setShares] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState('shares'); // 'shares' | 'logs'
  const [message, setMessage] = useState('');

  // Form State
  const [doctorName, setDoctorName] = useState('');
  const [recipientIdentifier, setRecipientIdentifier] = useState('');
  const [purpose, setPurpose] = useState('Clinical Consultation & Review');
  const [durationHours, setDurationHours] = useState('24');
  const [permissions, setPermissions] = useState([
    'timeline',
    'medicines',
    'lab_reports',
    'emergency_info',
  ]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sharesRes, logsRes] = await Promise.all([
        apiClient.get('/consent/shares'),
        apiClient.get('/consent/logs'),
      ]);
      if (sharesRes.data?.shares) {
        setShares(sharesRes.data.shares);
      }
      if (logsRes.data) {
        setAuditLogs(logsRes.data);
      }
    } catch (err) {
      console.error('Failed to load consent shares:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateShare = async (e) => {
    e.preventDefault();
    if (!doctorName) return;

    setCreating(true);
    setMessage('');
    try {
      const res = await apiClient.post('/consent/share', {
        recipient_name: doctorName,
        recipient_identifier: recipientIdentifier || undefined,
        purpose,
        duration_hours: parseInt(durationHours, 10),
        permissions,
      });

      if (res.data?.id) {
        setMessage(`Consent access link generated for ${doctorName} with AI Pre-Consult Brief!`);
        setDoctorName('');
        setRecipientIdentifier('');
        fetchData();
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      console.error('Error creating share:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleRevoke = async (shareId) => {
    try {
      await apiClient.post(`/consent/revoke/${shareId}`);
      setMessage('Consent access link revoked immediately.');
      fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error revoking consent:', err);
    }
  };

  const handleCopyLink = (accessCode, id) => {
    const fullUrl = `${window.location.origin}/doctor-view/${accessCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const togglePermission = (perm) => {
    if (permissions.includes(perm)) {
      setPermissions(permissions.filter((p) => p !== perm));
    } else {
      setPermissions([...permissions, perm]);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold mb-2 border border-brand-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" /> ABDM Consent Management & Pre-Consult AI
          </div>
          <h1 className="text-2xl font-bold text-brand-950">Doctor Access & Sharing</h1>
          <p className="text-sm text-slate-500 mt-1">
            Grant time-limited, consent-driven record access to doctors. Gemini AI automatically generates a 60-second pre-consult brief to streamline consultations.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-brand-200 shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('shares')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'shares'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-brand-800 hover:text-brand-950 hover:bg-brand-50'
            }`}
          >
            Doctor Access Grants ({shares.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'logs'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-brand-800 hover:text-brand-950 hover:bg-brand-50'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Audit Trail ({auditLogs.length})</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-2xl bg-brand-100 border border-brand-200 text-brand-900 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-brand-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {activeTab === 'shares' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Share Consent Form */}
          <div className="bg-white rounded-3xl border border-brand-100 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900">
              <div className="p-1.5 rounded-xl bg-brand-100 text-brand-700">
                <Plus className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wider">
                Generate Doctor Access Link
              </h2>
            </div>

            <form onSubmit={handleCreateShare} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-brand-950 block mb-1 uppercase tracking-wider">
                  Doctor / Hospital Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Arun Sharma (Cardiology)"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 outline-none bg-brand-50/20"
                />
              </div>

              <div>
                <label className="font-semibold text-brand-950 block mb-1 uppercase tracking-wider">
                  Doctor Contact / ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. dr.sharma@maxhealthcare.com"
                  value={recipientIdentifier}
                  onChange={(e) => setRecipientIdentifier(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 outline-none bg-brand-50/20"
                />
              </div>

              <div>
                <label className="font-semibold text-brand-950 block mb-1 uppercase tracking-wider">
                  Consultation Purpose
                </label>
                <input
                  type="text"
                  placeholder="e.g. Second opinion on lipid panel"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 outline-none bg-brand-50/20"
                />
              </div>

              <div>
                <label className="font-semibold text-brand-950 block mb-1 uppercase tracking-wider">
                  Access Duration (Auto-Expiry)
                </label>
                <select
                  value={durationHours}
                  onChange={(e) => setDurationHours(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                >
                  <option value="4">4 Hours (Single Appointment)</option>
                  <option value="24">24 Hours (Full Day Consultation)</option>
                  <option value="72">72 Hours (Inpatient / Post-Op Review)</option>
                  <option value="168">7 Days (Longitudinal Care)</option>
                </select>
              </div>

              {/* Permissions Checkboxes */}
              <div>
                <label className="font-semibold text-brand-950 block mb-2 uppercase tracking-wider">
                  Data Access Scopes
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'timeline', label: 'Clinical Timeline & Encounters' },
                    { id: 'medicines', label: 'Active & Past Prescriptions' },
                    { id: 'lab_reports', label: 'Diagnostic Lab Biomarkers' },
                    { id: 'emergency_info', label: 'Emergency Info & Allergies' },
                  ].map((p) => (
                    <label
                      key={p.id}
                      className="flex items-center gap-2 p-2 rounded-xl bg-brand-50/60 border border-brand-200/80 cursor-pointer hover:bg-brand-100/70 transition"
                    >
                      <input
                        type="checkbox"
                        checked={permissions.includes(p.id)}
                        onChange={() => togglePermission(p.id)}
                        className="rounded text-brand-600 focus:ring-brand-500"
                      />
                      <span className="text-slate-700 font-medium">{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={creating || !doctorName}
                className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold transition shadow-2xs disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {creating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Pre-Consult Brief...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Doctor Link</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Active & Past Shares List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl border border-brand-100 p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4 border-b border-brand-100 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Active & Past Consent Grants
                  </h2>
                  <p className="text-xs text-slate-500">
                    Doctors can access your records securely with pre-consult AI summaries.
                  </p>
                </div>
                <button
                  onClick={fetchData}
                  className="p-1.5 rounded-xl border border-brand-200 hover:bg-brand-50 text-brand-700"
                  title="Refresh Shares"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {shares.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-500">
                  No doctor consent links generated yet. Use the form to grant access.
                </div>
              ) : (
                <div className="space-y-4">
                  {shares.map((share) => (
                    <div
                      key={share.id}
                      className={`p-5 rounded-2xl border transition ${
                        share.is_active
                          ? 'bg-white border-brand-200 hover:border-brand-400 shadow-2xs'
                          : 'bg-brand-50/40 border-brand-100 opacity-75'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-slate-900">
                              {share.recipient_name}
                            </h3>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg border ${
                                share.is_active
                                  ? 'bg-brand-100 text-brand-800 border-brand-200'
                                  : 'bg-slate-200 text-slate-600 border-slate-300'
                              }`}
                            >
                              {share.is_active ? 'Active Grant' : 'Revoked / Expired'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">
                            Purpose: <strong>{share.purpose}</strong>
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {share.is_active && (
                            <>
                              <button
                                onClick={() => handleCopyLink(share.access_code, share.id)}
                                className="px-3 py-1.5 rounded-xl border border-brand-200 bg-white hover:bg-brand-50 text-brand-800 text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
                              >
                                {copiedId === share.id ? (
                                  <Check className="w-3.5 h-3.5 text-brand-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                                <span>{copiedId === share.id ? 'Copied' : 'Copy Doctor Link'}</span>
                              </button>

                              <a
                                href={`/doctor-view/${share.access_code}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-xl bg-brand-100 text-brand-800 border border-brand-200 hover:bg-brand-200 transition"
                                title="Open Doctor View"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>

                              <button
                                onClick={() => handleRevoke(share.id)}
                                className="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Revoke</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* AI Pre-Consult Brief Snippet */}
                      {share.pre_consult_summary && (
                        <div className="p-3.5 bg-brand-50/80 rounded-xl border border-brand-200 text-[11px] text-brand-950 mb-3 leading-relaxed">
                          <span className="font-bold block text-brand-900 flex items-center gap-1 mb-1">
                            <Sparkles className="w-3.5 h-3.5 text-brand-600" /> AI Pre-Consult Brief Attached:
                          </span>
                          <p className="line-clamp-2">{share.pre_consult_summary}</p>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-brand-100">
                        <span>Code: <strong className="text-slate-700">{share.access_code}</strong></span>
                        <span>Accessed: <strong className="text-slate-700">{share.access_count} times</strong></span>
                        <span>
                          Expires: {format(parseISO(share.expires_at), 'dd MMM yyyy, HH:mm')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-3xl border border-brand-100 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-brand-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                ABDM Patient Privacy Audit Log
              </h2>
              <p className="text-xs text-slate-500">
                Every access to your medical records via Doctor links or Emergency QR codes is cryptographically recorded.
              </p>
            </div>
            <span className="text-xs font-mono bg-brand-100 text-brand-800 px-2.5 py-1 rounded-xl border border-brand-200 font-bold">
              Total Audited Accesses: {auditLogs.length}
            </span>
          </div>

          {auditLogs.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-500">
              No external accesses recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-100 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Accessor / Recipient</th>
                    <th className="py-3 px-3">Access Type</th>
                    <th className="py-3 px-3">IP Address</th>
                    <th className="py-3 px-3">Accessed Sections</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-brand-50/50">
                      <td className="py-3 px-3 font-mono text-slate-600 whitespace-nowrap">
                        {format(parseISO(log.accessed_at), 'dd MMM yyyy, HH:mm:ss')}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">
                        {log.accessor_name}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase border ${
                            log.access_type === 'emergency_qr'
                              ? 'bg-red-100 text-red-800 border-red-200'
                              : 'bg-brand-100 text-brand-800 border-brand-200'
                          }`}
                        >
                          {log.access_type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-500">
                        {log.ip_address || 'Internal/Local'}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {log.accessed_sections?.join(', ') || 'All Record Sections'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
