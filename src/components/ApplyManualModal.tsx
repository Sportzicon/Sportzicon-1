import React, { useState } from 'react';
import { RecruitmentOpening, UserSession } from '../types';
import { 
  X, 
  UploadCloud, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  Link as LinkIcon, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Paperclip,
  Check
} from 'lucide-react';

interface ApplyManualModalProps {
  opening: RecruitmentOpening;
  userSession?: UserSession | null;
  onClose: () => void;
  onSubmitSuccess: (openingId: string, details: any) => void;
}

export const ApplyManualModal: React.FC<ApplyManualModalProps> = ({
  opening,
  userSession,
  onClose,
  onSubmitSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'google-link'>('manual');
  const [fullName, setFullName] = useState(userSession?.name || '');
  const [email, setEmail] = useState(userSession?.email || '');
  const [phone, setPhone] = useState(userSession?.phone || '+91 98765 43210');
  const [role, setRole] = useState(userSession?.primaryRole || 'Right-Arm Fast Bowler / All-Rounder');
  const [experience, setExperience] = useState('3 Years District Level Cricket');
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [coverNotes, setCoverNotes] = useState('');
  
  // File Upload State
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(
    `${(userSession?.name || 'Candidate').replace(/\s+/g, '_')}_Sports_Resume_2026.pdf`
  );
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmitSuccess(opening.id, {
        fullName,
        email,
        phone,
        role,
        experienceYears: experience,
        googleDriveLink,
        notes: coverNotes,
        resumeFileName: uploadedFileName || 'Sports_CV.pdf',
      });
    }, 800);
  };

  const handleOpenExternalUrl = () => {
    if (opening.externalFormUrl) {
      window.open(opening.externalFormUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-sans">
      <div className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-[#0F172A]">
        
        {/* Header Bar */}
        <div className="flex justify-between items-start border-b border-[#E5DFD5] pb-4">
          <div>
            <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded bg-[#FA4D14] text-white uppercase tracking-wider">
              APPLICATION FORM
            </span>
            <h2 className="text-2xl font-bold font-oswald uppercase text-[#0F172A] mt-1">
              {opening.title}
            </h2>
            <p className="text-xs text-[#475569] font-sans font-medium mt-0.5">
              <span className="text-[#64748B]">Organization:</span> {opening.organization} • {opening.location}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E5DFD5] text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* External Form / Drive Banner if present */}
        {opening.externalFormUrl && (
          <div className="bg-[#FFF7ED] border border-[#FFEDD5] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-[#EA580C] uppercase block text-[11px] flex items-center gap-1">
                <LinkIcon className="w-3.5 h-3.5" /> Direct Google Form / Drive Link
              </span>
              <p className="text-[#475569] text-[11px]">
                The organizer has posted an external registration link for this trial.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenExternalUrl}
              className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-orange-600 text-white font-bold shrink-0 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all"
            >
              <span>Open Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex rounded-xl bg-[#E2D9CC]/50 p-1 font-sans text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'manual'
                ? 'bg-white text-[#0F172A] shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#FA4D14]" />
            <span>Fill Details & Upload Resume</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('google-link')}
            className={`flex-1 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'google-link'
                ? 'bg-white text-[#0F172A] shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Google Drive / Form Link</span>
          </button>
        </div>

        {/* Application State: Success Screen */}
        {isSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 font-mono">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold font-oswald text-[#0F172A] uppercase">
              Application Successfully Submitted!
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Your details and attached resume <strong>({uploadedFileName})</strong> have been delivered to <strong>{opening.organization}</strong>.
            </p>
            {googleDriveLink && (
              <p className="text-[11px] text-emerald-700 bg-emerald-100 p-2 rounded-lg border border-emerald-200 truncate">
                Attached Google Drive: {googleDriveLink}
              </p>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            
            {activeTab === 'manual' ? (
              <>
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#334155] mb-1 font-bold flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#FA4D14]" />
                      <span>Full Candidate Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ujjwal Vinnakota"
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl p-2.5 text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#334155] mb-1 font-bold flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#FA4D14]" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. candidate@gmail.com"
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl p-2.5 text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#334155] mb-1 font-bold flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#FA4D14]" />
                      <span>Contact Phone *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl p-2.5 text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#334155] mb-1 font-bold flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#FA4D14]" />
                      <span>Primary Role / Discipline *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Right-Arm Fast Bowler / Head Coach"
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl p-2.5 text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#334155] mb-1 font-bold">
                    Years of Experience / Playing Level:
                  </label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 4 Years Ranji Trophy & District U-19"
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl p-2.5 text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                  />
                </div>

                {/* File Upload Box (Resume / CV) */}
                <div>
                  <label className="block text-[#334155] mb-1 font-bold flex items-center gap-1">
                    <Paperclip className="w-3.5 h-3.5 text-[#FA4D14]" />
                    <span>Attach Resume / Athletic CV (PDF or DOC) *</span>
                  </label>
                  
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleFileDrop}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
                      isDragOver
                        ? 'border-[#FA4D14] bg-[#FFF7ED]'
                        : uploadedFileName
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-[#CBD5E1] bg-white hover:border-[#FA4D14]'
                    }`}
                  >
                    {uploadedFileName ? (
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-300">
                        <div className="flex items-center space-x-2 truncate">
                          <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span className="font-bold text-[#0F172A] truncate text-xs">{uploadedFileName}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUploadedFileName(null)}
                          className="text-red-500 hover:text-red-700 text-xs font-bold shrink-0 ml-2 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer space-y-1 block py-2">
                        <UploadCloud className="w-8 h-8 text-[#FA4D14] mx-auto" />
                        <p className="text-xs font-bold text-[#0F172A]">
                          Drag & Drop your Resume/CV here or <span className="text-[#FA4D14] underline">Browse Files</span>
                        </p>
                        <p className="text-[10px] text-[#64748B]">Supports PDF, DOC, DOCX (Max 15MB)</p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Optional Google Drive / External Portfolio Link */}
                <div>
                  <label className="block text-[#334155] mb-1 font-bold flex items-center gap-1">
                    <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>Google Drive / External Portfolio Link (Optional):</span>
                  </label>
                  <input
                    type="url"
                    value={googleDriveLink}
                    onChange={(e) => setGoogleDriveLink(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl p-2.5 text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                  />
                </div>
              </>
            ) : (
              /* Google Link Tab */
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-2xl space-y-1 text-blue-900">
                  <span className="font-bold flex items-center gap-1 text-xs">
                    <LinkIcon className="w-4 h-4 text-blue-600" /> Submit Application via Google Drive / Google Form
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    Paste your shared Google Drive resume folder link or Google Form response link below. Ensure link permissions are set to "Anyone with the link can view".
                  </p>
                </div>

                <div>
                  <label className="block text-[#334155] mb-1 font-bold">
                    Google Drive Folder / Form Link *
                  </label>
                  <input
                    type="url"
                    required
                    value={googleDriveLink}
                    onChange={(e) => setGoogleDriveLink(e.target.value)}
                    placeholder="e.g. https://drive.google.com/drive/folders/1a2b3c4d..."
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl p-3 text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                  />
                </div>

                <div>
                  <label className="block text-[#334155] mb-1 font-bold">Candidate Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ujjwal Vinnakota"
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl p-2.5 text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                  />
                </div>

                <div>
                  <label className="block text-[#334155] mb-1 font-bold">Cover Note / Remarks:</label>
                  <textarea
                    rows={2}
                    value={coverNotes}
                    onChange={(e) => setCoverNotes(e.target.value)}
                    placeholder="Add any specific highlights or trial availability..."
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl p-2.5 text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#E5DFD5]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#334155] font-bold hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[#FA4D14] hover:bg-orange-600 text-white font-bold uppercase tracking-wide cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
