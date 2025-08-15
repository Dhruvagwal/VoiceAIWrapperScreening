import pytest
from django.test import Client
from core.models import Organization, Project

@pytest.mark.django_db
def test_projects_query_is_isolated():
    org1 = Organization.objects.create(name="A", slug="a", contact_email="a@ex.com")
    org2 = Organization.objects.create(name="B", slug="b", contact_email="b@ex.com")
    Project.objects.create(organization=org1, name="Org1Proj", status="ACTIVE")
    Project.objects.create(organization=org2, name="Org2Proj", status="ACTIVE")

    client = Client(HTTP_X_ORG_SLUG="a")
    resp = client.post("/graphql", data={"query": "{ projects { name } }"}, content_type="application/json")
    assert resp.status_code == 200
    names = [p["name"] for p in resp.json()["data"]["projects"]]
    assert names == ["Org1Proj"]
