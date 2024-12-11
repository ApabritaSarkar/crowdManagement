# from ultralytics import YOLO
# import cvzone
# import cv2
# import math

# # Running real time from webcam
# cap = cv2.VideoCapture('fire4.mp4')
# model = YOLO('fire.pt')


# # Reading the classes
# classnames = ['fire']

# while True:
#     ret,frame = cap.read()
#     frame = cv2.resize(frame,(640,480))
#     result = model(frame,stream=True)

#     # Getting bbox,confidence and class names informations to work with
#     for info in result:
#         boxes = info.boxes
#         for box in boxes:
#             confidence = box.conf[0]
#             confidence = math.ceil(confidence * 100)
#             Class = int(box.cls[0])
#             if confidence > 50:
#                 x1,y1,x2,y2 = box.xyxy[0]
#                 x1, y1, x2, y2 = int(x1),int(y1),int(x2),int(y2)
#                 cv2.rectangle(frame,(x1,y1),(x2,y2),(0,0,255),5)
#                 cvzone.putTextRect(frame, f'{classnames[Class]} {confidence}%', [x1 + 8, y1 + 100],
#                                    scale=1.5,thickness=2)




#     cv2.imshow('frame',frame)
#     cv2.waitKey(1)




from flask import Flask, Response
from ultralytics import YOLO
import cv2
import math
import cvzone

app = Flask(__name__)
model = YOLO('fire.pt')
classnames = ['fire']

@app.route('/video_feed')
def video_feed():
    def generate():
        cap = cv2.VideoCapture('fire4.mp4')  # Replace with live webcam if needed
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            frame = cv2.resize(frame, (640, 480))
            results = model(frame, stream=True)

            for info in results:
                boxes = info.boxes
                for box in boxes:
                    confidence = box.conf[0]
                    confidence = math.ceil(confidence * 100)
                    Class = int(box.cls[0])
                    if confidence > 50:
                        x1, y1, x2, y2 = box.xyxy[0]
                        x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 5)
                        cvzone.putTextRect(frame, f'{classnames[Class]} {confidence}%', [x1 + 8, y1 + 100], scale=1.5, thickness=2)

            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)



