from django.shortcuts import render
from rest_framework.views import APIView
from .models import (
	UserSiteVisits,
	Referal
)
from django.conf import settings
import geoip2.database
import uuid
from .serializer import (
	UserSiteVisitsSerializer,
	ReferalSerializer,
	UserSiteVisitsDetailSerializer
)
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class UserSiteVisitsAPIView(APIView):
	serializer_class = UserSiteVisitsDetailSerializer
	
	def get_object(self):
		conversion = self.request.query_params.get('conversion', None)
		if conversion == "full":
			return UserSiteVisits.objects.filter(
				spent_full_time=True
				).values(
					'site',
					'country',
					).distinct()
		elif conversion == "partial":
			return UserSiteVisits.objects.filter(
				spent_full_time=False
				).values(
					'site',
					'country',
					).distinct()
		else:
			return UserSiteVisits.objects.values(
					'site',
					'country',
					).distinct()

	def get(self, request, *args, **kwargs):
		"""
		url http://127.0.0.1:8000/api/visits?conversion=full
		Response
		[
		    {
		        "site": "abc.com",
		        "country": "IN",
		        "visits": 3
		    },
		    {
		        "site": "bbc.com",
		        "country": "IN",
		        "visits": 1
		    }
		]
		"""
		query_dict = self.get_object()
		serializer = self.serializer_class(query_dict, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)


class ReferalUserDetailAPIView(APIView):
	serializer_class = ReferalSerializer

	def get_ip(self):
		x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
		if x_forwarded_for:
			ip = x_forwarded_for.split(',')[0]
		else:
			ip = self.request.META.get('REMOTE_ADDR')
		
		return ip

	def get_country(self, ip):
		reader = geoip2.database.Reader(settings.GEO_DB_PATH)
		try:
			response = reader.country(ip)
		except:
			response = reader.country('128.101.101.101')
		return response.country.iso_code

	def get_object(self):
		"""
		get user detail using referal_user in query string
		"""
		user = self.request.query_params.get('referal_user', None)
		user_obj = Referal.objects.filter(user=user).first()
		print(user_obj)
		if not user_obj:
			ref = Referal()
			ref.referal_id = uuid.uuid4()
			ref.name = user
			ref.user = user
			ref.ip = self.get_ip()
			ref.country = self.get_country(self.get_ip())
			ref.save()
			user_obj = ref
		
		return user_obj
	def get(self, request, *args, **kwargs):
		"""
		url http://127.0.0.1:8000/api/referal?referal_user=gaurav
		Response
		{
		    "referal_id": "612d00b4-7a34-4d5e-b2dd-be436e4ddc4a",
		    "user": "gaurav",
		    "name": "gaurav",
		    "ip": "127.0.0.1",
		    "country": "IN"
		}
		"""
		user = self.get_object()
		serializer = self.serializer_class(user)
		return Response(
			serializer.data,
			status=status.HTTP_200_OK
		)


class UserSiteVisitStartAPIView(APIView):
	serializer_class = UserSiteVisitsSerializer

	def post(self, request, *args, **kwargs):
		"""
		url 127.0.0.1:8000/api/visit/start/
		Body
		{
			"site": "abc.com",
			"country": "IN",
			"user": "612d00b4-7a34-4d5e-b2dd-be436e4ddc4a"
		}
		"""
		data = request.data.copy()
		refrel = Referal.objects.filter(user=data['user']).first()
		if not refrel:
			return Response(
				"Refrel not found in DB",
				status=status.HTTP_200_OK
			)
		data['user'] = refrel.referal_id
		serializer = self.serializer_class(data=data)
		if serializer.is_valid():
			serializer.save(spent_full_time=False)
			return Response(
				serializer.data,
				status=status.HTTP_200_OK
			)
		return Response(
			serializer.errors,
			status=status.HTTP_200_OK
		)


class UserSiteVisitEndAPIView(APIView):
	serializer_class = UserSiteVisitsSerializer

	def post(self, request, *args, **kwargs):
		"""
		url 127.0.0.1:8000/api/visit/end/
		Body
		{
			"site": "abc.com",
			"country": "IN",
			"user": "612d00b4-7a34-4d5e-b2dd-be436e4ddc4a"
		}
		"""
		data = request.data.copy()
		refrel = Referal.objects.filter(user=data['user']).first()
		if not refrel:
			return Response(
				"Refrel not found in DB",
				status=status.HTTP_200_OK
			)
		data['user'] = refrel.referal_id
		if UserSiteVisits.objects.filter(
				user=data.get('user'),
				site=data.get('site'),
				country=data.get('country')
			).exists():
			UserSiteVisits.objects.filter(
				user=data.get('user'),
				site=data.get('site'),
				country=data.get('country')
				).update(spent_full_time=True)
		else:
			UserSiteVisits.objects.create(
				user=data.get('user'),
				site=data.get('site'),
				country=data.get('country'),
				spent_full_time=True
			)
		return Response(
			status=status.HTTP_200_OK
		)
