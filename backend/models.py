from pydantic import BaseModel
from typing import Optional

class RobotData(BaseModel):
    robot_id: str
    location: str
    crowd_count: int
    crowd_status: str
    obstacle_detection: bool
    temperature: float
    humidity: float
    entry_gate_status: str
    alert_status: str
    timestamp: str
