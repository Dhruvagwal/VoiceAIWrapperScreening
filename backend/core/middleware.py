from core.models import Organization

ORG_HEADER_CANDIDATES = ["HTTP_X_ORG", "HTTP_X_ORG_SLUG", "HTTP_X_ORGANIZATION"]

class OrgContext:
    def __init__(self, organization: Organization | None):
        self.organization = organization

class OrganizationResolverMiddleware:
    """Attach Organization to request (GraphQL view uses Django request)."""
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        slug = None
        for key in ORG_HEADER_CANDIDATES:
            if key in request.META and request.META[key]:
                slug = request.META[key]
                break
        org = None
        if slug:
            try:
                org = Organization.objects.get(slug=slug)
            except Organization.DoesNotExist:
                org = None
        request.org_context = OrgContext(org)
        return self.get_response(request)