import uuid
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Referal(models.Model):
	user = models.CharField(max_length=28, null=True, blank=True)
	referal_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
	name = models.CharField(max_length=28, null=True, blank=True)
	ip = models.CharField(max_length=28, null=True, blank=True)
	country = models.CharField(max_length=28, null=True, blank=True)

	def __str__(self):
		return '{}-{}'.format(self.user, self.referal_id)


class UserSiteVisits(models.Model):
	user = models.ForeignKey(Referal, related_name="site_visits", on_delete=models.CASCADE)
	site = models.CharField(max_length=256, null=True, blank=True)
	country = models.CharField(max_length=28, null=True, blank=True)
	spent_full_time = models.BooleanField(default=False)

	def __str__(self):
		return self.site


