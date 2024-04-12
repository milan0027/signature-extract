#detects signature using model and crops them, finally returns the array of signatures in base64 format
from ultralytics import YOLO
import cv2
import base64
import numpy as np
import math
model = YOLO('best.pt')
color=(0,0,255)

def convert_to_base64(img):
    try:
        _, im_arr = cv2.imencode('.jpeg', img)
        im_bytes = im_arr.tobytes()
        im_b64 = base64.b64encode(im_bytes)
        return im_b64.decode()
    except Exception as e:
        print(f"Error encoding to base64: {e}")
        return None  # Handle the error accordingly in your application
    

def detect(img):
    results = model(img, stream=False, verbose=True)
    opencvImage = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
    resultList = []
    for r in results:
        boxes = r.boxes
       
        for box in boxes:
            #continue for logo detected
            if(box.cls == 0):
                continue

            x1,y1,x2,y2 = box.xyxy[0]
            x1 = int(x1)
            y1 = int(y1)
            #w = max(0,int(x2-x1))
            #h = max(0,int(y2-y1))
            x2 = math.ceil(x2)
            y2 = math.ceil(y2)
            cropped = img.crop((x1,y1,x2,y2))
            opencvImage = cv2.cvtColor(np.array(cropped), cv2.COLOR_RGB2BGR)
            base64image = convert_to_base64(opencvImage)
            resultList.append(base64image)
            
            #cvzone.cornerRect(opencvImage, (x1, y1, w, h),colorC=color,colorR=color)
            #cvzone.putTextRect(opencvImage, f'{cnt}',(x1, y1), scale=2, thickness=4,colorR=color,colorB=color)
            
    return resultList