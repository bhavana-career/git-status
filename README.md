# Tomato Disease Detector

An end-to-end AI-powered web application for detecting tomato leaf diseases using Machine Learning. Users can upload an image of a tomato leaf and receive disease predictions, confidence scores, and treatment recommendations in real time.

## Preview

<img width="1560" height="680" alt="image" src="https://github.com/user-attachments/assets/7f1945ad-d957-4d3f-8b9d-35b4cc409739" />

---

## Features

- Detects tomato leaf diseases from uploaded images
- Real-time predictions using a trained Machine Learning model
- Displays prediction confidence score
- Provides treatment recommendations
- REST API built with FastAPI
- Responsive React frontend
- Clean and modern user interface

---

## Tech Stack

### Frontend
- React.js
- CSS

### Backend
- FastAPI
- Python

### Machine Learning
- TensorFlow / Keras
- OpenCV
- NumPy
- Kaggle Tomato Leaf Disease Dataset

---

## Project Structure

```text
tomato-disease-detector/
│
├── frontend/          # React application
├── backend/           # FastAPI server
├── model/             # Trained ML model
├── dataset/           # Dataset (optional/not uploaded)
├── assets/            # Images and screenshots
├── requirements.txt
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/tomato-disease-detector.git
cd tomato-disease-detector
```

### 2. Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## API Endpoint

### Predict Disease

**POST**

```
/predict
```

**Request**

Upload a tomato leaf image using `multipart/form-data`.

**Response**

```json
{
  "disease": "Tomato Early Blight",
  "confidence": 98.74,
  "recommendation": "Apply a fungicide and remove infected leaves."
}
```

---

## Machine Learning Model

The model was trained using the Kaggle Tomato Leaf Disease dataset.

The prediction pipeline includes:

- Image preprocessing
- Image resizing
- Model inference
- Confidence score calculation
- Disease classification
- Treatment recommendation generation

---

## Supported Diseases

- Tomato Bacterial Spot
- Tomato Early Blight
- Tomato Late Blight
- Tomato Leaf Mold
- Tomato Septoria Leaf Spot
- Tomato Spider Mites
- Tomato Target Spot
- Tomato Mosaic Virus
- Tomato Yellow Leaf Curl Virus
- Healthy Leaf

---

## Future Improvements

- Support multiple crop types
- Disease severity estimation
- Mobile application
- User authentication
- Prediction history
- Cloud deployment
- Explainable AI visualizations

---

### Prediction Result

Add another screenshot here after prediction.

---

## License

This project is licensed under the MIT License.

---

## Author

**Bhavana S**
