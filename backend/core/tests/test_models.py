import pytest
from core.models import Organization, Project

@pytest.mark.django_db
def test_project_unique_name_per_org():
    org = Organization.objects.create(name="Acme", slug="acme", contact_email="c@ac.me")
    Project.objects.create(organization=org, name="P1", status="ACTIVE")
    with pytest.raises(Exception):
        Project.objects.create(organization=org, name="P1", status="ACTIVE")