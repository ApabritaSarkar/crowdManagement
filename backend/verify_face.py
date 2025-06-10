from deepface import DeepFace
import sys

def verify_faces(image1_path, image2_path):
    try:
        # Verify the two images
        result = DeepFace.verify(img1_path=image1_path, img2_path=image2_path, model_name='VGG-Face')
        return result["verified"]
    except Exception as e:
        print("Error:", e)
        return False

if __name__ == "__main__":
    image1 = sys.argv[1]  # First image path (stored photo)
    image2 = sys.argv[2]  # Second image path (captured photo)

    match = verify_faces(image1, image2)
    print(match)  # Output True or False
