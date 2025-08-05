# Step 1.3: CCTV Footage Processing and Heatmap Generation Code

import os
import cv2
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
import seaborn as sns

# Define Paths
CCTV_VIDEO_PATH = 'path/to/cctv_footage.mp4'
IMAGE_SIZE = (224, 224)
FRAME_SKIP = 30  # Process every 30th frame to reduce computation

# Create Function for Image Normalization and Resizing
def preprocess_frame(frame):
    # Resize to the standard size
    frame = cv2.resize(frame, IMAGE_SIZE)
    # Normalize pixel values
    frame = frame / 255.0
    return frame

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
            frame = preprocess_frame(frame)
            frames.append(frame)
        frame_count += 1
    cap.release()
    return np.array(frames)

# Extract Frames from CCTV Footage
dataset = extract_frames(CCTV_VIDEO_PATH)
labels = np.zeros(len(dataset))  # Dummy labels as placeholders (for example purposes)

# Encode Labels
from sklearn.preprocessing import LabelEncoder

label_encoder = LabelEncoder()
encoded_labels = label_encoder.fit_transform(labels)

# Split Dataset into Training, Validation, and Test Sets
X_train, X_temp, y_train, y_temp = train_test_split(dataset, encoded_labels, test_size=0.3, random_state=42)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.33, random_state=42)

# Data Augmentation for Training Set
augmentor = ImageDataGenerator(
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    brightness_range=[0.8, 1.2]
)
train_datagen = augmentor.flow(X_train, y_train, batch_size=32)
val_datagen = ImageDataGenerator().flow(X_val, y_val, batch_size=32)

def save_to_file(data, filename):
    """ Function to save numpy data to a file for later use """
    np.save(filename, data)

# Save the datasets for further training
save_to_file(X_train, 'X_train.npy')
save_to_file(y_train, 'y_train.npy')
save_to_file(X_val, 'X_val.npy')
save_to_file(y_val, 'y_val.npy')
save_to_file(X_test, 'X_test.npy')
save_to_file(y_test, 'y_test.npy')

# Heatmap Generation to Analyze Crowd Density
def generate_heatmap(frames):
    """ Generate a heatmap based on the density of detected features in the frames """
    heatmap = np.zeros((IMAGE_SIZE[0], IMAGE_SIZE[1]))
    for frame in frames:
        gray_frame = cv2.cvtColor((frame * 255).astype(np.uint8), cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray_frame, 50, 150)
        heatmap += edges
    heatmap = np.clip(heatmap, 0, 255)
    
    plt.figure(figsize=(10, 8))
    sns.heatmap(heatmap, cmap='hot', cbar=False)
    plt.title('Crowd Density Heatmap')
    plt.show()

# Generate Heatmap from Extracted Frames
generate_heatmap(dataset)
