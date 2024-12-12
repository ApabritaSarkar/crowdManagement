# import face_recognition
# import cv2
# import numpy as np
# import json
# import os

# # Database file for registered features
# database_file = "registered_features.json"

# # Load or initialize the database
# if os.path.exists(database_file):
#     with open(database_file, "r") as file:
#         database = json.load(file)
# else:
#     database = {"faces": {}, "objects": {}}

# # Function to save the database
# def save_database():
#     with open(database_file, "w") as file:
#         json.dump(database, file)
#         print("Database saved successfully.")

# # Function to register a missing person's face
# def register_face(name, image_path):
#     try:
#         image = face_recognition.load_image_file(image_path)
#         face_encodings = face_recognition.face_encodings(image)
#         if len(face_encodings) > 0:
#             database["faces"][name] = face_encodings[0].tolist()  # Convert NumPy array to list for JSON
#             print(f"Face for '{name}' registered successfully.")
#         else:
#             print(f"No face detected in {image_path}. Registration failed.")
#     except Exception as e:
#         print(f"Error in registering face: {e}")

# # Function to register a missing object's features
# def register_object(name, image_path):
#     try:
#         image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
#         orb = cv2.ORB_create()
#         keypoints, descriptors = orb.detectAndCompute(image, None)
#         if descriptors is not None:
#             database["objects"][name] = descriptors.tolist()  # Convert descriptors to list for JSON
#             print(f"Object '{name}' registered successfully.")
#         else:
#             print(f"No features detected in {image_path}. Registration failed.")
#     except Exception as e:
#         print(f"Error in registering object: {e}")

# # Function to match faces in the live feed
# def match_face(frame, known_faces):
#     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     face_locations = face_recognition.face_locations(rgb_frame)
#     face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

#     for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
#         matches = face_recognition.compare_faces([np.array(encoding) for encoding in known_faces.values()], face_encoding)
#         name = "Unknown"
#         if True in matches:
#             match_index = matches.index(True)
#             name = list(known_faces.keys())[match_index]
#         cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
#         cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# # Function to match objects in the live feed
# def match_object(frame, known_objects):
#     gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     orb = cv2.ORB_create()
#     keypoints, descriptors = orb.detectAndCompute(gray_frame, None)

#     bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
#     for name, registered_desc in known_objects.items():
#         if descriptors is not None:
#             matches = bf.match(np.array(registered_desc, dtype=np.uint8), descriptors)
#             if len(matches) > 10:
#                 cv2.putText(frame, name, (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

# # Function to handle the live feed
# def live_feed():
#     cap = cv2.VideoCapture(0)
#     if not cap.isOpened():
#         print("Error: Could not open camera.")
#         return

#     print("Press 'q' to exit the live feed.")

#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break

#         # Perform matching for registered faces and objects
#         match_face(frame, database["faces"])
#         match_object(frame, database["objects"])

#         # Display the live feed with matches
#         cv2.imshow("Live Camera - Missing Detection", frame)

#         # Press 'q' to quit the live feed
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     cap.release()
#     cv2.destroyAllWindows()

# # Main program
# def main():
#     while True:
#         print("\nMenu:")
#         print("1. Register a missing person's face")
#         print("2. Register a missing object's features")
#         print("3. Start live feed for detection")
#         print("4. Exit")
#         try:
#             choice = input("Enter your choice: ").strip()
#             if choice == "1":
#                 name = input("Enter the name of the missing person: ").strip()
#                 image_path = input("Enter the path to the image of the person: ").strip()
#                 register_face(name, image_path)
#                 save_database()
#             elif choice == "2":
#                 name = input("Enter the name of the missing object: ").strip()
#                 image_path = input("Enter the path to the image of the object: ").strip()
#                 register_object(name, image_path)
#                 save_database()
#             elif choice == "3":
#                 live_feed()
#             elif choice == "4":
#                 print("Exiting...")
#                 break
#             else:
#                 print("Invalid choice. Please try again.")
#         except Exception as e:
#             print(f"An error occurred: {e}")

# if __name__ == "__main__":
#     main()



from flask import Flask, request, jsonify, Response
import face_recognition
import cv2
import numpy as np
import json
import os

app = Flask(__name__)

# Paths and database setup
database_file = "registered_features.json"
uploads_folder = "uploads"
persons_folder = f"{uploads_folder}/missing_persons_image"
objects_folder = f"{uploads_folder}/missing_objects_image"

os.makedirs(persons_folder, exist_ok=True)
os.makedirs(objects_folder, exist_ok=True)

# Load or initialize the database
if os.path.exists(database_file):
    with open(database_file, "r") as file:
        database = json.load(file)
else:
    database = {"faces": {}, "objects": {}}

# Save database function
def save_database():
    with open(database_file, "w") as file:
        json.dump(database, file, indent=4)
        print("Database saved successfully.")

@app.route("/")
def index():
    return jsonify({"message": "Face/Object Registration API Running"})

# Endpoint to register a face
@app.route("/register_face", methods=["POST"])
def register_face():
    try:
        name = request.form["name"]
        file = request.files["image"]
        image_path = os.path.join(persons_folder, file.filename)
        file.save(image_path)

        image = face_recognition.load_image_file(image_path)
        encodings = face_recognition.face_encodings(image)
        if len(encodings) > 0:
            database["faces"][name] = encodings[0].tolist()
            save_database()
            return jsonify({"message": f"Face for {name} registered successfully!"})
        return jsonify({"error": "No face detected."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to register an object
@app.route("/register_object", methods=["POST"])
def register_object():
    try:
        name = request.form["name"]
        file = request.files["image"]
        image_path = os.path.join(objects_folder, file.filename)
        file.save(image_path)

        image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        orb = cv2.ORB_create()
        _, descriptors = orb.detectAndCompute(image, None)
        if descriptors is not None:
            database["objects"][name] = descriptors.tolist()
            save_database()
            return jsonify({"message": f"Object {name} registered successfully!"})
        return jsonify({"error": "No features detected."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to start the live feed
@app.route("/live_feed")
def live_feed():
    def generate():
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            return jsonify({"error": "Cannot open camera."}), 500
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            match_face(frame)
            match_object(frame)
            _, buffer = cv2.imencode(".jpg", frame)
            yield (b"--frame\r\nContent-Type: image/jpeg\r\n\r\n" + buffer.tobytes() + b"\r\n")
        cap.release()

    return Response(generate(), mimetype="multipart/x-mixed-replace; boundary=frame")

# Match faces in the live feed
def match_face(frame):
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    locations = face_recognition.face_locations(rgb_frame)
    encodings = face_recognition.face_encodings(rgb_frame, locations)

    for (top, right, bottom, left), encoding in zip(locations, encodings):
        matches = face_recognition.compare_faces(
            [np.array(embedding) for embedding in database["faces"].values()],
            encoding
        )
        name = "Unknown"
        if True in matches:
            match_index = matches.index(True)
            name = list(database["faces"].keys())[match_index]
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
        cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# Match objects in the live feed
def match_object(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    orb = cv2.ORB_create()
    _, descriptors = orb.detectAndCompute(gray, None)

    if descriptors is not None:
        bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        for name, desc in database["objects"].items():
            matches = bf.match(np.array(desc, dtype=np.uint8), descriptors)
            if len(matches) > 10:
                cv2.putText(frame, name, (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

if __name__ == "__main__":
    app.run(port=5001)
