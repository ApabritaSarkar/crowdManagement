from ultralytics import YOLO
import cv2
import numpy as np

# Load YOLO model pre-trained on COCO dataset
model = YOLO('yolov8n.pt')  # Lightweight YOLOv8 model

# Path to the video file
video_path = "sample_video.mp4"  # Replace with your video file path
output_video_path = "crowd_and_object_detection_output.mp4"

# Open the input video
cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error: Could not open video.")
    exit()

# Get video details
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = int(cap.get(cv2.CAP_PROP_FPS))
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))

# Variables for heatmap and crowd analysis
heatmap = np.zeros((frame_height, frame_width), dtype=np.float32)
frame_count = 0
people_counts = []

# Loop through video frames
while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Run YOLO model on the frame
    results = model.predict(frame, conf=0.5, iou=0.5, show=False)  # Detect all classes

    # Count detected objects
    people_count = 0
    for result in results:
        boxes = result.boxes  # Get bounding boxes
        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box coordinates
            conf = box.conf[0]  # Confidence score
            cls = int(box.cls[0])  # Class ID

            # Check if the detected object is a person (class ID 0)
            if cls == 0:
                people_count += 1

            # Draw rectangle and label on the frame
            label = f"{model.names[cls]} {conf:.2f}"
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            # Update heatmap with the center of the bounding box
            center_x = int((x1 + x2) / 2)
            center_y = int((y1 + y2) / 2)
            heatmap[center_y, center_x] += 1

    # Update crowd analysis variables
    people_counts.append(people_count)
    frame_count += 1

    # Display crowd analysis on the frame
    cv2.putText(frame, f"People in Frame: {people_count}", (10, 50),
                cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 0, 255), 3)
    cv2.putText(frame, f"Frame: {frame_count}", (10, 120),
                cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 0), 3)

    # Normalize the heatmap and convert it to a color map
    heatmap_normalized = cv2.normalize(heatmap, None, 0, 255, cv2.NORM_MINMAX)
    heatmap_color = cv2.applyColorMap(heatmap_normalized.astype(np.uint8), cv2.COLORMAP_JET)

    # Overlay the heatmap on the original frame
    overlay = cv2.addWeighted(frame, 0.7, heatmap_color, 0.3, 0)

    # Write the processed frame with heatmap to the output video
    out.write(overlay)

    # Optional: Display the frame with bounding boxes and heatmap
    cv2.imshow("Crowd and Object Detection with Heatmap", overlay)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
out.release()
cv2.destroyAllWindows()

# Calculate and print statistics
average_people_count = sum(people_counts) / len(people_counts) if people_counts else 0
print(f"Total Frames Processed: {frame_count}")
print(f"Average People per Frame: {average_people_count:.2f}")
print(f"Processed video saved as {output_video_path}")
