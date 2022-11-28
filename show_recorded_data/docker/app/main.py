from typing import Union
import os
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World111"}


@app.get("/data")
async def read_item():
    #list all items in /data directory
    path="/data"
    list=[]
    for (root,dirs,file) in os.walk(path):
        for f in file:
            list.append(f)
    return {"files": list}
