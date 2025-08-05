from flask import Flask, Response
from ultralytics import YOLO
import cv2
from deep_sort_realtime.deepsort_tracker import DeepSort

# Initialize Flask app
app = Flask(__name__)

# Load YOLO model pre-trained on COCO dataset
model = YOLO('yolov8n.pt')  # Lightweight YOLOv8 model

# Initialize DeepSORT tracker
tracker = DeepSort(max_age=30, n_init=3, nn_budget=10)

# Open the live camera feed
cap = cv2.VideoCapture(0)  # Use '0' for the default webcam
if not cap.isOpened():
    raise Exception("Error: Could not open the camera.")

# Function to process video frames
def generate_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Run YOLO model on the frame
        results = model.predict(frame, conf=0.5, iou=0.5, show=False)  # Detect all classes
        detections = []  # For DeepSORT tracking
        people_count = 0  # People counter for density estimation

        # Parse YOLO results
        for result in results:
            boxes = result.boxes  # Get bounding boxes
            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box coordinates
                conf = box.conf[0]  # Confidence score
                cls = int(box.cls[0])  # Class ID

                # Check if the detected object is a person (class ID 0)
                if cls == 0:
                    people_count += 1

                # Add detection for DeepSORT tracking
                detections.append(([x1, y1, x2, y2], conf, cls))

                # Draw bounding box and label on the frame
                label = f"{model.names[cls]} {conf:.2f}"
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Update DeepSORT tracker with YOLO detections
        tracks = tracker.update_tracks(detections, frame=frame)

        # Draw tracking information
        for track in tracks:
            if not track.is_confirmed() or track.time_since_update > 1:
                continue

            track_id = track.track_id
            ltrb = track.to_ltrb()
            x1, y1, x2, y2 = map(int, ltrb)

            # Draw track ID and bounding box
            cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
            cv2.putText(frame, f"ID: {track_id}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

        # Display crowd density information
        cv2.putText(frame, f"People in Frame: {people_count}", (10, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 0, 255), 3)

        # Encode the frame as JPEG
        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        # Yield the frame for Flask
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# Flask route for live video feed
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5003)




# 22

# from flask import Flask, Response, jsonify
# from ultralytics import YOLO
# import cv2
# from deep_sort_realtime.deepsort_tracker import DeepSort

# # Initialize Flask app
# app = Flask(__name__)

# # Load YOLO model pre-trained on COCO dataset
# model = YOLO('yolov8n.pt')  # Lightweight YOLOv8 model

# # Initialize DeepSORT tracker
# tracker = DeepSort(max_age=30, n_init=3, nn_budget=10)

# # Open the live camera feed
# cap = cv2.VideoCapture(0)  # Use '0' for the default webcam
# if not cap.isOpened():
#     raise Exception("Error: Could not open the camera.")

# # Global variable to store people count
# people_count = 0

# # Function to process video frames
# def generate_frames():
#     global people_count
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break

#         # Run YOLO model on the frame
#         results = model.predict(frame, conf=0.5, iou=0.5, show=False)
#         detections = []  # For DeepSORT tracking
#         current_people_count = 0  # People counter for the current frame

#         # Parse YOLO results
#         for result in results:
#             boxes = result.boxes
#             for box in boxes:
#                 x1, y1, x2, y2 = map(int, box.xyxy[0])
#                 conf = box.conf[0]
#                 cls = int(box.cls[0])

#                 # Check if the detected object is a person (class ID 0)
#                 if cls == 0:
#                     current_people_count += 1

#                 # Add detection for DeepSORT tracking
#                 detections.append(([x1, y1, x2, y2], conf, cls))

#                 # Draw bounding box and label on the frame
#                 label = f"{model.names[cls]} {conf:.2f}"
#                 cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
#                 cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

#         # Update global people count
#         people_count = current_people_count

#         # Update DeepSORT tracker with YOLO detections
#         tracks = tracker.update_tracks(detections, frame=frame)

#         # Draw tracking information
#         for track in tracks:
#             if not track.is_confirmed() or track.time_since_update > 1:
#                 continue

#             track_id = track.track_id
#             ltrb = track.to_ltrb()
#             x1, y1, x2, y2 = map(int, ltrb)

#             # Draw track ID and bounding box
#             cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
#             cv2.putText(frame, f"ID: {track_id}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

#         # Encode the frame as JPEG
#         _, buffer = cv2.imencode('.jpg', frame)
#         frame = buffer.tobytes()

#         # Yield the frame for Flask
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


# # Route for live video feed
# @app.route('/video_feed')
# def video_feed():
#     return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


# # Route to get current people count
# @app.route('/people_count')
# def get_people_count():
#     return jsonify({"people_count": people_count})


# # Run the Flask app
# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0", port=5003)