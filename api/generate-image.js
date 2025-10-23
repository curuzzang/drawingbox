export default async function handler(req, res) {
  try {
    const { prompt, size } = req.body || {};
    const allowed = ["1024x1024", "1024x1792", "1792x1024"];
    const finalSize = allowed.includes(size) ? size : "1024x1024";

    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size: finalSize,
        n: 1
      })
    });

    const data = await r.json();
    const url = data?.data?.[0]?.url;
    return res.status(200).json({ url });
  } catch (e) {
    console.error("Error generating image:", e);
    return res.status(500).json({ error: e.message });
  }
}
