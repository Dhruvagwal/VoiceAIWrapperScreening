from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# from django_graphql_playground.views import GraphQLPlaygroundView
from django.http import HttpResponse

STATIC_URL = '/static/'
@method_decorator(csrf_exempt, name="dispatch")
class MyGraphQLView(GraphQLView):
    def options(self, request, *args, **kwargs):
        response = HttpResponse()
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization,  X-Org-Slug"
        return response


urlpatterns = [
    path("admin/", admin.site.urls),
    path("graphql", MyGraphQLView.as_view(graphiql=True)),
]
