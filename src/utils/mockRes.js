const generateAIResponse = (userMessage) => {
  const lower = userMessage.toLowerCase();

  if (lower.includes('floral') || lower.includes('flower')) {
    return "Perfect! I'll enhance the floral notes. I'm adding more jasmine and rose to the heart notes, and introducing a touch of peony for freshness. This will give your perfume a beautiful, romantic garden feel. How does that sound?";
  }

  if (lower.includes('woody') || lower.includes('wood')) {
    return "Great idea! I'm boosting the woody base with cedarwood and adding a hint of patchouli. This will give your fragrance more depth and warmth. It'll be perfect for fall and winter evenings. Would you like to adjust the intensity?";
  }

  if (
    lower.includes('fresh') ||
    lower.includes('citrus') ||
    lower.includes('light')
  ) {
    return "Wonderful! I'm adding bright citrus top notes - bergamot and lemon - and introducing some green tea for a clean, energizing feel. This will make your perfume perfect for daytime and spring weather. Should we keep it light and airy?";
  }

  if (
    lower.includes('intense') ||
    lower.includes('strong') ||
    lower.includes('bold')
  ) {
    return "Absolutely! I'm increasing the overall intensity to 85% and deepening the base notes with amber and musk. This will make your fragrance more powerful and long-lasting. It'll leave a memorable impression. Want to add any specific notes?";
  }

  if (lower.includes('vanilla') || lower.includes('sweet')) {
    return "Lovely choice! I'm adding warm vanilla and tonka bean to the base notes. This creates a sweet, comforting warmth that's both inviting and sophisticated. Perfect for cozy evenings and intimate gatherings. How about the intensity?";
  }

  if (lower.includes('spicy') || lower.includes('spice')) {
    return "Exciting! I'm introducing pink pepper to the top notes and adding some warm spices to the heart. This gives your perfume an intriguing, exotic character - perfect for evening wear and cooler weather. Should we adjust anything else?";
  }

  if (
    lower.includes('romantic') ||
    lower.includes('date') ||
    lower.includes('sensual')
  ) {
    return "Beautiful! I'm creating a more romantic profile by emphasizing rose and jasmine in the heart, adding musk to the base for sensuality, and keeping it moderately intense. This will be perfect for date nights and intimate moments. What do you think?";
  }

  if (lower.includes('summer') || lower.includes('beach')) {
    return "Perfect for summer! I'm brightening the top with citrus and adding aquatic notes, keeping it fresh and light. The intensity is set to 65% for a breezy, sun-kissed feel. Great for beach days and warm evenings!";
  }

  if (
    lower.includes('office') ||
    lower.includes('work') ||
    lower.includes('professional')
  ) {
    return "Smart choice! I'm balancing the formula for a sophisticated yet subtle office-appropriate scent. Clean citrus top notes, elegant florals in the heart, and a soft woody base. Intensity at 60% - noticeable but not overwhelming. Perfect for the workplace!";
  }

  if (
    lower.includes('yes') ||
    lower.includes('sounds good') ||
    lower.includes('perfect') ||
    lower.includes('great')
  ) {
    return 'Wonderful! Your custom blend is coming together beautifully. Would you like to adjust any specific notes, change the intensity, or modify it for different occasions? I can also suggest a unique name for your creation!';
  }

  if (lower.includes('name') || lower.includes('call it')) {
    return "How about we name it based on its character? Given the notes and mood, I suggest names like 'Ethereal Dusk', 'Velvet Whisper', or 'Golden Reverie'. Or would you prefer something more personal? What name speaks to you?";
  }

  return "I can help you adjust the notes, intensity, mood, or occasions for your custom perfume. Try asking me to make it more floral, woody, fresh, or intense. You can also tell me about when you want to wear it, and I'll optimize the blend accordingly!";
};

export default generateAIResponse;
