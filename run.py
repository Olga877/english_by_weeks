#!/usr/bin/env python
"""
Run script for English by Weeks
Usage: python run.py
"""

import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    debug = os.getenv("DEBUG", "True").lower() == "true"
    port = int(os.getenv("PORT", "8000"))

    uvicorn.run(
        "backend.main:app",
        host="0.0.0.0",
        port=port,
        reload=debug,
        log_level="info"
    )