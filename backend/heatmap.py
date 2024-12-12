from flask import Flask, request, jsonify, render_template, Response
import cv2
import numpy as np
import os

# Initialize Flask app
app = Flask(__name__)

# Path for saving results (optional)
output_folder = "output_frames"
os.makedirs(output_folder, exist_ok=True)

# Dummy model function to simulate density map generation
def generate_density_map(frame):
    """
    Simulate the generation of a density map for the given frame.
    Args:
        frame (np.ndarray): Input video frame.
    Returns:
        np.ndarray: Normalized density map.
    """
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    density_map = cv2.GaussianBlur(gray_frame, (25, 25), 0)  # Simulated density map

    # Normalize density map
    density_map = (density_map - np.min(density_map)) / (np.max(density_map) - np.min(density_map) + 1e-5)
    return density_map

def overlay_density_map(frame, density_map):
    """
    Overlay the reversed density map on the original frame.
    Args:
        frame (np.ndarray): Original video frame.
        density_map (np.ndarray): Normalized density map.
    Returns:
        np.ndarray: Frame with overlay.
    """
    # Invert density map to reverse colors
    reversed_density_map = 1 - density_map  # Reverse the map

    # Apply colormap
    heatmap = cv2.applyColorMap((reversed_density_map * 255).astype(np.uint8), cv2.COLORMAP_JET)

    # Overlay the heatmap on the frame
    overlay = cv2.addWeighted(frame, 0.5, heatmap, 0.5, 0)
    return overlay

def process_frame(frame):
    """
    Process a single frame to generate a heatmap overlay.
    Args:
        frame (np.ndarray): Original frame.
    Returns:
        np.ndarray: Frame with overlay.
    """
    density_map = generate_density_map(frame)
    overlay_frame = overlay_density_map(frame, density_map)
    return overlay_frame

@app.route('/')
def index():
    """
    Home page.
    """
    return render_template('index.html')  # A simple HTML page for selection

def gen_frames(video_source=0):
    """
    Generate frames from the video source (live webcam or video file).
    Args:
        video_source (int or str): Webcam index or video file path.
    Yields:
        bytes: Encoded frame bytes.
    """
    cap = cv2.VideoCapture(video_source)
    if not cap.isOpened():
        raise ValueError("Unable to open video source.")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Process the frame
        overlay_frame = process_frame(frame)

        # Encode the frame
        _, buffer = cv2.imencode('.jpg', overlay_frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()

@app.route('/video_feed')
def video_feed():
    """
    Video feed for live webcam or uploaded video file.
    """
    source = request.args.get('source', default='live', type=str)
    video_source = 0 if source == 'live' else source  # Webcam or video file path
    return Response(gen_frames(video_source),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/upload', methods=['POST'])
def upload_video():
    """
    Upload a video file for processing.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    return jsonify({"message": "File uploaded successfully", "path": file_path})

@app.route('/process', methods=['GET'])
def process_uploaded_video():
    """
    Process an uploaded video file.
    """
    file_path = request.args.get('path')
    if not file_path or not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    return Response(gen_frames(file_path),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True, port=5005)