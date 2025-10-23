export default async function handler(req, res) {
  try {
    const { prompt, size } = req.body || {};
    const allowed = ["1024x1024", "1024x1792", "1792x1024"];
    const finalSize = allowed.includes(size) ? size : "1024x1024";

    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size: finalSize,
      }),
    });

    const data = await r.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Image generation failed." });
  }
}
