import os
import base64
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
from collections import deque

public_dir = "/home/naveen/Desktop/boutique/backend-portfolio/public"
app_dir = "/home/naveen/Desktop/boutique/backend-portfolio/app"
raw_img_path = os.path.join(public_dir, "profile_photo.jpg")

print("1. Loading raw user artwork and performing precise top-edge flood fill background removal...")

img_raw = Image.open(raw_img_path).convert("RGBA")
width, height = img_raw.size
pixels = img_raw.load()

visited = set()
bg_pixels = set()
queue = deque()

# Start ONLY from top edge (y = 0) where background gradient is 100% guaranteed outside character body
for x in range(width):
    queue.append((x, 0))
    visited.add((x, 0))

neighbors = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]

while queue:
    cx, cy = queue.popleft()
    r, g, b, a = pixels[cx, cy]
    bg_pixels.add((cx, cy))
    
    for dx, dy in neighbors:
        nx, ny = cx + dx, cy + dy
        if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
            visited.add((nx, ny))
            nr, ng, nb, _ = pixels[nx, ny]
            # Stop condition: Dark ink border (RGB < 65) OR non-background color
            is_dark_border = (nr < 65 and ng < 65 and nb < 65)
            is_bg_color = (nr > 140 and ng > 60 and (nr - nb) > 30)
            if not is_dark_border and is_bg_color:
                queue.append((nx, ny))

# Apply transparency ONLY to connected background pixels
for x, y in bg_pixels:
    r, g, b, _ = pixels[x, y]
    pixels[x, y] = (r, g, b, 0)

base_cutout_path = os.path.join(public_dir, "user_avatar_base.png")
img_raw.save(base_cutout_path)
print("Saved base transparent avatar cutout to", base_cutout_path)

# Resize base cutout to square 1000x1000 canvas with padding (fully transparent background)
def create_avatar_canvas(cutout_img):
    canvas = Image.new("RGBA", (1000, 1000), (0, 0, 0, 0))
    w, h = cutout_img.size
    aspect = w / h
    new_h = 880
    new_w = int(new_h * aspect)
    resized_cutout = cutout_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    pos_x = (1000 - new_w) // 2
    pos_y = 1000 - new_h
    canvas.paste(resized_cutout, (pos_x, pos_y), resized_cutout)
    return canvas

# Helper function to draw neo-brutalist sticker badges
def draw_sticker(draw, text, x, y, bg_color="#ffe866", text_color="#1e1d1b", font_size=28, border_color="#1e1d1b"):
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf", font_size)
    except:
        font = ImageFont.load_default()
    
    bbox = font.getbbox(text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    padding_x, padding_y = 18, 12
    rw, rh = tw + padding_x * 2, th + padding_y * 2
    
    # Shadow
    draw.rounded_rectangle([x + 5, y + 5, x + rw + 5, y + rh + 5], radius=8, fill="#1e1d1b")
    # Main sticker
    draw.rounded_rectangle([x, y, x + rw, y + rh], radius=8, fill=bg_color, outline=border_color, width=4)
    draw.text((x + padding_x, y + padding_y - 2), text, fill=text_color, font=font)


# -------------------------------------------------------------
# EMOTION 1: DEFAULT / COOL CONFIDENT (200 OK Mode)
# -------------------------------------------------------------
print("2. Generating Default / Confident Avatar (200 OK Mode)...")
img_default = create_avatar_canvas(img_raw)
draw_def = ImageDraw.Draw(img_default)

draw_sticker(draw_def, "{ API }", 50, 160, bg_color="#ffe866", font_size=26)
draw_sticker(draw_def, "STATUS: 200 OK", 680, 150, bg_color="#2ecc71", text_color="#1e1d1b", font_size=24)
draw_sticker(draw_def, "POST /v1/solve", 650, 420, bg_color="#ffffff", text_color="#ff5e5b", font_size=22)
draw_sticker(draw_def, ">_ node.js", 40, 450, bg_color="#1e1d1b", text_color="#ffe866", font_size=22)

img_default.save(os.path.join(public_dir, "developer_avatar.png"))


# -------------------------------------------------------------
# EMOTION 2: SECURITY / HACKER MODE (Defensive Architecture)
# -------------------------------------------------------------
print("3. Generating Security / Hacker Avatar (Matrix HUD Mode)...")
img_sec = create_avatar_canvas(img_raw)
draw_sec = ImageDraw.Draw(img_sec)

# Cyber HUD Overlay over sunglasses
draw_sec.rectangle([410, 310, 590, 380], outline="#ff5e5b", width=5)
draw_sec.line([410, 345, 590, 345], fill="#00ffcc", width=3)
draw_sec.text((430, 320), "HUD // SECURE", fill="#00ffcc")

draw_sticker(draw_sec, "🛡️ DEFENSE", 50, 140, bg_color="#ff5e5b", text_color="#ffffff", font_size=26)
draw_sticker(draw_sec, "🔒 RBAC_200", 680, 160, bg_color="#1e1d1b", text_color="#2ecc71", font_size=24)
draw_sticker(draw_sec, ">_ AUTHZ_ENFORCED", 620, 430, bg_color="#000000", text_color="#2ecc71", font_size=20)

img_sec.save(os.path.join(public_dir, "developer_avatar_security.png"))


# -------------------------------------------------------------
# EMOTION 3: STRESSED / DEBUGGING MODE (500 Fire Incident)
# -------------------------------------------------------------
print("4. Generating Stressed / Debugging Avatar (500 Fire Mode)...")
img_stress = create_avatar_canvas(img_raw)
draw_str = ImageDraw.Draw(img_stress)

# Sweat Drop on forehead
draw_str.polygon([(620, 270), (635, 295), (605, 295)], fill="#3498db", outline="#1e1d1b")
draw_str.ellipse([605, 280, 635, 310], fill="#3498db", outline="#1e1d1b", width=3)

# Coffee Mug in corner
draw_str.rounded_rectangle([720, 700, 840, 840], radius=12, fill="#ffffff", outline="#1e1d1b", width=5)
draw_sticker(draw_str, "LOGS", 735, 740, bg_color="#ff5e5b", text_color="#ffffff", font_size=22)

draw_sticker(draw_str, "🚨 500 ERROR", 40, 140, bg_color="#ff5e5b", text_color="#ffffff", font_size=26)
draw_sticker(draw_str, "p99 > 4800ms", 670, 160, bg_color="#ffe866", text_color="#1e1d1b", font_size=22)
draw_sticker(draw_str, "CPU 99% STRESS", 630, 430, bg_color="#ff5e5b", text_color="#ffffff", font_size=20)

img_stress.save(os.path.join(public_dir, "developer_avatar_stressed.png"))


# -------------------------------------------------------------
# EMOTION 4: SUCCESS / DEPLOYED MODE (All Systems Green)
# -------------------------------------------------------------
print("5. Generating Success / Deployed Avatar (All Green Mode)...")
img_succ = create_avatar_canvas(img_raw)
draw_succ = ImageDraw.Draw(img_succ)

# Green Check Badges
draw_sticker(draw_succ, "✔ DEPLOYED", 50, 150, bg_color="#2ecc71", text_color="#1e1d1b", font_size=26)
draw_sticker(draw_succ, "TESTS: 100% PASS", 650, 150, bg_color="#ffe866", text_color="#1e1d1b", font_size=22)
draw_sticker(draw_succ, "🚀 ZERO DOWNTIME", 640, 430, bg_color="#2ecc71", text_color="#ffffff", font_size=20)

img_succ.save(os.path.join(public_dir, "developer_avatar_success.png"))


# -------------------------------------------------------------
# EMOTION 5: THINKING / ARCHITECT MODE (System Design)
# -------------------------------------------------------------
print("6. Generating Thinking / Architecture Avatar (ERD Diagram Mode)...")
img_think = create_avatar_canvas(img_raw)
draw_th = ImageDraw.Draw(img_think)

# Floating DB & Redis nodes
draw_sticker(draw_th, "💾 PostgreSQL", 40, 150, bg_color="#3498db", text_color="#ffffff", font_size=24)
draw_sticker(draw_th, "⚡ Redis Cache", 680, 150, bg_color="#ff5e5b", text_color="#ffffff", font_size=24)
draw_sticker(draw_th, "💡 IDEA: ACID WAL", 440, 60, bg_color="#ffe866", text_color="#1e1d1b", font_size=24)
draw_sticker(draw_th, "ARCHITECTURE PASS", 620, 430, bg_color="#3498db", text_color="#ffffff", font_size=20)

img_think.save(os.path.join(public_dir, "developer_avatar_thinking.png"))


# -------------------------------------------------------------
# FAVICON GENERATION (Cropped Face Portrait)
# -------------------------------------------------------------
print("7. Generating Favicons (Cropped User Face with Transparent BG)...")
crop_w, crop_h = int(width * 0.7), int(height * 0.55)
crop_x = int((width - crop_w) / 2)
crop_y = int(height * 0.02)

face_crop = img_raw.crop((crop_x, crop_y, crop_x + crop_w, crop_y + crop_h))

fav_size = max(crop_w, crop_h)
fav_canvas = Image.new("RGBA", (fav_size, fav_size), (0, 0, 0, 0))
fav_canvas.paste(face_crop, ((fav_size - crop_w) // 2, (fav_size - crop_h) // 2), face_crop)

fav_png_path = os.path.join(public_dir, "favicon.png")
fav_canvas.save(fav_png_path)

fav_ico_public = os.path.join(public_dir, "favicon.ico")
fav_ico_app = os.path.join(app_dir, "favicon.ico")
apple_icon = os.path.join(public_dir, "apple-icon.png")

fav_canvas.resize((64, 64), Image.Resampling.LANCZOS).save(fav_ico_public, format="ICO")
fav_canvas.resize((64, 64), Image.Resampling.LANCZOS).save(fav_ico_app, format="ICO")
fav_canvas.resize((180, 180), Image.Resampling.LANCZOS).save(apple_icon)

# Base64 embed PNG inside SVG for 100% reliable SVG rendering
with open(fav_png_path, "rb") as f:
    fav_b64 = base64.b64encode(f.read()).decode("utf-8")

favicon_svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,{fav_b64}" xlink:href="data:image/png;base64,{fav_b64}" width="512" height="512" />
</svg>"""

with open(os.path.join(public_dir, "favicon.svg"), "w") as f:
    f.write(favicon_svg_content)
with open(os.path.join(app_dir, "favicon.svg"), "w") as f:
    f.write(favicon_svg_content)

# Base64 embed each avatar PNG inside its SVG wrapper
for name in ["developer_avatar", "developer_avatar_security", "developer_avatar_stressed", "developer_avatar_success", "developer_avatar_thinking", "user_avatar_base"]:
    png_file = os.path.join(public_dir, f"{name}.png")
    with open(png_file, "rb") as f:
        png_b64 = base64.b64encode(f.read()).decode("utf-8")
        
    svg_wrapper = f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 1000" width="100%" height="100%">
  <image href="data:image/png;base64,{png_b64}" xlink:href="data:image/png;base64,{png_b64}" width="1000" height="1000" />
</svg>"""
    with open(os.path.join(public_dir, f"{name}.svg"), "w") as f:
        f.write(svg_wrapper)

print("✅ ALL USER EMOTION AVATARS & FAVICONS PROCESSED AND EMBEDDED SUCCESSFULLY!")
