from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
import compClub.serializers as ser
import compClub.models as mod
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.

class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ser.ServiceSerializer
    queryset = mod.Service.objects.all()
    
class ClubViewSet(viewsets.ModelViewSet):
    serializer_class = ser.ClubSerializer
    queryset = mod.Club.objects.all()
    @action(methods=["GET"], detail=False, url_path="byData/(?P<id_service>[^/.]+)/(?P<s>[^/.]+)")
    def byData(self, request, id_service, s):
        try:
            prices =  mod.Price.objects.filter(id_service=id_service)
            prices_set = set([item.id_device for item in prices])
            print(prices_set)
            clubs_set = set([item.id_club for item in prices_set])
            print(clubs_set)
            if s != '_':
                for item in clubs_set.copy():
                    if not (s in item.address or s in item.name or s in item.phone):
                        clubs_set.remove(item)
        except:
            return Response('Ошибка', status=status.HTTP_400_BAD_REQUEST)
        if len(clubs_set) == 0:
            return Response('', status=status.HTTP_200_OK)
        res = ser.ClubSerializer(clubs_set, many=True)
        return Response(res.data, status=status.HTTP_200_OK)
    
class DeviceViewSet(viewsets.ModelViewSet):
    serializer_class = ser.DeviceSerializer
    queryset = mod.Device.objects.all()
    
    @action(methods=["GET"], detail=False, url_path="byData/(?P<id_club>[^/.]+)/(?P<id_service>[^/.]+)/(?P<s>[^/.]+)")
    def byData(self, request, id_club, id_service, s):
        try:
            prices =  mod.Price.objects.filter(id_service=id_service)
            print(prices)
            devices = [item.id_device for item in prices]
            print(devices)
            devices = devices.filter(id_club=id_club)
            print(devices)
            if s != '_':
                for item in devices.copy():
                    if not (s in item.name or s in item.description):
                        devices.remove(item)
        except:
            return Response('Ошибка', status=status.HTTP_400_BAD_REQUEST)
        if len(devices) == 0:
            return Response('', status=status.HTTP_200_OK)
        res = ser.DeviceSerializer(devices, many=True)
        return Response(res.data, status=status.HTTP_200_OK)
    
class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = ser.OrderSerializer
    queryset = mod.Order.objects.all()
    @action(methods=["GET"], detail=False, url_path="byPrice/(?P<id_price>[^/.]+)")
    def byPrice(self, request, id_price):
        try:
            orders =  mod.Order.objects.filter(id_price=id_price)
        except:
            return Response('Ошибка', status=status.HTTP_400_BAD_REQUEST)
        if len(orders) == 0:
            return Response('', status=status.HTTP_200_OK)
        res = ser.OrderSerializer(orders, many=True)
        return Response(res.data, status=status.HTTP_200_OK)
    @action(methods=["GET"], detail=False, url_path="byClient/(?P<id_client>[^/.]+)")
    def byClient(self, request, id_client):
        try:
            orders =  mod.Order.objects.filter(id_client=id_client)
        except:
            return Response('Ошибка', status=status.HTTP_400_BAD_REQUEST)
        if len(orders) == 0:
            return Response('', status=status.HTTP_200_OK)
        res = ser.OrderSerializer(orders, many=True)
        return Response(res.data, status=status.HTTP_200_OK)
    
class PriceViewSet(viewsets.ModelViewSet):
    serializer_class = ser.PriceSerializer
    queryset = mod.Price.objects.all()
    @action(methods=["GET"], detail=False, url_path="byData/(?P<id_device>[^/.]+)/(?P<id_service>[^/.]+)")
    def byData(self, request, id_device, id_service):
        try:
            price =  mod.Price.objects.filter(id_device=id_device).filter(id_service=id_service)
        except:
            return Response('Ошибка', status=status.HTTP_400_BAD_REQUEST)
        res = ser.OrderSerializer(price[0])
        return Response(res.data, status=status.HTTP_200_OK)

class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ser.ClientSerializer
    queryset = mod.Client.objects.all()

    @action(methods=["GET"], detail=False, url_path="login/(?P<login>[^/.]+)/(?P<password>[^/.]+)")
    def login(self, request, login, password):
        try:
           us =  mod.Client.objects.get(login=login)
        except:
            return Response("Нет пользователя с таким логином", 
                            status=status.HTTP_404_NOT_FOUND)
        if us.password != password:
            return Response("Неверный пароль",  status=status.HTTP_400_BAD_REQUEST)
        res = ser.ClientSerializer(us)
        return Response(res.data, status=status.HTTP_200_OK)
    
    @action(methods=["POST"], detail=False, url_path="register/(?P<login>[^/.]+)/(?P<password>[^/.]+)")
    def register(self, request, login, password):
        try:
           user = self.request.data
           print(user)
        except Exception as e:
            return Response("Некорректный body запроса", 
                            status=status.HTTP_400_BAD_REQUEST)
        if mod.Client.objects.filter(login = login).count():
            return Response("Пользователь с таким логином существует", 
                            status=status.HTTP_400_BAD_REQUEST)
        mod.Client(name = user["name"], phone = user["phone"],
                     login=login, password=password).save()
        return Response(status=status.HTTP_201_CREATED)