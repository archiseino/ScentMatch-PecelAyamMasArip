const handleExport = (customBlend) => {
  const brief = `
CUSTOM PERFUME BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${customBlend.name}
Base Fragrance: ${customBlend.baseFragrance}
Overall Intensity: ${customBlend.intensity}%

TOP NOTES (First Impression)
${customBlend.topNotes.map((n) => `  • ${n.name} — ${n.intensity}%`).join('\n')}

HEART NOTES (Core Character)
${customBlend.heartNotes
  .map((n) => `  • ${n.name} — ${n.intensity}%`)
  .join('\n')}

BASE NOTES (Lasting Foundation)
${customBlend.baseNotes
  .map((n) => `  • ${n.name} — ${n.intensity}%`)
  .join('\n')}

MOOD & CHARACTER
${customBlend.mood.join(' • ')}

IDEAL OCCASIONS
${customBlend.occasions.join(' • ')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Created with ScentMatch AI Co-Creation
    `.trim();

  const blob = new Blob([brief], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${customBlend.name.replace(/\s+/g, '_')}_brief.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

export { handleExport };
