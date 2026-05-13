from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from models import RobotData
from mock_data import generate_mock_data

app = FastAPI(title="Swarm Robot Dashboard API")

# Allow CORS for local React development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Swarm Robot API"}

@app.get("/api/robot_data", response_model=List[RobotData])
def get_robot_data():
    """
    Returns real-time data for all robots. 
    Currently falls back to mock data as requested.
    """
    return generate_mock_data()
