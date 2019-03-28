from rest_framework import serializers
from .models import (
	UserSiteVisits,
	Referal,
)

class UserSiteVisitsSerializer(serializers.ModelSerializer):

	class Meta:
		model = UserSiteVisits
		fields = [
			'site',
			'user',
			'country',
		]


class ReferalSerializer(serializers.ModelSerializer):

	class Meta:
		model = Referal
		fields = [
			'referal_id',
			'user',
			'name',
			'ip',
			'country'
		]


class UserSiteVisitsDetailSerializer(serializers.ModelSerializer):
	visits = serializers.SerializerMethodField()

	class Meta:
		model = UserSiteVisits
		fields = [
			'site',
			'country',
			'visits'
		]

	def get_visits(self, obj):
		return UserSiteVisits.objects.filter(
			country=obj.get('country'),
			site=obj.get('site')
			).count()