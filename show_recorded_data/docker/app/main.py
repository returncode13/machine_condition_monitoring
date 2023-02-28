from math import factorial
from typing import Union
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/data")
async def read_item():
    #list all items in /data directory
    path="/data"
    list=[]
    for (root,dirs,file) in os.walk(path):
        for f in file:
            list.append(f)
    return {"files": list}

@app.get("/data/{soundfile}")
async def read_item(soundfile):
    #list all items in /data directory
    path="/data"
    # list=[]
    # for (root,dirs,file) in os.walk(path):
    #     for f in file:
    #         list.append(f)
    f=os.path.join(path+"/"+soundfile)
    return FileResponse(f)


