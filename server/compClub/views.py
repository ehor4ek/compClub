from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
import compClub.serializers as ser
import compClub.models as mod
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.


class ParkingViewSet(viewsets.ModelViewSet):
    serializer_class = ser.ParkingSerializer
    queryset = mod.Parking.objects.all()

class ParkingPlaceViewSet(viewsets.ModelViewSet):
    serializer_class = ser.ParkingPlaceSerializer
    queryset = mod.ParkingPlace.objects.all()

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

class TariffViewSet(viewsets.ModelViewSet):
    serializer_class = ser.TarifSefializer
    queryset = mod.Tariff.objects.all()

class AutoViewSet(viewsets.ModelViewSet):
    serializer_class = ser.AutoSerializer
    queryset = mod.Auto.objects.all()

    @action(methods= ["GET"], detail=False, url_path="byclient/(?P<user_id>[^/.]+)")
    def get_cars_by_user(self, request, user_id):
        try:
            user = mod.Client.objects.get(pk = user_id)
        except ObjectDoesNotExist:
            return Response("Нет пользователя с таким id", 
                            status=status.HTTP_404_NOT_FOUND)
        cars = mod.Auto.objects.filter(owner=user)
        data = ser.AutoSerializer(cars, many=True)
        return Response(data.data, status=status.HTTP_200_OK)
        
class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = ser.EmployeeSerializer
    queryset = mod.Employee.objects.all()

    @action(methods=["GET"], detail=False, url_path="login/(?P<login>[^/.]+)/(?P<password>[^/.]+)")
    def login(self, request, login, password):
        try:
           us =  mod.Employee.objects.get(login=login)
        except:
            return Response("Нет пользователя с таким логином", 
                            status=status.HTTP_404_NOT_FOUND)
        if us.password != password:
            return Response("Неверный пароль",  status=status.HTTP_400_BAD_REQUEST)
        res = ser.EmployeeSerializer(us)
        return Response(res.data, status=status.HTTP_200_OK)
    
    @action(methods=["POST"], detail=False, url_path="register/(?P<login>[^/.]+)/(?P<password>[^/.]+)")
    def register(self, request, login, password):
        try:
           user = self.request.data
        except:
            return Response("Некорректный body запроса", 
                            status=status.HTTP_400_BAD_REQUEST)
        if mod.Employee.objects.filter(login = login).count():
            return Response("Пользователь с таким логином существует", 
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            parking = mod.Parking.objects.get(pk= user["parking"])
        except:
            return Response("Нет парковки с таким id", 
                            status=status.HTTP_400_BAD_REQUEST)
        mod.Employee(name = user["name"], parking = parking,type = user["type"],
                     login=login, password=password).save()
        return Response(status=status.HTTP_201_CREATED)