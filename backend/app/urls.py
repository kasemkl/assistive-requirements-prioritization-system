from django.urls import path
from .views import account_management , project_management , dashboards


urlpatterns = [

# these endpoints for account management...
        path('sign-up',account_management.signUpView.as_view(),name='signUp'),
        path('product-owner-accounts',account_management.ProductOwnerAccount.as_view(),name='product owner accounts'),
        path('single-user/<int:pk>',account_management.userInfoView.as_view(),name="user"),
        path('user-information',account_management.updateUserInfo.as_view(),name='update profile'),
        path('user-password', account_management.ChangePasswordView.as_view(), name='change password'),
        path('dashboard-users',dashboards.users_dashboard.as_view(),name='admin-dashboard-users'),


# these endpoints for project management..
        path('categories',project_management.categories_All.as_view(),name='categories'),
        path('single-category/<int:pk>',project_management.category_CRUD_view.as_view(), name='category'),
        path('projects-category/<int:category_id>', project_management.projectsForOneCategory.as_view(),name='all_project_for one category'),
        path('single-project/<int:pk>',project_management.projectCRUD.as_view(), name='one_project_information'),
        path('projects',project_management.projects.as_view(), name='projects'),
        path('projects-user/<int:pk>', project_management.projectsForOneUser.as_view(),name='all_project_for one user'),
        path('single-req/<int:pk>',project_management.requirements_CRUD.as_view(), name='req CRUD'),
        path('requirements/<int:pk>',project_management.requirements.as_view(),name='create req'),
        path('add-req',project_management.add_req.as_view(),name='adding req'),
        path('requirements-file/<int:pk>',project_management.add_req_by_file.as_view(),name='file'),
        path('reviews/<int:pk>',project_management.Reviews.as_view()),
        path('review-source/<int:pk>',project_management.delete_reviews_source.as_view(),name="delete-reviews-source"),
        path('sources/<int:pk>',project_management.sources.as_view(),name='sources for one project'),


# these endpoints for charts and dashboards
        path('dashboard-categories',dashboards.category_dashboard.as_view(),name='admin-dashboard-category'),
        path('dashboard-users',dashboards.users_dashboard.as_view(),name='admin-dashboard-users'),
        path('reviews-pie-chart/<int:pk>',dashboards.reviews_pie_chart.as_view(),name='reviews-pie'),
        path('reviews-area-chart/<int:pk>',dashboards.reviews_area_chart.as_view(),name='reviews-area'),
        path('top-5-req/<int:pk>',dashboards.Top5Requirement.as_view(),name='Bar-chart'),
        path('reviews-number/<int:pk>',dashboards.NumberOfAllReviews.as_view(),name='number of all reviews'),

]
