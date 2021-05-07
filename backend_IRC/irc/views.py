from django.shortcuts import render

def index(request):
    return render(request, 'irc/index.html')

def room(request, room_name):
    return render(request, 'irc/room.html', {
        'room_name': room_name
    })
