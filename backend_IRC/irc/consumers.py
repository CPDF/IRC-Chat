import json
import datetime, json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'irc_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        name = text_data_json['name']
        time = json.dumps(str(datetime.date.today()))
        gif = text_data_json['gif']


        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'irc_message',
                'message': message,
                'name': name,
                'time': time,
                'gif': gif
            }
        )

    # Receive message from room group
    async def irc_message(self, event):
        message = event['message']
        name = event['name']
        time = event['time']
        gif = event['gif']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'name': name,
            'time': time,
            'gif': gif
        }))