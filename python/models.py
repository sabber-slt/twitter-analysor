from pydantic import BaseModel,Field



class DataInput(BaseModel):
    name:str


class TwitterInput(BaseModel):
    data:DataInput
    class Config:
        schema_extra = {
            "data": {
                "name": "blackparch",
            }
        }
