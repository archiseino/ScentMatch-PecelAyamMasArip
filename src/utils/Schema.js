// Definisikan tipe NoteItem dan CustomBlend untuk referensi LLM
// (Ini adalah representasi skema JSON dalam format JavaScript/TypeScript)

/** @type {any} */
const NoteItemSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Nama bahan parfum (misalnya, Rose, Sandalwood, Bergamot).',
    },
    intensity: {
      type: 'number',
      description:
        'Tingkat intensitas, dari 10 (sangat rendah) hingga 100 (sangat tinggi).',
    },
  },
  required: ['name', 'intensity'],
};

/** @type {any} */
const CustomBlendSchema = {
  type: 'object',
  properties: {
    topNotes: {
      type: 'array',
      items: NoteItemSchema,
      description:
        'Daftar *Top Notes* yang diperbarui, yang memberikan aroma awal yang ringan.',
    },
    heartNotes: {
      type: 'array',
      items: NoteItemSchema,
      description:
        'Daftar *Heart Notes* yang diperbarui, yang membentuk inti aroma.',
    },
    baseNotes: {
      type: 'array',
      items: NoteItemSchema,
      description:
        'Daftar *Base Notes* yang diperbarui, aroma yang paling lama bertahan.',
    },
    mood: {
      type: 'array',
      items: { type: 'string' },
      description:
        'Kata kunci yang menggambarkan suasana atau perasaan aroma yang diubah (misalnya, Romantic, Elegant, Sporty).',
    },
    occasions: {
      type: 'array',
      items: { type: 'string' },
      description:
        'Acara yang direkomendasikan untuk parfum yang diubah (misalnya, Evening, Daily Wear, Office).',
    },
    intensity: {
      type: 'number',
      description: 'Tingkat intensitas keseluruhan (dari 10 hingga 100).',
    },
    // properti lain dapat ditambahkan, tetapi untuk demo ini, kita fokus pada yang dapat diubah.
  },
};

// Di dalam komponen ChatbotCoCreation, definisikan Prompt Sistem
const systemInstruction = `
Anda adalah **AI Perfume Creator**, seorang konsultan ahli parfum yang membantu pengguna membuat campuran parfum kustom.
Parfum dasar yang saat ini sedang dimodifikasi pengguna adalah:
Nama: ${basePerfume.name}
Notes: ${basePerfume.notes.join(', ')}
Deskripsi: ${basePerfume.description}
Campuran kustom saat ini adalah: ${JSON.stringify(customBlend)}

Tugas Anda adalah:
1.  **Analisis** permintaan pengguna (yang akan diberikan dalam Bahasa Indonesia).
2.  **Perbarui** objek \`CustomBlend\` saat ini berdasarkan permintaan pengguna dan prinsip-prinsip pembuatan parfum, dengan mempertimbangkan keseimbangan aroma antara *Top, Heart, dan Base Notes*.
3.  **Hanya** outputkan objek JSON yang diperbarui yang sesuai dengan skema \`CustomBlendSchema\`. JANGAN masukkan balasan naratif Anda ke dalam JSON.
4.  **Hasilkan** balasan naratif yang menarik dalam **Bahasa Indonesia** yang mengkonfirmasi perubahan yang Anda buat pada parfum. JANGAN menyertakan balasan naratif ini dalam output JSON. Balasan ini harus disimpan dalam properti \`aiResponse\` dari objek JSON.
5.  Pastikan semua nama bahan parfum (*notes*) dan konsep yang digunakan akurat secara kontekstual.
`;

export { NoteItemSchema, CustomBlendSchema, systemInstruction };
