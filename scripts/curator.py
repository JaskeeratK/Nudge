import google.generativeai as genai
import json
import os
from dotenv import load_dotenv

# 1. Load the environment variables from the .env file
load_dotenv()
# 1. Setup
genai.configure(api_key=os.getenv("GOOGLE_GEMINI_API_KEY")) # Use an environment variable in production
model = genai.GenerativeModel('gemini-2.5-flash')

def generate_nudge():
    # Load seeds
    with open('raw_seeds.json', 'r') as f:
        seeds = json.load(f)

    all_content = []

    for seed in seeds:
        print(f"Curating: {seed['topic']}...")
        
        prompt = f"""
        Topic: {seed['topic']}
        Lens: {seed['lens']}
        Category: {seed['category']}
        
        Task: Act as an editor for 'Nudge', a calm discovery site. 
        Create a JSON object with these EXACT keys:
        - "id": (Unique string)
        - "glimpse": (A 1-sentence poetic secret revealed under a magnifying glass)
        - "provocation": (A bold, serif-font title, 3-5 words)
        - "body": (3 short paragraphs of editorial text using a metaphor)
        - "exit_path": (One high-quality book or website to explore)
        - "exit_link": (A real URL for that study)

        Tone: Minimalist, non-burdening, and philosophical.
        """

        response = model.generate_content(prompt)
        
        # Clean the response to get valid JSON
        raw_text = response.text.replace('```json', '').replace('```', '').strip()
        data = json.loads(raw_text)
        
        # Merge with lens/category info
        data.update({
            "lens": seed['lens'],
            "category": seed['category']
        })
        all_content.append(data)

    # 2. Write to your Frontend Data folder
    with open('../data/content.js', 'w') as f:
        f.write("export const content = ")
        json.dump(all_content, f, indent=4)
        f.write(";")

    print("Success. content.js updated.")

if __name__ == "__main__":
    generate_nudge()