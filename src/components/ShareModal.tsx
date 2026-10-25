import React, { useState } from 'react';
import { Share2, Copy, Check, MessageSquareShare } from 'lucide-react';

interface ShareModalProps {
  hashtag: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ hashtag }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `Namaste! We warmly invite you to celebrate the wedding of Veena & Vishal! View our interactive wedding invitation here: ${window.location.href} ${hashtag}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="py-12 px-4 text-center bg-[#200702] border-t border-[#dda45d]/20">
      <div className="max-w-md mx-auto">
        <p className="text-xs uppercase tracking-widest text-[#dda45d] font-serif mb-2">
          Share The Joy
        </p>
        <h3 className="text-xl font-serif font-bold text-[#f7e8d4] mb-4">
          Invite Friends & Family
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 transition-all"
          >
            <MessageSquareShare className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#dda45d]/50 bg-[#361105] text-[#dda45d] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#dda45d] hover:text-[#200702] transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
