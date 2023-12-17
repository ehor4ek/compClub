
from django.contrib import admin
from django.urls import include, path
# from rest_framework import routers
# import compClub.views as views

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

# router = routers.SimpleRouter()
# router.register(r'client', views.ClientViewSet)
# router.register(r'service', views.EmployeeViewSet)
# router.register(r'club', views.AutoViewSet)
# router.register(r'device', views.ParkingViewSet)
# router.register(r'price', views.ParkingPlaceViewSet)
# router.register(r'order', views.TariffViewSet)

urlpatterns = [
   path('admin/', admin.site.urls),
   # path("api/", include(router.urls)),
   # path('swagger<format>/', schema_view.without_ui(cache_timeout=0), 
   #       name='schema-json'),
   # path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), 
   #    name='schema-swagger-ui'),
   # path('api-auth/', include('rest_framework.urls'))
]
