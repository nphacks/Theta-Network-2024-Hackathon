import http.server
import socketserver
import json
import requests
import io
from PIL import Image
import torch
from diffusers import AnimateDiffPipeline, DDIMScheduler, MotionAdapter

# Existing image generation model setup
API_URL = "https://api-inference.huggingface.co/models/alvdansen/littletinies"
headers = {"Authorization": "Bearer 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"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

# Video generation model setup
adapter = MotionAdapter.from_pretrained("guoyww/animatediff-motion-adapter-v1-4")
model_id = "SG161222/Realistic_Vision_V5.1_noVAE"
pipe = AnimateDiffPipeline.from_pretrained(model_id, motion_adapter=adapter)
scheduler = DDIMScheduler.from_pretrained(
    model_id, subfolder="scheduler", clip_sample=False, timestep_spacing="linspace", steps_offset=1
)
pipe.scheduler = scheduler

# Enable memory savings
pipe.enable_vae_slicing()
pipe.enable_model_cpu_offload()

def generate_video(prompt, negative_prompt, num_frames, guidance_scale, num_inference_steps, seed):
    print(f"Generating video with the following parameters:\nPrompt: {prompt}\nNegative Prompt: {negative_prompt}\n"
          f"Num Frames: {num_frames}\nGuidance Scale: {guidance_scale}\nNum Inference Steps: {num_inference_steps}\nSeed: {seed}")
    output = pipe(
        prompt=prompt,
        negative_prompt=negative_prompt,
        num_frames=num_frames,
        guidance_scale=guidance_scale,
        num_inference_steps=num_inference_steps,
        generator=torch.Generator("cpu").manual_seed(seed),
    )
    frames = output.frames[0]
    output_gif_path = "/app/output/animation.gif"
    frames[0].save(output_gif_path, save_all=True, append_images=frames[1:], loop=0, duration=100)
    return output_gif_path

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/generate-image':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            user_input = json.loads(post_data.decode('utf-8'))['input']
            image_bytes = query({"inputs": user_input})
            image = Image.open(io.BytesIO(image_bytes))
            output = io.BytesIO()
            image.save(output, format='PNG')
            output.seek(0)

            self.send_response(200)
            self.send_header('Content-Type', 'image/png')
            self.end_headers()
            self.wfile.write(output.read())

        elif self.path == '/generate-video':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
                print(f"Received data for video generation: {data}")
                prompt = data['prompt']
                negative_prompt = data.get('negative_prompt', "bad quality, worse quality")
                num_frames = data.get('num_frames', 16)
                guidance_scale = data.get('guidance_scale', 7.5)
                num_inference_steps = data.get('num_inference_steps', 25)
                seed = data.get('seed', 42)

                output_gif_path = generate_video(prompt, negative_prompt, num_frames, guidance_scale, num_inference_steps, seed)

                self.send_response(200)
                self.send_header('Content-Type', 'image/gif')
                self.end_headers()
                with open(output_gif_path, 'rb') as file:
                    self.wfile.write(file.read())

            except Exception as e:
                print(f"Error processing video generation request: {e}")
                self.send_response(400)
                self.end_headers()


        else:
            self.send_response(404)
            self.end_headers()

PORT = 8000
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
