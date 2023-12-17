from rest_framework import serializers
import compClub.models as mod

class ParkingPlaceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = mod.ParkingPlace
        fields = "__all__"


class ParkingSerializer(serializers.ModelSerializer):

    class Meta:
        model = mod.Parking
        fields = "__all__"
    
    free_places =  serializers.SerializerMethodField("free")
    total_places =  serializers.SerializerMethodField("total")

    def get_all(self, obj):
        return mod.ParkingPlace.objects.filter(parking=obj)
    
    def free(self, obj):
        handled = {i.place for i in 
                   mod.Auto.objects.select_related("place").filter(place__parking = obj)
                   }
        all = {i for i in  self.get_all(obj)}
        free = all - handled

        return  [ParkingPlaceSerializer(i).data for i in free]

    def total(self, obj):
        return [ParkingPlaceSerializer(i).data for i in 
                self.get_all(obj)]
    

class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = mod.Client
        #fields = "__all__"
        exclude  = ["login", "password"]
     

class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = mod.Employee
        #fields = "__all__"
        exclude  = ["login", "password"]

class TarifSefializer(serializers.ModelSerializer):

    class Meta:
        model = mod.Tariff
        fields = "__all__"

class AutoSerializer(serializers.ModelSerializer):

    class Meta:
        model = mod.Auto
        fields = "__all__"


