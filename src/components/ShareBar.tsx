import { Check, Facebook, Linkedin, Share2, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';
import {
  buildShareText,
  buildShareUrl,
  shareOnFacebook,
  shareOnLinkedIn,
  shareOnX,
  type ScheduledWindow,
} from '@/utils/engine';
import type { Platform, DaySelection } from '@/data/recommendations';
import { XIcon } from '@/components/icons/XIcon';

interface ShareBarProps {
  platform: Platform;
  daySelection: DaySelection;
  schedule: ScheduledWindow[];
}

export function ShareBar({ platform, daySelection, schedule }: ShareBarProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const shareText = buildShareText(platform, daySelection, schedule);
  const shareUrl = buildShareUrl();

  async function copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }

  async function handleWebShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Best Time to Post on ${platform}`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user cancelled or share failed — silently ignore
      }
    }
  }

  async function handleCopyLink() {
    const ok = await copyToClipboard(shareUrl);
    if (ok) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } else {
      setShareError('Could not copy link automatically. Please copy the URL from your browser.');
      setTimeout(() => setShareError(null), 4000);
    }
  }

  const hasWebShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Share2 className="h-4 w-4 text-brand-600" aria-hidden="true" />
        Share Your Posting Schedule
      </p>

      {shareError && (
        <p role="alert" className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {shareError}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <a
          href={shareOnFacebook(shareUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-400 hover:bg-brand-50"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" aria-hidden="true" />
          Facebook
        </a>
        <a
          href={shareOnX(shareUrl, shareText)}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-400 hover:bg-brand-50"
          aria-label="Share on X"
        >
          <XIcon className="h-4 w-4" aria-hidden="true" />
          X
        </a>
        <a
          href={shareOnLinkedIn(shareUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-400 hover:bg-brand-50"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" />
          LinkedIn
        </a>
        {hasWebShare && (
          <button
            type="button"
            onClick={handleWebShare}
            className="focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-400 hover:bg-brand-50"
            aria-label="Share via device share"
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
            Share
          </button>
        )}
        <button
          type="button"
          onClick={handleCopyLink}
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-400 hover:bg-brand-50"
          aria-label="Copy link to clipboard"
        >
          {copiedLink ? <Check className="h-4 w-4 text-brand-600" aria-hidden="true" /> : <LinkIcon className="h-4 w-4" aria-hidden="true" />}
          {copiedLink ? 'Link Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
