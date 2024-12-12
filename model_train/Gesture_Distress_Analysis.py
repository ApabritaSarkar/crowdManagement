# Gesture and Distress Signal Analysis: Vision Only System

import os
import cv2
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, BatchNormalization, Input, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
import logging

# Suppress TensorFlow Logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Set '1' to show warnings, '2' to show errors only, '3' to suppress all.
logging.getLogger('tensorflow').setLevel(logging.ERROR)

# Path for CCTV Footage
CCTV_VIDEO_PATH = 'sample_video.mp4'
IMAGE_SIZE = (224, 224)
FRAME_SKIP = 30  # Process every 30th frame to reduce computation

# Function to Extract Frames from CCTV Footage
def extract_frames(video_path, frame_skip=FRAME_SKIP):
    cap = cv2.VideoCapture(video_path)
    frames = []
    frame_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        # Process every nth frame
        if frame_count % frame_skip == 0:
            frame = cv2.resize(frame, IMAGE_SIZE)
            frame = frame / 255.0  # Normalize
            frames.append(frame)
        frame_count += 1
    cap.release()
    return np.array(frames)

# Extract Frames from CCTV Footage
dataset_frames = extract_frames(CCTV_VIDEO_PATH)

# Check if dataset is empty
if len(dataset_frames) == 0:
    raise ValueError("No frames extracted from the video. Please check the CCTV footage path or frame extraction logic.")

# Create CNN for Gesture Recognition (Vision)
vision_input = Input(shape=(224, 224, 3))
x = Conv2D(32, (3, 3), activation='relu')(vision_input)
x = BatchNormalization()(x)
x = MaxPooling2D((2, 2))(x)
x = Conv2D(64, (3, 3), activation='relu')(x)
x = BatchNormalization()(x)
x = MaxPooling2D((2, 2))(x)
x = Conv2D(128, (3, 3), activation='relu')(x)
x = BatchNormalization()(x)
x = MaxPooling2D((2, 2))(x)
x = GlobalAveragePooling2D()(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.5)(x)
output = Dense(1, activation='sigmoid')(x)  # Binary Classification (Distress or Not)

# Define and Compile the Model
model = Model(inputs=vision_input, outputs=output)
model.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy', metrics=['accuracy'])

# Summary of the Model
with open('model_summary.txt', 'w') as f:
    model.summary(print_fn=lambda x: f.write(x + '\n'))

# Example Data Preparation (Dummy Labels for Example Purposes)
labels = np.zeros(len(dataset_frames))  # Assuming no distress signals
X_train, X_val, y_train, y_val = train_test_split(dataset_frames, labels, test_size=0.3, random_state=42)

# Train the Model
history = model.fit(
    X_train,
    y_train,
    validation_data=(X_val, y_val),
    epochs=20,
    batch_size=16
)

# Save the Model
model.save('vision_only_gesture_distress_model.h5')
