from ultralytics import YOLO
import cv2
import numpy as np
from deep_sort_realtime.deepsort_tracker import DeepSort

# Load YOLO model pre-trained on COCO dataset
model = YOLO('yolov8n.pt')  # Lightweight YOLOv8 model

# Initialize DeepSORT tracker
tracker = DeepSort(max_age=30, n_init=3, nn_budget=10)

# Open the live camera feed
cap = cv2.VideoCapture(0)  # Use '0' for the default webcam
if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

print("Press 'q' to exit the live feed.")

# Loop through camera frames
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

    # Display the frame with bounding boxes and tracking
    cv2.imshow("Live Camera - Crowd Density and Tracking", frame)

    # Press 'q' to quit the live feed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()

print("Live camera feed stopped.")
