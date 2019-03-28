from django.contrib import admin
from django.urls import path
from .views import (
	UserSiteVisitsAPIView,
	ReferalUserDetailAPIView,
	UserSiteVisitEndAPIView,
	UserSiteVisitStartAPIView,
)

urlpatterns = [
    path(
    	'visits',
    	UserSiteVisitsAPIView.as_view(),
    	name='visits'
    ),
    path(
    	'visit/start/',
    	UserSiteVisitStartAPIView.as_view(),
    	name='visit-start'
    ),
    path(
    	'visit/end/',
    	UserSiteVisitEndAPIView.as_view(),
    	name='visit-end'
    ),
    path(
    	'referal',
    	ReferalUserDetailAPIView.as_view(),
    	name='referal-user-detail'
    )
]