import random
from datetime import datetime
from models import RobotData

# Global state to maintain mock data
state = {
    "robot_1": {
        "robot_id": "robot_1",
        "location": "Entrance Door",
        "crowd_count": 0,
        "crowd_status": "NORMAL",
        "obstacle_detection": False,
        "temperature": 25.0,
        "humidity": 50.0,
        "entry_gate_status": "OPEN",
        "alert_status": "NONE"
    },
    "robot_2": {
        "robot_id": "robot_2",
        "location": "Faculty Area",
        "crowd_count": 2,
        "crowd_status": "NORMAL",
        "obstacle_detection": False,
        "temperature": 24.5,
        "humidity": 45.0,
        "entry_gate_status": "OPEN", # Faculty area doesn't have an entrance door that is explicitly managed, but Entrance door might close if faculty area is full
        "alert_status": "NONE"
    },
    "robot_3": {
        "robot_id": "robot_3",
        "location": "Lab Area",
        "crowd_count": 10,
        "crowd_status": "NORMAL",
        "obstacle_detection": False,
        "temperature": 22.0,
        "humidity": 60.0,
        "entry_gate_status": "OPEN",
        "alert_status": "NONE"
    }
}

def generate_mock_data():
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Randomly fluctuate crowd counts slightly for simulation
    state["robot_2"]["crowd_count"] = max(0, min(10, state["robot_2"]["crowd_count"] + random.randint(-1, 2)))
    state["robot_3"]["crowd_count"] = max(0, min(30, state["robot_3"]["crowd_count"] + random.randint(-2, 3)))
    
    # Also Entrance area crowd count fluctuates
    state["robot_1"]["crowd_count"] = max(0, min(20, state["robot_1"]["crowd_count"] + random.randint(-2, 2)))

    # Evaluate logic based on requirements
    
    # Faculty Area: max 5
    if state["robot_2"]["crowd_count"] > 5:
        state["robot_2"]["crowd_status"] = "FULL ZONE"
        state["robot_2"]["alert_status"] = "CAPACITY_EXCEEDED"
        # Entrance gate closes if Faculty area is full
        state["robot_1"]["entry_gate_status"] = "CLOSED"
        state["robot_1"]["alert_status"] = "GATE_CLOSED"
    else:
        state["robot_2"]["crowd_status"] = "NORMAL"
        state["robot_2"]["alert_status"] = "NONE"
        state["robot_1"]["entry_gate_status"] = "OPEN"
        state["robot_1"]["alert_status"] = "NONE"

    # Lab Area: max 25
    if state["robot_3"]["crowd_count"] > 25:
        state["robot_3"]["crowd_status"] = "FULL ZONE"
        state["robot_3"]["alert_status"] = "CAPACITY_EXCEEDED"
    else:
        state["robot_3"]["crowd_status"] = "NORMAL"
        state["robot_3"]["alert_status"] = "NONE"

    # Randomize other sensor data slightly
    for r_id in state:
        state[r_id]["temperature"] = round(state[r_id]["temperature"] + random.uniform(-0.5, 0.5), 1)
        state[r_id]["humidity"] = round(state[r_id]["humidity"] + random.uniform(-1.0, 1.0), 1)
        state[r_id]["obstacle_detection"] = random.choice([True, False, False, False]) # 25% chance
        state[r_id]["timestamp"] = timestamp

    return [RobotData(**data) for data in state.values()]
